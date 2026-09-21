import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, GitCommit, Map } from 'lucide-react';

export default function Toolbar({ zoom, setZoom, resetView, fitView, showConnections, setShowConnections, showMinimap, setShowMinimap, nodeCount, visibleNodeCount }) {
  return (
    <div className="toolbar-panel">
      <button className="btn-icon" onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))} title="Zoom In"><ZoomIn size={15}/></button>
      <span className="zoom-pct">{Math.round(zoom * 100)}%</span>
      <button className="btn-icon" onClick={() => setZoom(z => Math.max(z - 0.15, 0.3))} title="Zoom Out"><ZoomOut size={15}/></button>
      <div className="toolbar-sep"/>
      <button className="btn btn-ghost" onClick={resetView}><RefreshCw size={13}/> Reset</button>
      <button className="btn btn-ghost" onClick={fitView}><Maximize2 size={13}/> Fit</button>
      <div className="toolbar-sep"/>
      <button className={`btn-icon ${showConnections ? 'active' : ''}`} onClick={() => setShowConnections(v => !v)} title="Toggle Connectors"><GitCommit size={15}/></button>
      <button className={`btn-icon ${showMinimap ? 'active' : ''}`} onClick={() => setShowMinimap(v => !v)} title="Toggle Minimap"><Map size={15}/></button>
      <div className="node-count-badge">Nodes: <span>{visibleNodeCount}</span>/{nodeCount}</div>
    </div>
  );
}
