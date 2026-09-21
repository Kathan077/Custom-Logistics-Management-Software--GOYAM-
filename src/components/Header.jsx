import React from 'react';
import { Search, Play, Pause, RotateCcw, Sun, Moon, Download, Boxes, Layers } from 'lucide-react';
import { CATEGORIES, FLOWCHART_NODES } from '../data/flowchartData';

export default function Header({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  isSimulating, setIsSimulating,
  resetSimulation,
  isDarkMode, setIsDarkMode,
  onOpenExport,
  onOpenLREngine
}) {
  return (
    <header className="app-header">
      {/* Brand */}
      <div className="flex items-center gap-3" style={{ minWidth: 0, flexShrink: 0 }}>
        <div className="brand-logo">
          <Boxes size={20} color="#fff" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="brand-title">GOYAM&nbsp;LOGISTICS</span>
            <span className="pill-tag">System Flowchart</span>
          </div>
          <div className="brand-sub">Interactive Client Presentation Canvas • {FLOWCHART_NODES.length} Nodes • Fully Connected</div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-2" style={{ flex: 1, maxWidth: 640, margin: '0 16px' }}>
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search nodes, fields, steps... (e.g. 'BK-2026', 'Driver', 'Pending')"
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="cat-select"
        >
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`btn ${isSimulating ? 'btn-amber' : 'btn-emerald'}`}
        >
          {isSimulating ? <><Pause size={13}/> Pause</> : <><Play size={13}/> Play 15-Step Flow</>}
        </button>
        <button onClick={resetSimulation} className="btn-icon" title="Reset Simulation">
          <RotateCcw size={15} />
        </button>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn-icon" title="Toggle Theme">
          {isDarkMode ? <Sun size={15} color="#fbbf24"/> : <Moon size={15} color="#818cf8"/>}
        </button>
      </div>
    </header>
  );
}
