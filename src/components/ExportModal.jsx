import React from 'react';
import { X, Printer, FileCode, Check, Download } from 'lucide-react';
import { FLOWCHART_NODES, OPERATIONAL_STEPS } from '../data/flowchartData';

export default function ExportModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify({ nodes: FLOWCHART_NODES, steps: OPERATIONAL_STEPS }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title">
            <Download size={18} color="#818cf8" />
            Export Flowchart & System Specifications
          </div>
          <button className="btn-icon" onClick={onClose}><X size={16}/></button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>
            Export the complete GOYAM Logistics System visual flowchart for client presentation.
          </p>

          <div className="modal-grid">
            <button className="modal-card" onClick={() => window.print()}>
              <div className="modal-card-icon" style={{ background: 'rgba(99,102,241,0.2)' }}>
                <Printer size={20} color="#818cf8" />
              </div>
              <div className="modal-card-title">Print / Save as PDF</div>
              <div className="modal-card-sub">Browser Print Dialogue → Save as PDF vector output</div>
            </button>

            <button className="modal-card" onClick={handleCopy}>
              <div className="modal-card-icon" style={{ background: copied ? 'rgba(16,185,129,0.2)' : 'rgba(52,211,153,0.15)' }}>
                {copied ? <Check size={20} color="#34d399" /> : <FileCode size={20} color="#34d399" />}
              </div>
              <div className="modal-card-title">{copied ? 'Copied!' : 'Copy JSON Specs'}</div>
              <div className="modal-card-sub">Copy all 100+ node coordinates and rules to clipboard</div>
            </button>
          </div>

          <div className="modal-tip">
            <strong>💡 Client Presentation Tip:</strong> Use the{' '}
            <strong>"Play 15-Step Flow"</strong> button in the header to run an animated
            visual walkthrough from Start to Booking Completion for a stunning live demo!
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
