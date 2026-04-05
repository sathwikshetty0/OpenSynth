import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Figtree:wght@400;500;600;700;800&display=swap');

  :root {
    --neon: #06b6d4;
    --ink: #070913;
    --surface: #0f172a;
    --border: rgba(6, 182, 212, 0.2);
    --text: #f0f0ee;
    --text-dim: rgba(240,240,238,0.6);
  }

  .cert-view-page {
    font-family: 'Figtree', sans-serif;
    min-height: 100vh;
    background: var(--ink);
    color: var(--text);
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .no-print {
    display: block;
    width: 100%;
    max-width: 1100px;
    margin-bottom: 2rem;
  }

  /* ─── Certificate Card ─── */
  .cert-card {
    background: #ffffff;
    color: #111111;
    width: 100%;
    max-width: 1100px;
    aspect-ratio: 1.414 / 1;
    position: relative;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.2);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .cert-dotgrid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #06b6d4 0.5px, transparent 0.5px);
    background-size: 24px 24px;
    opacity: 0.1;
    pointer-events: none;
  }

  .cert-inner {
    height: 100%;
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  .cert-border-outer {
    position: absolute;
    inset: 1.5rem;
    border: 3px solid #0f172a;
    pointer-events: none;
  }

  .cert-border-inner {
    position: absolute;
    inset: 2rem;
    border: 1px solid #06b6d4;
    pointer-events: none;
    opacity: 0.4;
  }

  .cert-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .cert-org-h {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .cert-title-h {
    font-family: 'DM Serif Display', serif;
    font-size: 3.8rem;
    color: #0f172a;
    line-height: 1;
    margin: 0;
  }

  .cert-badge-h {
    background: #0f172a;
    color: #06b6d4;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    padding: 0.5rem 1rem;
    letter-spacing: 0.15em;
    border-radius: 4px;
  }

  .cert-body-h {
    margin: 1.5rem 0;
  }

  .cert-label-h {
    font-size: 1rem;
    color: #94a3b8;
    margin-bottom: 1.2rem;
    font-family: 'DM Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .cert-name-h {
    font-family: 'DM Serif Display', serif;
    font-size: 5rem;
    color: #0f172a;
    line-height: 1;
    margin: 0 0 1.5rem;
    border-bottom: 4px solid #06b6d4;
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .cert-desc-h {
    font-size: 1.2rem;
    color: #334155;
    line-height: 1.6;
    max-width: 850px;
  }

  .cert-footer-h {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #e2e8f0;
    padding-top: 2.5rem;
    gap: 2rem;
  }

  .cert-field-h {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .cert-field-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    color: #94a3b8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cert-field-value {
    font-weight: 800;
    color: #0f172a;
    font-size: 1.1rem;
  }

  .cert-auth-h {
    position: absolute;
    bottom: 2rem;
    right: 5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: #cbd5e1;
    letter-spacing: 1px;
  }

  /* ─── Actions ─── */
  .cert-actions-wrapper {
    margin-top: 4rem;
    text-align: center;
    background: rgba(15, 23, 42, 0.5);
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid rgba(6, 182, 212, 0.1);
    width: 100%;
    max-width: 600px;
  }

  .cert-btn {
    background: #06b6d4;
    color: #fff;
    border: none;
    padding: 1.2rem 3.5rem;
    font-family: 'DM Mono', monospace;
    font-weight: 800;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(6,182,182,0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
  }
  .cert-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(6,182,182,0.5);
    background: #08d9fd;
  }

  .cert-back-btn {
    margin-top: 2rem;
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-dim);
    padding: 0.8rem 2rem;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    transition: all 0.2s;
  }
  .cert-back-btn:hover {
    border-color: #06b6d4;
    color: #fff;
  }

  /* ─── Print Logic ─── */
  @media print {
    * {
      visibility: hidden !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    #certificate-print-area,
    #certificate-print-area * {
      visibility: visible !important;
    }

    #certificate-print-area {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 297mm !important;
      height: 210mm !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      z-index: 99999 !important;
    }

    html, body {
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
      height: 100vh !important;
      overflow: hidden !important;
    }

    @page {
      size: A4 landscape;
      margin: 0;
    }
  }
`;

/** Deterministic hash so the same operator always gets the same cert ID. */
function certHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h).toString(36).toUpperCase().padStart(8, '0');
}

export default function Certification({ player, rank, onBack }) {
    const issuedDate = useMemo(() => new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }).toUpperCase(), []);

    const isoDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    /** Stable ID: changes only if the codename or XP milestone changes. */
    const authId = useMemo(() =>
        `CV-${certHash(`${player.codename}:${player.xp}`)}-${isoDate.replace(/-/g, '')}`,
    [player.codename, player.xp, isoDate]);

    const handleExport = () => {
        const originalTitle = document.title;
        document.title = `OpenCV_Quest_Cert_${player.codename}`;
        window.print();
        document.title = originalTitle;
    };

    return (
        <div className="cert-view-page">
            <style>{styles}</style>

            <div className="no-print">
               {/* Decorative elements */}
            </div>

            <motion.div 
                id="certificate-print-area" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="cert-card"
            >
                <div className="cert-dotgrid" />
                <div className="cert-border-outer" />
                <div className="cert-border-inner" />

                <div className="cert-inner">
                    <header className="cert-header">
                        <div>
                            <div className="cert-org-h">OPENCV_QUEST_ACCREDITATION_NODE</div>
                            <h1 className="cert-title-h">OpenCV Basics Completion</h1>
                            <div style={{ color: '#64748b', fontStyle: 'italic', marginTop: '0.6rem', fontSize: '1rem' }}>
                                Fundamental Computer Vision & Image Perception Concepts
                            </div>
                        </div>
                        <div className="cert-badge-h">SYSTEM_CORE_V1.2</div>
                    </header>

                    <main className="cert-body-h">
                        <div className="cert-label-h">This document certifies that</div>
                        <h2 className="cert-name-h">{player.codename.toUpperCase()}</h2>
                        <p className="cert-desc-h">
                            Has successfully completed the fundamental vision learning modules of <strong style={{ color: '#0f172a' }}>OPENCV QUEST</strong>. 
                            Demonstrating standard proficiency in image matrix manipulation, spatial frequency filtering, 
                            dynamic thresholding, and real-time object perception architecture.
                        </p>
                    </main>

                    <footer className="cert-footer-h">
                        <div className="cert-field-h">
                            <span className="cert-field-label">OPERATOR_ID</span>
                            <span className="cert-field-value">{player.codename}</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Verified Core Node Alpha</span>
                        </div>
                        <div className="cert-field-h" style={{ alignItems: 'center', textAlign: 'center' }}>
                            <span className="cert-field-label">PERCEPTION_LEVEL</span>
                            <span className="cert-field-value" style={{ color: '#06b6d4' }}>{rank.toUpperCase()}</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>XP: {player.xp.toLocaleString()}</span>
                        </div>
                        <div className="cert-field-h" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                            <span className="cert-field-label">DATE_OF_ENLIGHTENMENT</span>
                            <span className="cert-field-value">
                                {issuedDate}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>HASH_AUTH_STABLE</span>
                        </div>
                    </footer>

                    <div className="cert-auth-h">
                        AUTH_STAMP: {authId}
                    </div>
                </div>
            </motion.div>

            <div className="cert-actions-wrapper no-print">
                <p style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    "To see what the machine sees is to understand the soul of the matrix."
                </p>
                <button className="cert-btn" onClick={handleExport}>
                    <Award size={24} /> 💾 DOWNLOAD PDF CERTIFICATE
                </button>
                <p style={{ marginTop: '1.5rem', opacity: 0.6, fontSize: '0.75rem', color: '#64748b', fontFamily: 'DM Mono' }}>
                    OPTIMAL EXPORT: SELECT <span style={{ color: '#06b6d4' }}>LANDSCAPE</span> & <span style={{ color: '#06b6d4' }}>MARGINS: NONE</span>
                </p>
                <button onClick={onBack} className="cert-back-btn">
                    RETURN TO COMMAND_CENTER
                </button>
            </div>
        </div>
    );
}
