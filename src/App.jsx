import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import FlowchartCanvas from './components/FlowchartCanvas';
import WorkflowSimulationBar from './components/WorkflowSimulationBar';
import Minimap from './components/Minimap';
import ExportModal from './components/ExportModal';
import MultipleLREngineModal from './components/MultipleLREngineModal';
import { OPERATIONAL_STEPS, FLOWCHART_NODES } from './data/flowchartData';

export default function App() {
  const [searchQuery,      setSearchQuery]      = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSimulating,     setIsSimulating]     = useState(false);
  const [zoom,             setZoom]             = useState(0.65);
  const [pan,              setPan]              = useState({ x: 140, y: 40 });
  const [showConnections,  setShowConnections]  = useState(true);
  const [showMinimap,      setShowMinimap]      = useState(true);
  const [isDarkMode,       setIsDarkMode]       = useState(true);
  const [isExportOpen,     setIsExportOpen]     = useState(false);
  const [isLREngineOpen,   setIsLREngineOpen]   = useState(false);
  const [viewportSize,     setViewportSize]     = useState({ width: 1280, height: 800 });

  // Dark/light mode
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  // Auto step timer
  useEffect(() => {
    if (!isSimulating) return;
    const id = setInterval(() => {
      setCurrentStepIndex(i => {
        if (i >= OPERATIONAL_STEPS.length - 1) { setIsSimulating(false); return i; }
        return i + 1;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [isSimulating]);

  // Auto-pan to active node while simulating
  useEffect(() => {
    const stepNode = OPERATIONAL_STEPS[currentStepIndex];
    if (!stepNode || !isSimulating) return;
    const target = FLOWCHART_NODES.find(n => n.id === stepNode.nodeId);
    if (!target) return;
    const w = target.width || 340;
    setPan({
      x: -(target.x + w / 2) * zoom + viewportSize.width  / 2,
      y: -(target.y + 80)    * zoom + viewportSize.height / 2
    });
  }, [currentStepIndex, isSimulating, zoom, viewportSize]);

  // Auto-pan to matching node when user types search query
  useEffect(() => {
    if (!searchQuery) return;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;
    const match = FLOWCHART_NODES.find(node =>
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
    if (!match) return;
    const w = match.width || 340;
    setPan({
      x: -(match.x + w / 2) * zoom + viewportSize.width  / 2,
      y: -(match.y + 80)    * zoom + viewportSize.height / 2
    });
  }, [searchQuery, zoom, viewportSize]);

  const resetSimulation = () => { setIsSimulating(false); setCurrentStepIndex(0); };
  const resetView = () => { setZoom(0.65); setPan({ x: 140, y: 40 }); };
  const fitView   = () => { setZoom(0.55); setPan({ x: 100, y: 20 }); };

  const visibleCount = FLOWCHART_NODES.filter(
    n => selectedCategory === 'all' || n.categoryId === selectedCategory
  ).length;

  const currentSimNodeId = OPERATIONAL_STEPS[currentStepIndex]?.nodeId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Header
        searchQuery={searchQuery}      setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        isSimulating={isSimulating}    setIsSimulating={setIsSimulating}
        resetSimulation={resetSimulation}
        isDarkMode={isDarkMode}        setIsDarkMode={setIsDarkMode}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenLREngine={() => setIsLREngineOpen(true)}
      />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Toolbar
          zoom={zoom} setZoom={setZoom}
          resetView={resetView} fitView={fitView}
          showConnections={showConnections} setShowConnections={setShowConnections}
          showMinimap={showMinimap}         setShowMinimap={setShowMinimap}
          nodeCount={FLOWCHART_NODES.length} visibleNodeCount={visibleCount}
        />

        <FlowchartCanvas
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          currentSimStepNodeId={currentSimNodeId}
          isSimulating={isSimulating}
          zoom={zoom} setZoom={setZoom}
          pan={pan}   setPan={setPan}
          showConnections={showConnections}
          onViewportChange={setViewportSize}
        />

        <WorkflowSimulationBar
          currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex}
          isSimulating={isSimulating}         setIsSimulating={setIsSimulating}
          resetSimulation={resetSimulation}
        />

        {showMinimap && <Minimap pan={pan} zoom={zoom} viewportSize={viewportSize} />}
      </div>

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <MultipleLREngineModal isOpen={isLREngineOpen} onClose={() => setIsLREngineOpen(false)} />
    </div>
  );
}
