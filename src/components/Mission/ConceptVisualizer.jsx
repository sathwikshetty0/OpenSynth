import React, { useState, useRef, useEffect } from 'react';

const ConceptVisualizer = ({ moduleId }) => {
    const [sliderVal, setSliderVal] = useState(5);
    const [useCamera, setUseCamera] = useState(false);
    const rawVideoRef = useRef(null);
    const processedVideoRef = useRef(null);

    useEffect(() => {
        let stream = null;
        if (useCamera && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(s => {
                    stream = s;
                    if (rawVideoRef.current) rawVideoRef.current.srcObject = s;
                    if (processedVideoRef.current) processedVideoRef.current.srcObject = s;
                })
                .catch(err => {
                    console.error("Camera access failed", err);
                    setUseCamera(false);
                });
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [useCamera]);

    const getStyle = () => {
        switch (moduleId) {
            case 'images_pixels':
                return { filter: `contrast(${100 + sliderVal * 15}%) brightness(${100 + sliderVal * 5}%)` };
            case 'color_spaces':
                return { filter: `grayscale(${sliderVal * 15}%) hue-rotate(${sliderVal * 15}deg) sepia(${sliderVal > 10 ? 50 : 0}%)` };
            case 'blurring_filters':
                return { filter: `blur(${sliderVal * 0.8}px) contrast(110%)` };
            case 'edge_detection':
                return { filter: `contrast(1000%) grayscale(100%) invert(${sliderVal > 5 ? 100 : 0}%) brightness(${100 + sliderVal * 10}%)` };
            case 'thresholding':
                return { filter: `threshold(0.5) contrast(1000%) grayscale(100%)` };
            case 'contours':
                return { filter: `contrast(1000%) grayscale(100%) blur(1px) brightness(1.2) hue-rotate(90deg) saturate(500%)` };
            default:
                return {};
        }
    };

    return (
        <div className="concept-visualizer panel">
            <div className="viz-header">
                <div className="viz-label">
                    <h3 className="glow-text">VISION SENSOR SIMULATION</h3>
                    <p className="sub-text">Observe how different OpenCV processing layers perceive your environment.</p>
                </div>
                <button className={`sm-btn ${useCamera ? 'active-cam' : ''}`} onClick={() => setUseCamera(!useCamera)}>
                    {useCamera ? 'SHUTDOWN CAMERA' : 'ACTIVATE LIVE SENSOR'}
                </button>
            </div>
            
            <div className="viz-grid">
                <div className="viz-item">
                    <div className="img-placeholder">
                        {useCamera ? (
                            <video ref={rawVideoRef} autoPlay playsInline muted />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                                alt="Original"
                            />
                        )}
                        <div className="scan-line-anim"></div>
                    </div>
                    <span className="terminal-text">RAW_SENSOR_DATA</span>
                </div>

                <div className="viz-item">
                    <div className="img-placeholder" style={getStyle()}>
                        {useCamera ? (
                            <video ref={processedVideoRef} autoPlay playsInline muted />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                                alt="Processed"
                            />
                        )}
                    </div>
                    <span className="terminal-text">OPENCV_PERCEPTION_LAYER</span>
                </div>
            </div>

            <div className="viz-controls">
                <div className="control-label">
                    <label>NEURAL CALIBRATION FLOW</label>
                    <div className="param-value">LEVEL_{sliderVal.toString().padStart(2, '0')}</div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(parseInt(e.target.value))}
                />
            </div>

            <style jsx>{`
        .concept-visualizer { margin-top: 2rem; border-color: rgba(6, 182, 212, 0.2); }
        .viz-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .sub-text { font-size: 0.65rem; color: #64748b; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
        .sm-btn { padding: 0.5rem 1rem; font-size: 0.7rem; border-color: rgba(6, 182, 212, 0.4); color: var(--hud-blue); font-weight: 700; transition: all 0.3s; }
        .sm-btn.active-cam { border-color: var(--alert-orange); color: var(--alert-orange); }
        .sm-btn:hover { background: rgba(6, 182, 212, 0.1); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2); }
        .viz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0; }
        .viz-item video, .viz-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .viz-controls { display: flex; flex-direction: column; gap: 0.8rem; background: rgba(15, 23, 42, 0.4); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.03); }
        .control-label { display: flex; justify-content: space-between; align-items: center; }
        .viz-controls label { font-size: 0.7rem; color: var(--hud-blue); font-weight: 700; letter-spacing: 2px; }
        input[type=range] { width: 100%; accent-color: var(--hud-blue); height: 4px; border-radius: 2px; }
        .param-value { font-family: var(--font-code); color: var(--neon-green); font-size: 0.8rem; font-weight: 700; }
        .scan-line-anim {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.1), transparent);
          border-top: 2px solid rgba(6, 182, 212, 0.4);
          animation: scanline 3s linear infinite;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default ConceptVisualizer;
