import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Clock, FileText } from 'lucide-react';
import { OPERATIONAL_STEPS } from '../data/flowchartData';

export default function WorkflowSimulationBar({ currentStepIndex, setCurrentStepIndex, isSimulating, setIsSimulating, resetSimulation }) {
  const step = OPERATIONAL_STEPS[currentStepIndex];
  const pct  = Math.round(((currentStepIndex + 1) / OPERATIONAL_STEPS.length) * 100);

  // Live pending LR metric based on step
  const pending = Math.max(0, 100 - (
    currentStepIndex >= 14 ? 100 :
    currentStepIndex >= 12 ? 80 :
    currentStepIndex >= 10 ? 1 : 0
  ));

  return (
    <div className="sim-bar">
      {/* Progress Bar */}
      <div className="sim-prog-track">
        <div className="sim-prog-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="sim-row">
        {/* Step Num */}
        <div className="sim-step-num">#{currentStepIndex + 1}</div>

        {/* Info */}
        <div className="sim-info">
          <span className="sim-label">15-Step Workflow Simulator &nbsp;·&nbsp; {currentStepIndex + 1}/{OPERATIONAL_STEPS.length}</span>
          <div className="sim-step-title">{step.title}</div>
          <div className="sim-step-desc">{step.desc}</div>
        </div>


        {/* Controls */}
        <div className="sim-controls">
          <button className="btn-icon" onClick={() => setCurrentStepIndex(i => Math.max(0, i-1))} disabled={currentStepIndex === 0} title="Previous">
            <ChevronLeft size={16}/>
          </button>
          <button
            onClick={() => setIsSimulating(v => !v)}
            className={`btn ${isSimulating ? 'btn-amber' : 'btn-indigo'}`}
          >
            {isSimulating ? <><Pause size={13}/> Pause</> : <><Play size={13}/> Play</>}
          </button>
          <button className="btn-icon" onClick={() => setCurrentStepIndex(i => Math.min(OPERATIONAL_STEPS.length-1, i+1))} disabled={currentStepIndex === OPERATIONAL_STEPS.length-1} title="Next">
            <ChevronRight size={16}/>
          </button>
          <button className="btn-icon" onClick={resetSimulation} title="Reset">
            <RotateCcw size={15}/>
          </button>
        </div>
      </div>
    </div>
  );
}
