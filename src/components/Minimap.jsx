import React from 'react';
import { FLOWCHART_NODES } from '../data/flowchartData';

export default function Minimap({ pan, zoom, viewportSize }) {
  const SCALE = 0.048;

  return (
    <div className="minimap">
      <div className="minimap-title">
        <span>Canvas Minimap</span>
        <span style={{ color: '#10b981' }}>LIVE</span>
      </div>
      <div className="minimap-canvas">
        {FLOWCHART_NODES.map(node => (
          <div
            key={node.id}
            className="minimap-node"
            style={{
              left: node.x * SCALE,
              top:  node.y * SCALE,
              width: (node.width || 340) * SCALE,
              height: (node.nodeType === 'start_end' ? 56 : 110) * SCALE
            }}
          />
        ))}
        <div
          className="minimap-viewport"
          style={{
            left:   (-pan.x / zoom) * SCALE,
            top:    (-pan.y / zoom) * SCALE,
            width:  (viewportSize.width  / zoom) * SCALE,
            height: (viewportSize.height / zoom) * SCALE
          }}
        />
      </div>
    </div>
  );
}
