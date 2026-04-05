import { useState, useRef, useEffect, useCallback } from 'react';

// ── Module images (crossOrigin-friendly via Unsplash) ──────────────────────
const MODULE_IMAGES = {
    images_pixels:    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    color_spaces:     'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=600&q=80',
    blurring_filters: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=600&q=80',
    edge_detection:   'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=600&q=80',
    thresholding:     'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    contours:         'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
};

// ── Per-module slider label & explanation ──────────────────────────────────
const MODULE_INFO = {
    images_pixels:    { label: 'BRIGHTNESS / CONTRAST', explain: (v) => `Alpha contrast: ${(0.5 + v * 0.1).toFixed(1)}x  |  Beta brightness: ${(v - 10) * 10}` },
    color_spaces:     { label: 'GRAYSCALE BLEND',        explain: (v) => `Grayscale weight: ${v * 5}%  |  cv2.cvtColor → COLOR_RGBA2GRAY` },
    blurring_filters: { label: 'GAUSSIAN KERNEL SIZE',   explain: (v) => `Kernel: ${v * 2 + 1}×${v * 2 + 1}  |  cv2.GaussianBlur(src, (${v * 2 + 1},${v * 2 + 1}), 0)` },
    edge_detection:   { label: 'CANNY THRESHOLD',        explain: (v) => `Low: ${v * 5 + 10}  |  High: ${(v * 5 + 10) * 3}  |  cv2.Canny(gray, ${v * 5 + 10}, ${(v * 5 + 10) * 3})` },
    thresholding:     { label: 'THRESHOLD VALUE',        explain: (v) => `Thresh: ${v * 12}  |  cv2.threshold(gray, ${v * 12}, 255, cv2.THRESH_BINARY)` },
    contours:         { label: 'DETECTION THRESHOLD',    explain: (v) => `Binary thresh: ${v * 12}  |  cv2.findContours → cv2.drawContours` },
};

