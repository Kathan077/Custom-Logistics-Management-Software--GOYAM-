import React, { useRef, useState, useEffect } from 'react';
import FlowNode from './FlowNode';
import { FLOWCHART_NODES, PIPELINE_CONNECTIONS } from '../data/flowchartData';

// ─── DOM-Accurate Height Estimator ───────────────────────────────────────────
function estimateNodeHeight(node) {
  const el = typeof document !== 'undefined' ? document.getElementById(`node-${node.id}`) : null;
  if (el && el.offsetHeight > 0) {
    return el.offsetHeight;
  }
  if (node.nodeType === 'start_end') return 66;
  let h = 120; // Safe overestimate so line NEVER starts inside card
  if (node.items       && node.items.length       > 0) h += 30 + node.items.length * 30;
  if (node.featureGrid && node.featureGrid.length > 0) h += 16 + Math.ceil(node.featureGrid.length / 2) * 52;
  if (node.fields      && node.fields.length      > 0) h += 30 + Math.ceil(node.fields.length / 3) * 32;
  if (node.actions     && node.actions.length     > 0) h += 50;
  return h;
}

// ─── Pro-Level Non-Overlapping Smart Routing & Aligned Badges ───────────────
function buildPath(from, to) {
  const fw = from.width || 360;
  const tw = to.width   || 360;
  const fh = estimateNodeHeight(from);
  const th = estimateNodeHeight(to);

  // 1. Retry / Loopback from Auth Denied back up to Main Login Gateway
  if (from.id === 'node_auth_denied' && to.id === 'node_auth') {
    const s = { x: from.x, y: from.y + fh / 2 };
    const e = { x: to.x,   y: to.y   + th / 2 };
    const bypassX = -80;
    const r = 24;
    const path = `M ${s.x} ${s.y} L ${bypassX + r} ${s.y} Q ${bypassX} ${s.y} ${bypassX} ${s.y - r} L ${bypassX} ${e.y + r} Q ${bypassX} ${e.y} ${bypassX + r} ${e.y} L ${e.x} ${e.y}`;
    return { path, lx: 250, ly: e.y };
  }

  // 2. Loopback from Pending LR Loop back to Generate LR
  if (from.id === 'node_loop_continue' && to.id === 'node_create_lr') {
    const s = { x: from.x + fw, y: from.y + fh / 2 };
    const e = { x: to.x + tw,   y: to.y   + th / 2 };
    const bypassX = 1540;
    const r = 24;
    const path = `M ${s.x} ${s.y} L ${bypassX - r} ${s.y} Q ${bypassX} ${s.y} ${bypassX} ${s.y - r} L ${bypassX} ${e.y + r} Q ${bypassX} ${e.y} ${bypassX - r} ${e.y} L ${e.x} ${e.y}`;
    return { path, lx: bypassX, ly: (s.y + e.y) / 2 };
  }

  // 3. Horizontal branch: Decision Gate to Auth Denied
  if (from.id === 'node_dec_auth' && to.id === 'node_auth_denied') {
    const s = { x: from.x,    y: from.y + fh / 2 };
    const e = { x: to.x + tw, y: to.y   + th / 2 };
    const midX = (s.x + e.x) / 2;
    const path = `M ${s.x} ${s.y} C ${midX} ${s.y}, ${midX} ${e.y}, ${e.x} ${e.y}`;
    return { path, lx: midX, ly: (s.y + e.y) / 2 };
  }

  // 4. Horizontal branch: Decision Gate to Loop Continue
  if (from.id === 'node_dec_pending' && to.id === 'node_loop_continue') {
    const s = { x: from.x + fw, y: from.y + fh / 2 };
    const e = { x: to.x,        y: to.y   + th / 2 };
    const midX = (s.x + e.x) / 2;
    const path = `M ${s.x} ${s.y} C ${midX} ${s.y}, ${midX} ${e.y}, ${e.x} ${e.y}`;
    return { path, lx: midX, ly: (s.y + e.y) / 2 };
  }

  // 5. Fan-Out: Gateway -> Sub-nodes (Pro Vertical Entrance Badge)
  if ((from.id === 'node_auth' && to.id.startsWith('node_auth_')) ||
      (from.id === 'node_company_select' && to.id.startsWith('node_comp_')) ||
      (from.id === 'node_customer' && to.id.startsWith('node_cust_')) ||
      (from.id === 'node_booking' && to.id.startsWith('node_bk_')) ||
      (from.id === 'node_lr_details' && to.id.startsWith('node_lrd_'))) {
    const s = { x: from.x + fw / 2, y: from.y + fh };
    const e = { x: to.x + tw / 2,   y: to.y };
    const channelY = (s.y + e.y) / 2;
    const r = 16;
    const dx = e.x - s.x;
    const path = Math.abs(dx) < 10
      ? `M ${s.x} ${s.y} L ${e.x} ${e.y}`
      : dx > 0
        ? `M ${s.x} ${s.y} L ${s.x} ${channelY - r} Q ${s.x} ${channelY} ${s.x + r} ${channelY} L ${e.x - r} ${channelY} Q ${e.x} ${channelY} ${e.x} ${channelY + r} L ${e.x} ${e.y}`
        : `M ${s.x} ${s.y} L ${s.x} ${channelY - r} Q ${s.x} ${channelY} ${s.x - r} ${channelY} L ${e.x + r} ${channelY} Q ${e.x} ${channelY} ${e.x} ${channelY + r} L ${e.x} ${e.y}`;
    // Badge sits centered on the vertical drop segment entering subnode
    return { path, lx: e.x, ly: channelY + (e.y - channelY) * 0.5 };
  }

  // 6. Fan-In: Sub-nodes -> Target Hub (Pro Vertical Exit Badge)
  if ((from.id.startsWith('node_auth_') && to.id === 'node_dec_auth') ||
      (from.id.startsWith('node_comp_') && to.id === 'node_dashboard') ||
      (from.id.startsWith('node_cust_') && to.id === 'node_booking') ||
      (from.id.startsWith('node_bk_') && to.id === 'node_req_qty') ||
      (from.id.startsWith('node_lrd_') && to.id === 'node_assign_fleet')) {
    const s = { x: from.x + fw / 2, y: from.y + fh };
    const e = { x: to.x + tw / 2,   y: to.y };
    const channelY = (s.y + e.y) / 2;
    const r = 16;
    const dx = e.x - s.x;
    const path = Math.abs(dx) < 10
      ? `M ${s.x} ${s.y} L ${e.x} ${e.y}`
      : dx > 0
        ? `M ${s.x} ${s.y} L ${s.x} ${channelY - r} Q ${s.x} ${channelY} ${s.x + r} ${channelY} L ${e.x - r} ${channelY} Q ${e.x} ${channelY} ${e.x} ${channelY + r} L ${e.x} ${e.y}`
        : `M ${s.x} ${s.y} L ${s.x} ${channelY - r} Q ${s.x} ${channelY} ${s.x - r} ${channelY} L ${e.x + r} ${channelY} Q ${e.x} ${channelY} ${e.x} ${channelY + r} L ${e.x} ${e.y}`;
    // Badge sits centered on the vertical exit segment leaving subnode
    return { path, lx: s.x, ly: s.y + (channelY - s.y) * 0.5 };
  }

  // 7. Standard vertical drop (parent row to child row)
  const s = { x: from.x + fw / 2, y: from.y + fh };
  const e = { x: to.x + tw / 2,   y: to.y };
  const channelY = (s.y + e.y) / 2;
  const path = `M ${s.x} ${s.y} C ${s.x} ${channelY}, ${e.x} ${channelY}, ${e.x} ${e.y}`;
  const lx = (s.x + e.x) / 2;
  const ly = channelY;

  return { path, lx, ly };
}

