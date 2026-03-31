import React, { useState } from 'react';

const ConceptVisualizer = ({ moduleId }) => {
    const [sliderVal, setSliderVal] = useState(5);

    const getStyle = () => {
        switch (moduleId) {
            case 'images_pixels':
                return { filter: `contrast(${100 + sliderVal * 10}%)` };
            case 'color_spaces':
                return { filter: `grayscale(${sliderVal * 10}%)` };
            case 'blurring_filters':
                return { filter: `blur(${sliderVal}px)` };
            case 'edge_detection':
                return { filter: `contrast(500%) grayscale(100%) invert(${sliderVal > 5 ? 1 : 0})` };
            case 'thresholding':
                return { filter: `contrast(${sliderVal * 100}%) grayscale(100%)` };
            case 'contours':
                return { filter: `contrast(500%) grayscale(100%) brightness(${sliderVal * 10}%)` };
            default:
                return {};
        }
    };

    return (
        <div className="concept-visualizer panel">
            <h3 className="glow-text">LIVE PROCESSOR SIMULATION</h3>
            <div className="viz-grid">
                <div className="viz-item">
                    <div className="img-placeholder">
                        <img
                            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                            alt="Original"
                        />
                        <div className="scan-line-anim"></div>
                    </div>
                    <span>RAW INPUT</span>
                </div>

                <div className="viz-item">
                    <div className="img-placeholder" style={getStyle()}>
                        <img
                            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400"
                            alt="Processed"
                        />
                    </div>
                    <span>AI PERCEPTION OUTPUT</span>
                </div>
            </div>

            <div className="viz-controls">
                <label>SYSTEM PARAMETER ADJUSTMENT</label>
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(parseInt(e.target.value))}
                />
                <div className="param-value">VAL: {sliderVal}</div>
            </div>

            <style jsx>{`
        .concept-visualizer { margin-top: 2rem; }
        .viz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1.5rem 0; }
        .viz-item img { width: 100%; height: 100%; object-fit: cover; }
        .viz-controls { display: flex; flex-direction: column; gap: 0.5rem; }
        .viz-controls label { font-size: 0.7rem; color: var(--hud-blue); font-weight: 700; }
        input[type=range] { width: 100%; accent-color: var(--hud-blue); }
        .param-value { font-family: var(--font-code); color: var(--neon-green); font-size: 0.8rem; }
        .scan-line-anim {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10%;
          background: rgba(0, 255, 245, 0.2);
          box-shadow: 0 0 10px var(--hud-blue);
          animation: scanline 2s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default ConceptVisualizer;