// ── Apply OpenCV operations for each module ───────────────────────────────
function processWithCV(cv, srcMat, moduleId, sliderVal) {
    let dst = new cv.Mat();
    try {
        switch (moduleId) {
            case 'images_pixels': {
                const alpha = 0.5 + sliderVal * 0.1;
                const beta  = (sliderVal - 10) * 10;
                srcMat.convertTo(dst, -1, alpha, beta);
                break;
            }
            case 'color_spaces': {
                const gray = new cv.Mat();
                cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
                cv.cvtColor(gray, dst, cv.COLOR_GRAY2RGBA);
                gray.delete();
                break;
            }
            case 'blurring_filters': {
                const k = sliderVal * 2 + 1;           // always odd: 1..41
                const ksize = new cv.Size(k, k);
                cv.GaussianBlur(srcMat, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                break;
            }
            case 'edge_detection': {
                const gray  = new cv.Mat();
                const edges = new cv.Mat();
                cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
                const low  = sliderVal * 5 + 10;
                const high = low * 3;
                cv.Canny(gray, edges, low, high);
                cv.cvtColor(edges, dst, cv.COLOR_GRAY2RGBA);
                gray.delete();
                edges.delete();
                break;
            }
            case 'thresholding': {
                const gray   = new cv.Mat();
                const binary = new cv.Mat();
                cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
                cv.threshold(gray, binary, sliderVal * 12, 255, cv.THRESH_BINARY);
                cv.cvtColor(binary, dst, cv.COLOR_GRAY2RGBA);
                gray.delete();
                binary.delete();
                break;
            }
            case 'contours': {
                const gray     = new cv.Mat();
                const binary   = new cv.Mat();
                const contours = new cv.MatVector();
                const hier     = new cv.Mat();
                const canvas   = srcMat.clone();
                cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
                cv.threshold(gray, binary, sliderVal * 12, 255, cv.THRESH_BINARY);
                cv.findContours(binary, contours, hier, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                for (let i = 0; i < contours.size(); i++) {
                    const color = new cv.Scalar(6, 182, 212, 255);
                    cv.drawContours(canvas, contours, i, color, 2, cv.LINE_8, hier, 0);
                }
                canvas.copyTo(dst);
                gray.delete(); binary.delete(); contours.delete(); hier.delete(); canvas.delete();
                break;
            }
            default:
                srcMat.copyTo(dst);
        }
    } catch (err) {
        console.error('[OpenCV] Processing error:', err);
        srcMat.copyTo(dst);
    }
    return dst;
}

// ── Explanation bar ────────────────────────────────────────────────────────
const ExplainBar = ({ moduleId, sliderVal }) => {
    const info = MODULE_INFO[moduleId];
    if (!info) return null;
    return (
        <div className="explainer-box panel">
            <p className="terminal-text" style={{ fontSize: '0.75rem', color: 'var(--hud-blue)' }}>
                {info.explain(sliderVal)}
            </p>
        </div>
    );
};

// ── Main component ─────────────────────────────────────────────────────────
const ConceptVisualizer = ({ moduleId }) => {
    const [sliderVal, setSliderVal]   = useState(10);
    const [useCamera, setUseCamera]   = useState(false);
    const [cvStatus, setCvStatus]     = useState('loading'); // 'loading' | 'ready' | 'error'
    const [camError, setCamError]     = useState(false);

    const rawCanvasRef  = useRef(null);
    const dstCanvasRef  = useRef(null);
    const hiddenImgRef  = useRef(null);
    const videoRef      = useRef(null);
    const streamRef     = useRef(null);
    const rafRef        = useRef(null);
    const processingRef = useRef(false);

    // ── Load opencv.js once ──────────────────────────────────────────────
    useEffect(() => {
        // Already loaded?
        if (window.cv && window.cv.Mat) { setCvStatus('ready'); return; }

        // Script already injected but still initialising?
        if (document.getElementById('opencv-script')) {
            const poll = setInterval(() => {
                if (window.cv && window.cv.Mat) { setCvStatus('ready'); clearInterval(poll); }
            }, 200);
            return () => clearInterval(poll);
        }

        const script = document.createElement('script');
        script.id  = 'opencv-script';
        script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
        script.async = true;
        script.onload = () => {
            const poll = setInterval(() => {
                if (window.cv && window.cv.Mat) { setCvStatus('ready'); clearInterval(poll); }
            }, 200);
        };
        script.onerror = () => setCvStatus('error');
        document.head.appendChild(script);
    }, []);

    // ── Draw raw image to srcCanvas once image loads ─────────────────────
    const drawRawImage = useCallback(() => {
        const img = hiddenImgRef.current;
        const canvas = rawCanvasRef.current;
        if (!img || !canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width  = img.naturalWidth  || 600;
        canvas.height = img.naturalHeight || 400;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, []);

    // ── Process static image whenever slider or module changes ────────────
    const processStaticImage = useCallback(() => {
        if (cvStatus !== 'ready' || useCamera || processingRef.current) return;
        const canvas = rawCanvasRef.current;
        const dst    = dstCanvasRef.current;
        if (!canvas || !dst) return;

        processingRef.current = true;
        try {
            const cv  = window.cv;
            const src = cv.imread(canvas);
            const out = processWithCV(cv, src, moduleId, sliderVal);
            cv.imshow(dst, out);
            src.delete();
            out.delete();
        } catch (err) {
            console.error('[OpenCV] imshow error:', err);
        } finally {
            processingRef.current = false;
        }
    }, [cvStatus, useCamera, moduleId, sliderVal]);

    // Re-process when slider/module/status changes (static mode)
    useEffect(() => {
        if (!useCamera) processStaticImage();
    }, [processStaticImage, useCamera]);

    // ── Camera loop ───────────────────────────────────────────────────────
    const startCameraLoop = useCallback(() => {
        const loop = () => {
            const video  = videoRef.current;
            const raw    = rawCanvasRef.current;
            const dstC   = dstCanvasRef.current;
            if (!video || !raw || !dstC || video.readyState < 2) {
                rafRef.current = requestAnimationFrame(loop);
                return;
            }
            const ctx = raw.getContext('2d');
            raw.width  = video.videoWidth;
            raw.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, raw.width, raw.height);

            if (cvStatus === 'ready' && !processingRef.current) {
                processingRef.current = true;
                try {
                    const cv  = window.cv;
                    const src = cv.imread(raw);
                    const out = processWithCV(cv, src, moduleId, sliderVal);
                    cv.imshow(dstC, out);
                    src.delete();
                    out.delete();
                } catch (_) {}
                processingRef.current = false;
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
    }, [cvStatus, moduleId, sliderVal]);

    useEffect(() => {
        if (!useCamera) return;
        setCamError(false);
        if (!navigator.mediaDevices?.getUserMedia) { setCamError(true); setUseCamera(false); return; }
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
                startCameraLoop();
            })
            .catch(() => { setCamError(true); setUseCamera(false); });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            streamRef.current?.getTracks().forEach(t => t.stop());
        };
    }, [useCamera, startCameraLoop]);

    // ── Load new image when module changes ────────────────────────────────
    useEffect(() => {
        if (useCamera) return;
        const img = hiddenImgRef.current;
        if (!img) return;
        img.crossOrigin = 'anonymous';
        img.src = MODULE_IMAGES[moduleId] || MODULE_IMAGES.images_pixels;
    }, [moduleId, useCamera]);

    const info = MODULE_INFO[moduleId] || { label: 'INTENSITY' };

    return (
        <div className="concept-visualizer-wrap">
            <ExplainBar moduleId={moduleId} sliderVal={sliderVal} />

            {/* Hidden image used as OpenCV source for static mode */}
            <img
                ref={hiddenImgRef}
                crossOrigin="anonymous"
                alt=""
                onLoad={drawRawImage}
                style={{ display: 'none' }}
            />

            {/* Hidden video element for camera mode */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ display: 'none' }}
            />

            <div className="concept-visualizer panel">
                <div className="viz-header">
                    <div className="viz-label">
                        <h3 className="glow-text">VISION SENSOR SIMULATION</h3>
                        <p className="sub-text">
                            {cvStatus === 'loading' ? 'Loading opencv.js...' :
                             cvStatus === 'error'   ? 'opencv.js failed to load' :
                             'Real-time OpenCV processing active'}
                        </p>
                    </div>
                    <button
                        className={`sm-btn ${useCamera ? 'active-cam' : ''}`}
                        onClick={() => setUseCamera(v => !v)}
                        disabled={cvStatus !== 'ready'}
                    >
                        {useCamera ? 'SHUTDOWN CAMERA' : 'ACTIVATE LIVE SENSOR'}
                    </button>
                </div>

                {camError && (
                    <p style={{ color: 'var(--alert-orange)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                        Camera access denied or unavailable.
                    </p>
                )}

                {cvStatus === 'loading' && (
                    <div className="cv-loading-bar">
                        <div className="cv-loading-fill" />
                        <span className="terminal-text" style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>
                            LOADING OPENCV.JS ENGINE...
                        </span>
                    </div>
                )}

                <div className="viz-grid" style={{ opacity: cvStatus === 'loading' ? 0.4 : 1 }}>
                    <div className="viz-item">
                        <canvas ref={rawCanvasRef} className="viz-canvas" />
                        <span className="terminal-text">RAW_IMAGE_DATA</span>
                    </div>
                    <div className="viz-item">
                        <canvas ref={dstCanvasRef} className="viz-canvas" />
                        <span className="terminal-text">OPENCV_RESULT</span>
                    </div>
                </div>

                <div className="viz-controls">
                    <div className="control-label">
                        <label>{info.label}</label>
                        <div className="param-value">{sliderVal.toString().padStart(2, '0')}</div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={sliderVal}
                        onChange={(e) => setSliderVal(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <style jsx>{`
                .concept-visualizer-wrap { display: flex; flex-direction: column; gap: 1rem; }
                .concept-visualizer { border-color: rgba(6, 182, 212, 0.2); }
                .viz-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
                .sub-text { font-size: 0.65rem; color: #64748b; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
                .sm-btn { padding: 0.5rem 1rem; font-size: 0.7rem; border-color: rgba(6, 182, 212, 0.4); color: var(--hud-blue); font-weight: 700; transition: all 0.3s; }
                .sm-btn.active-cam { border-color: var(--alert-orange); color: var(--alert-orange); }
                .sm-btn:hover:not(:disabled) { background: rgba(6, 182, 212, 0.1); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2); }
                .sm-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .viz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0; transition: opacity 0.3s; }
                .viz-canvas { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); display: block; background: #0a0f1e; }
                .viz-item { display: flex; flex-direction: column; gap: 0.5rem; }
                .viz-controls { display: flex; flex-direction: column; gap: 0.8rem; background: rgba(15, 23, 42, 0.4); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
                .control-label { display: flex; justify-content: space-between; align-items: center; }
                .viz-controls label { font-size: 0.7rem; color: var(--hud-blue); font-weight: 700; letter-spacing: 2px; }
                input[type=range] { width: 100%; accent-color: var(--hud-blue); height: 4px; border-radius: 2px; }
                .param-value { font-family: var(--font-code); color: var(--neon-green); font-size: 0.8rem; font-weight: 700; }
                .cv-loading-bar { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
                @keyframes cvload { 0% { width: 0% } 100% { width: 90% } }
                .cv-loading-fill { height: 3px; background: var(--hud-blue); border-radius: 2px; animation: cvload 8s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ConceptVisualizer;