export default function FlowchartCanvas({
  searchQuery, selectedCategory, currentSimStepNodeId, isSimulating,
  zoom, setZoom, pan, setPan, showConnections, onViewportChange
}) {
  const canvasRef    = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart,  setDragStart]  = useState({ x: 0, y: 0 });
  const [, setMounted]              = useState(0);

  useEffect(() => {
    // Refresh connection positions after DOM elements mount to get exact offsetHeight
    const t1 = setTimeout(() => setMounted(1), 50);
    const t2 = setTimeout(() => setMounted(2), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const onMouseDown = e => {
    if (e.target.closest('.fc-node') || e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const onMouseMove = e => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setIsDragging(false);
  const onWheel   = e => {
    e.preventDefault();
    const f = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(z => Math.min(Math.max(z * f, 0.2), 2.8));
  };

  useEffect(() => {
    if (canvasRef.current) {
      onViewportChange({ width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight });
    }
  });

  const isFiltered = node => selectedCategory !== 'all' && node.categoryId !== selectedCategory;
  const isSearched = node => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;
    return (
      node.title?.toLowerCase().includes(q)    ||
      node.subtitle?.toLowerCase().includes(q) ||
      node.badge?.toLowerCase().includes(q)    ||
      node.items?.some(i => i.toLowerCase().includes(q))  ||
      node.fields?.some(f => 
        typeof f === 'string' 
          ? f.toLowerCase().includes(q) 
          : (f.name?.toLowerCase().includes(q) || f.type?.toLowerCase().includes(q))
      )
    );
  };

  return (
    <div
      ref={canvasRef}
      className={`w-full h-full relative overflow-hidden canvas-bg-grid select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          width: '3200px',
          height: '8600px',
          willChange: 'transform'
        }}
      >
        {/* SVG Connectors */}
        {showConnections && (
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 10 }}
          >
            <defs>
              <marker id="arr"        markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(99,102,241,0.85)" />
              </marker>
              <marker id="arr-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
              </marker>
              <marker id="arr-warn"   markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#fb923c" />
              </marker>
              <filter id="lnGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* PASS 1: All line paths and glows */}
            {PIPELINE_CONNECTIONS.map((conn, idx) => {
              const from = FLOWCHART_NODES.find(n => n.id === conn.from);
              const to   = FLOWCHART_NODES.find(n => n.id === conn.to);
              if (!from || !to) return null;

              const { path } = buildPath(from, to);
              const isActive = currentSimStepNodeId === from.id || currentSimStepNodeId === to.id;
              const isWarn   = conn.label?.startsWith('No') || conn.label === 'Retry Login';

              const color    = isActive ? '#38bdf8' : isWarn ? '#fb923c' : 'rgba(99,102,241,0.85)';
              const markerId = isActive ? 'arr-active' : isWarn ? 'arr-warn' : 'arr';
              const sw       = isActive ? 3 : 2;

              return (
                <g key={`path-${idx}`}>
                  {/* Glow behind */}
                  <path d={path} fill="none" stroke={color} strokeWidth={sw + 4} strokeOpacity={0.12} filter="url(#lnGlow)" />
                  {/* Main line */}
                  <path d={path} fill="none" stroke={color} strokeWidth={sw} strokeOpacity={isActive ? 1 : 0.7} markerEnd={`url(#${markerId})`} />
                  {/* Animated pulse when simulating */}
                  {isSimulating && isActive && (
                    <path d={path} fill="none" stroke="#38bdf8" strokeWidth={sw} className="animated-flow-line" />
                  )}
                </g>
              );
            })}

            {/* PASS 2: All label pills and opaque mask rectangles (always on top of lines) */}
            {PIPELINE_CONNECTIONS.map((conn, idx) => {
              if (!conn.label) return null;
              const from = FLOWCHART_NODES.find(n => n.id === conn.from);
              const to   = FLOWCHART_NODES.find(n => n.id === conn.to);
              if (!from || !to) return null;

              const { lx, ly } = buildPath(from, to);
              const isActive = currentSimStepNodeId === from.id || currentSimStepNodeId === to.id;
              const isWarn   = conn.label?.startsWith('No') || conn.label === 'Retry Login';
              const color    = isActive ? '#38bdf8' : isWarn ? '#fb923c' : 'rgba(99,102,241,0.85)';

              const labelWidth = Math.max(112, conn.label.length * 11.2);

              return (
                <g key={`badge-${idx}`} transform={`translate(${lx},${ly})`}>
                  {/* Opaque mask rect: Completely erases line & glow behind badge */}
                  <rect
                    x={-labelWidth / 2 - 4}
                    y="-19"
                    width={labelWidth + 8}
                    height="38"
                    rx="19"
                    fill="#050a14"
                  />
                  {/* Styled badge rect */}
                  <rect
                    x={-labelWidth / 2}
                    y="-15"
                    width={labelWidth}
                    height="30"
                    rx="15"
                    fill="#0d1c3a"
                    stroke={color}
                    strokeOpacity="1"
                    strokeWidth="2"
                  />
                  {/* Crisp white text */}
                  <text
                    x="0" y="4.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="800"
                    fontFamily="'Outfit', 'Inter', sans-serif"
                    letterSpacing="0.04em"
                  >
                    {conn.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Flowchart Nodes */}
        {FLOWCHART_NODES.map(node => (
          <FlowNode
            key={node.id}
            node={node}
            isSimActive={currentSimStepNodeId === node.id}
            isSearched={isSearched(node)}
            isFiltered={isFiltered(node)}
          />
        ))}
      </div>
    </div>
  );
}
