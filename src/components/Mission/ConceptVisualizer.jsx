import React, { useState, useRef, useEffect } from 'react';

const ConceptVisualizer = ({ moduleId }) => {
    const [sliderVal, setSliderVal] = useState(5);
    const [useCamera, setUseCamera] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (useCamera && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => {
                    console.error("Camera access failed", err);
                    setUseCamera(false);
                });
        }
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [useCamera]);

    const getStyle = () => {
        switch (moduleId) {
            case 'images_pixels':
                return { filter: `contrast(${100 + sliderVal * 10}%) brightness(${100 + sliderVal * 2}%)` };
            case 'color_spaces':
                return { filter: `grayscale(${sliderVal * 10}%) hue-rotate(${sliderVal * 10}deg)` };
            case 'blurring_filters':
                return { filter: `blur(${sliderVal}px)` };
            case 'edge_detection':
                return { filter: `contrast(500%) grayscale(100%) invert(${sliderVal > 5 ? 1 : 0})` };
            case 'thresholding':
                return { filter: `contrast(${sliderVal * 150}%) grayscale(100%) brightness(${sliderVal * 20}%)` };
            case 'contours':
                return { filter: `contrast(600%) grayscale(100%) sepia(100%) hue-rotate(100deg) saturate(200%)` };
            default:
                return {};
        }
    };

    return (
        <div className="concept-visualizer panel">
            <div className="viz-header">
                <h3 className="glow-text">VISION SENSOR SIMULATION</h3>
                <button className="sm-btn" onClick={() => setUseCamera(!useCamera)}>
                    {useCamera ? 'SHUTDOWN CAMERA' : 'ACTIVATE LIVE SENSOR'}
                </button>
            </div>
            
            <div className="viz-grid">
                <div className="viz-item">
                    <div className="img-placeholder">
                        {useCamera ? (
                            <video ref={videoRef} autoPlay playsInline muted />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                                alt="Original"
                            />
                        )}
                        <div className="scan-line-anim"></div>
                    </div>
                    <span>RAW SENSOR DATA</span>
                </div>

                <div className="viz-item">
                    <div className="img-placeholder" style={getStyle()}>
                        {useCamera ? (
                            <video 
                                style={{ transform: videoRef.current ? 'scale(1)' : 'none' }} 
                                src={videoRef.current?.src} 
                                autoPlay 
                                playsInline 
                                muted 
                                onLoadedMetadata={(e) => {
                                    e.target.srcObject = videoRef.current.srcObject;
                                }}
                            />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                                alt="Processed"
                            />
                        )}
                    </div>
                    <span>OPENCV PERCEPTION LAYER</span>
                </div>
            </div>

            <div className="viz-controls">
                <div className="control-label">
                    <label>NEURAL CALIBRATION</label>
                    <div className="param-value">INTENSITY: {sliderVal}</div>
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
        .concept-visualizer { margin-top: 2rem; border-color: var(--hud-blue-low); }
        .viz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .sm-btn { padding: 0.3rem 0.8rem; font-size: 0.65rem; border-color: var(--hud-blue-low); color: var(--hud-blue); }
        .sm-btn:hover { background: var(--hud-blue-low); }
        .viz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0; }
        .viz-item video, .viz-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
        .viz-controls { display: flex; flex-direction: column; gap: 0.5rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; }
        .control-label { display: flex; justify-content: space-between; align-items: center; }
        .viz-controls label { font-size: 0.7rem; color: var(--hud-blue); font-weight: 700; letter-spacing: 1px; }
        input[type=range] { width: 100%; accent-color: var(--hud-blue); height: 4px; }
        .param-value { font-family: var(--font-code); color: var(--neon-green); font-size: 0.75rem; }
        .scan-line-anim {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10%;
          background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.4), transparent);
          box-shadow: 0 0 15px var(--hud-blue);
          animation: scanline 2.5s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default ConceptVisualizer;
