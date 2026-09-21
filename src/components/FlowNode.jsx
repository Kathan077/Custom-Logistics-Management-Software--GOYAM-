import React from 'react';
import * as Icons from 'lucide-react';

const BADGE_CLASS = {
  info:      'badge-info',
  completed: 'badge-success',
  pending:   'badge-pending',
  purple:    'badge-purple',
  warning:   'badge-warning'
};

const SHAPE_CLASS = {
  start_end:  'fc-start-end',
  process:    'fc-process',
  input_data: 'fc-input',
  decision:   'fc-decision',
  warning:    'fc-warning'
};

// Icon map for feature grid rows
const FEAT_ICONS = {
  key:      'Key',
  shield:   'ShieldCheck',
  forgot:   'RefreshCcw',
  change:   'Lock',
  status:   'ToggleLeft',
  role:     'UserCog',
  perm:     'GitBranch',
  logout:   'LogOut'
};

export default function FlowNode({ node, isSimActive, isSearched, isFiltered }) {
  const Icon       = Icons[node.icon] || Icons.Box;
  const shapeClass = SHAPE_CLASS[node.nodeType] || 'fc-process';

  const extraClass = [
    'fc-node',
    isSimActive ? 'sim-active-node' : '',
    isSearched  ? 'search-hl'      : '',
    isFiltered  ? 'filtered'       : ''
  ].filter(Boolean).join(' ');

  /* ── START / END pill ──────────────────────────────────────────── */
  if (node.nodeType === 'start_end') {
    return (
      <div
        id={`node-${node.id}`}
        className={`${extraClass} ${shapeClass}`}
        style={{ left: node.x, top: node.y, width: node.width || 360, position: 'absolute' }}
      >
        <Icon size={22} color="rgba(255,255,255,0.9)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit',sans-serif", letterSpacing: '-0.3px' }}>
            {node.title}
          </div>
          {node.subtitle && (
            <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 2 }}>{node.subtitle}</div>
          )}
        </div>
      </div>
    );
  }

  /* ── Standard card ─────────────────────────────────────────────── */
  return (
    <div
      id={`node-${node.id}`}
      className={`${extraClass} ${shapeClass}`}
      style={{ left: node.x, top: node.y, width: node.width || 360, position: 'absolute' }}
    >
      {/* ── Header ── */}
      <div className="fc-node-header">
        <div className="fc-node-icon">
          <Icon className="fc-node-icon-inner" color="rgba(255,255,255,0.9)" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {node.stepNumber && (
            <span className="fc-node-step">Step {node.stepNumber} of 15</span>
          )}
          <div className="fc-node-title">{node.title}</div>
          <div className="fc-node-subtitle">{node.subtitle}</div>
        </div>
        {node.badge && (
          <span className={`fc-badge ${BADGE_CLASS[node.badgeType] || 'badge-info'}`}>
            {node.badge}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="fc-node-body">

        {/* Bullet items */}
        {node.items && node.items.length > 0 && (
          <>
            {node.itemsTitle && <div className="fc-items-label">{node.itemsTitle}</div>}
            <ul className="fc-items-list">
              {node.items.map((item, i) => (
                <li key={i}>
                  <span className="fc-dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ── Feature Grid (2-column icon rows) — for login node ── */}
        {node.featureGrid && node.featureGrid.length > 0 && (
          <div className="fc-feature-grid">
            {node.featureGrid.map((feat, i) => {
              const FIcon = Icons[feat.icon] || Icons.CheckCircle;
              return (
                <div key={i} className="fc-feat-row">
                  <div className={`fc-feat-icon fc-feat-icon--${feat.color || 'blue'}`}>
                    <FIcon size={13} />
                  </div>
                  <div className="fc-feat-text">
                    <span className="fc-feat-label">{feat.label}</span>
                    {feat.desc && <span className="fc-feat-desc">{feat.desc}</span>}
                  </div>
                  <span className={`fc-feat-status fc-feat-status--${feat.status || 'active'}`}>
                    {feat.status === 'active' ? '● Active' : feat.status === 'config' ? '⚙ Config' : '● On'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Pill fields */}
        {node.fields && node.fields.length > 0 && (
          <div className="fc-fields-wrap">
            {node.fieldsTitle && <div className="fc-items-label">{node.fieldsTitle}</div>}
            <div className="fc-fields-pills">
              {node.fields.map((f, i) => (
                <span key={i} className="fc-field-pill">
                  {typeof f === 'string' ? f : `${f.name}: ${f.type}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action chips */}
        {node.actions && node.actions.length > 0 && (
          <div className="fc-actions-wrap">
            {node.actions.map((a, i) => (
              <span key={i} className="fc-action-chip">⚡ {a}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
