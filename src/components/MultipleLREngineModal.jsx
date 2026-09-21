import React, { useState } from 'react';
import { X, Layers, Plus, RotateCcw, CheckCircle2, Truck, FileText, ArrowRight, Zap, Receipt, ClipboardList, ShieldCheck } from 'lucide-react';

export default function MultipleLREngineModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'form_preview' | 'dual_ledger'
  const [targetQty, setTargetQty] = useState(100);
  const [selectedLr, setSelectedLr] = useState(null);
  
  const [lrs, setLrs] = useState([
    {
      id: 1,
      lrNo: 'LR-2026-000001',
      lrDate: '21-Sep-2026 10:14 AM',
      bookingNo: 'BK-2026-00001',
      customer: 'Goyam Global Freight Pvt Ltd',
      consignor: 'JNPT Port Cargo Terminal',
      consignee: 'Bhiwandi Central Warehouse',
      containerNo: 'CNTR-44901',
      containerDetails: '40ft High Cube ISO Container',
      materialDetails: 'Industrial Machinery & Spare Parts',
      quantity: '1 Container / 120 Packages',
      weight: '24.5 MT Gross (24.0 MT Net)',
      pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
      deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
      driver: 'Ramesh Kumar (DL-8821994)',
      vehicle: 'MH-12-PQ-9988 (Multi-Axle)',
      otherDetails: 'E-Way Bill: 88219900124 | Seal: SL-88912 | Transporter Notes: Express Delivery',
      driverFreightBill: '₹ 18,500 (Advance: ₹ 5,000 paid)',
      customerInvoiceBill: '₹ 32,000 + 18% GST (Total: ₹ 37,760)',
      status: 'LINKED & COMMITTED'
    },
    {
      id: 2,
      lrNo: 'LR-2026-000002',
      lrDate: '21-Sep-2026 10:28 AM',
      bookingNo: 'BK-2026-00001',
      customer: 'Goyam Global Freight Pvt Ltd',
      consignor: 'JNPT Port Cargo Terminal',
      consignee: 'Bhiwandi Central Warehouse',
      containerNo: 'CNTR-44902',
      containerDetails: '40ft High Cube ISO Container',
      materialDetails: 'Heavy Steel Coils & Fasteners',
      quantity: '1 Container / 8 Coils',
      weight: '22.0 MT Gross (21.5 MT Net)',
      pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
      deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
      driver: 'Suresh Verma (DL-3341882)',
      vehicle: 'GJ-06-ZZ-1234 (Trailer)',
      otherDetails: 'E-Way Bill: 88219900125 | Seal: SL-88913 | Transporter Notes: Fragile Handling',
      driverFreightBill: '₹ 17,800 (Advance: ₹ 4,500 paid)',
      customerInvoiceBill: '₹ 30,500 + 18% GST (Total: ₹ 35,990)',
      status: 'LINKED & COMMITTED'
    },
    {
      id: 3,
      lrNo: 'LR-2026-000003',
      lrDate: '21-Sep-2026 11:05 AM',
      bookingNo: 'BK-2026-00001',
      customer: 'Goyam Global Freight Pvt Ltd',
      consignor: 'JNPT Port Cargo Terminal',
      consignee: 'Bhiwandi Central Warehouse',
      containerNo: 'CNTR-44903',
      containerDetails: '40ft Standard Container',
      materialDetails: 'Textile Fabric Rolls & Yarn',
      quantity: '1 Container / 450 Bales',
      weight: '26.1 MT Gross (25.8 MT Net)',
      pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
      deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
      driver: 'Amit Singh (DL-9012441)',
      vehicle: 'KA-01-AB-5566 (Container Vehicle)',
      otherDetails: 'E-Way Bill: 88219900126 | Seal: SL-88914 | Transporter Notes: Water Proof Tarpaulin Covered',
      driverFreightBill: '₹ 19,200 (Advance: ₹ 6,000 paid)',
      customerInvoiceBill: '₹ 34,000 + 18% GST (Total: ₹ 40,120)',
      status: 'LINKED & COMMITTED'
    }
  ]);

  if (!isOpen) return null;

  const generatedCount = lrs.length;
  const pendingCount = Math.max(0, targetQty - generatedCount);

  const handleAddLR = () => {
    if (generatedCount >= targetQty) return;
    const nextId = generatedCount + 1;
    const padId = String(nextId).padStart(6, '0');
    const newLr = {
      id: nextId,
      lrNo: `LR-2026-${padId}`,
      lrDate: new Date().toLocaleString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      bookingNo: 'BK-2026-00001',
      customer: 'Goyam Global Freight Pvt Ltd',
      consignor: 'JNPT Port Cargo Terminal',
      consignee: 'Bhiwandi Central Warehouse',
      containerNo: `CNTR-${44900 + nextId}`,
      containerDetails: '40ft ISO Standard Container',
      materialDetails: `General Logistics Freight Cargo #${nextId}`,
      quantity: '1 Container / 100 Packages',
      weight: `${(20 + Math.random() * 8).toFixed(1)} MT Gross`,
      pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
      deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
      driver: `Driver ${nextId} (DL-${1000 + nextId})`,
      vehicle: `MH-${12 + (nextId % 20)}-AB-${1000 + nextId}`,
      otherDetails: `E-Way Bill: 88219900${nextId} | Seal: SL-${88900 + nextId} | Standard Freight Terms`,
      driverFreightBill: `₹ ${(17000 + Math.floor(Math.random() * 3000)).toLocaleString()} (Advance: ₹ 5,000 paid)`,
      customerInvoiceBill: `₹ ${(30000 + Math.floor(Math.random() * 5000)).toLocaleString()} + 18% GST`,
      status: 'LINKED & COMMITTED'
    };
    setLrs(prev => [newLr, ...prev]);
  };

  const handleAddBatch = (num) => {
    const toAdd = Math.min(num, targetQty - generatedCount);
    if (toAdd <= 0) return;
    const newBatch = [];
    const baseCount = generatedCount;
    for (let i = 1; i <= toAdd; i++) {
      const nextId = baseCount + i;
      const padId = String(nextId).padStart(6, '0');
      newBatch.push({
        id: nextId,
        lrNo: `LR-2026-${padId}`,
        lrDate: new Date().toLocaleString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        bookingNo: 'BK-2026-00001',
        customer: 'Goyam Global Freight Pvt Ltd',
        consignor: 'JNPT Port Cargo Terminal',
        consignee: 'Bhiwandi Central Warehouse',
        containerNo: `CNTR-${44900 + nextId}`,
        containerDetails: '40ft ISO Standard Container',
        materialDetails: `General Logistics Freight Cargo #${nextId}`,
        quantity: '1 Container / 100 Packages',
        weight: `${(20 + Math.random() * 8).toFixed(1)} MT Gross`,
        pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
        deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
        driver: `Driver ${nextId} (DL-${1000 + nextId})`,
        vehicle: `MH-${12 + (nextId % 20)}-AB-${1000 + nextId}`,
        otherDetails: `E-Way Bill: 88219900${nextId} | Seal: SL-${88900 + nextId} | Standard Freight Terms`,
        driverFreightBill: `₹ ${(17000 + Math.floor(Math.random() * 3000)).toLocaleString()} (Advance: ₹ 5,000 paid)`,
        customerInvoiceBill: `₹ ${(30000 + Math.floor(Math.random() * 5000)).toLocaleString()} + 18% GST`,
        status: 'LINKED & COMMITTED'
      });
    }
    setLrs(prev => [...newBatch.reverse(), ...prev]);
  };

  const handleReset = () => {
    setLrs([
      {
        id: 1,
        lrNo: 'LR-2026-000001',
        lrDate: '21-Sep-2026 10:14 AM',
        bookingNo: 'BK-2026-00001',
        customer: 'Goyam Global Freight Pvt Ltd',
        consignor: 'JNPT Port Cargo Terminal',
        consignee: 'Bhiwandi Central Warehouse',
        containerNo: 'CNTR-44901',
        containerDetails: '40ft High Cube ISO Container',
        materialDetails: 'Industrial Machinery & Spare Parts',
        quantity: '1 Container / 120 Packages',
        weight: '24.5 MT Gross (24.0 MT Net)',
        pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
        deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
        driver: 'Ramesh Kumar (DL-8821994)',
        vehicle: 'MH-12-PQ-9988 (Multi-Axle)',
        otherDetails: 'E-Way Bill: 88219900124 | Seal: SL-88912 | Transporter Notes: Express Delivery',
        driverFreightBill: '₹ 18,500 (Advance: ₹ 5,000 paid)',
        customerInvoiceBill: '₹ 32,000 + 18% GST (Total: ₹ 37,760)',
        status: 'LINKED & COMMITTED'
      },
      {
        id: 2,
        lrNo: 'LR-2026-000002',
        lrDate: '21-Sep-2026 10:28 AM',
        bookingNo: 'BK-2026-00001',
        customer: 'Goyam Global Freight Pvt Ltd',
        consignor: 'JNPT Port Cargo Terminal',
        consignee: 'Bhiwandi Central Warehouse',
        containerNo: 'CNTR-44902',
        containerDetails: '40ft High Cube ISO Container',
        materialDetails: 'Heavy Steel Coils & Fasteners',
        quantity: '1 Container / 8 Coils',
        weight: '22.0 MT Gross (21.5 MT Net)',
        pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
        deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
        driver: 'Suresh Verma (DL-3341882)',
        vehicle: 'GJ-06-ZZ-1234 (Trailer)',
        otherDetails: 'E-Way Bill: 88219900125 | Seal: SL-88913 | Transporter Notes: Fragile Handling',
        driverFreightBill: '₹ 17,800 (Advance: ₹ 4,500 paid)',
        customerInvoiceBill: '₹ 30,500 + 18% GST (Total: ₹ 35,990)',
        status: 'LINKED & COMMITTED'
      },
      {
        id: 3,
        lrNo: 'LR-2026-000003',
        lrDate: '21-Sep-2026 11:05 AM',
        bookingNo: 'BK-2026-00001',
        customer: 'Goyam Global Freight Pvt Ltd',
        consignor: 'JNPT Port Cargo Terminal',
        consignee: 'Bhiwandi Central Warehouse',
        containerNo: 'CNTR-44903',
        containerDetails: '40ft Standard Container',
        materialDetails: 'Textile Fabric Rolls & Yarn',
        quantity: '1 Container / 450 Bales',
        weight: '26.1 MT Gross (25.8 MT Net)',
        pickupLocation: 'JNPT Terminal Gate #3, Navi Mumbai',
        deliveryLocation: 'Warehouse Complex #4, Bhiwandi',
        driver: 'Amit Singh (DL-9012441)',
        vehicle: 'KA-01-AB-5566 (Container Vehicle)',
        otherDetails: 'E-Way Bill: 88219900126 | Seal: SL-88914 | Transporter Notes: Water Proof Tarpaulin Covered',
        driverFreightBill: '₹ 19,200 (Advance: ₹ 6,000 paid)',
        customerInvoiceBill: '₹ 34,000 + 18% GST (Total: ₹ 40,120)',
        status: 'LINKED & COMMITTED'
      }
    ]);
  };

  const activeLr = selectedLr || lrs[0];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 900 }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Layers size={20} color="#fbbf24" />
            Multiple LRs Against 1 Booking & Operational Details Engine
          </div>
          <button className="btn-icon" onClick={onClose}><X size={16}/></button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
          
          {/* Parent Booking Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0f2057 0%, #1740b0 100%)',
            border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: 14, padding: '12px 18px', marginBottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
          }}>
            <div className="flex items-center gap-3">
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <FileText size={22} color="#fff"/>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Parent Booking Master Record
                </div>
                <div style={{ fontSize: 17, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: '#fff' }}>
                  BK-2026-00001
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                  Customer: Goyam Global Freight • Route: JNPT Port ➔ Bhiwandi Hub
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="fc-badge badge-success">BOOKING ACTIVE</span>
              <span className="fc-badge badge-warning">MULTI-LR ENABLED</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2" style={{ marginBottom: 14, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
            <button
              onClick={() => setActiveTab('list')}
              className={`btn ${activeTab === 'list' ? 'btn-indigo' : 'btn-ghost'}`}
            >
              <Layers size={13}/> Generated LRs Queue ({lrs.length})
            </button>
            <button
              onClick={() => setActiveTab('form_preview')}
              className={`btn ${activeTab === 'form_preview' ? 'btn-indigo' : 'btn-ghost'}`}
            >
              <ClipboardList size={13}/> 15 LR Operational Form Fields
            </button>
            <button
              onClick={() => setActiveTab('dual_ledger')}
              className={`btn ${activeTab === 'dual_ledger' ? 'btn-amber' : 'btn-ghost'}`}
            >
              <Receipt size={13}/> Dual Ledger (Driver vs Customer Bill)
            </button>
          </div>

          {/* TAB 1: GENERATED LRS QUEUE & MATH SIMULATOR */}
          {activeTab === 'list' && (
            <>
              {/* Real-time Math Counters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                <div style={{
                  background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: 10, textAlign: 'center'
                }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Required LRs Target
                  </div>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: 4 }}>
                    <input
                      type="number"
                      value={targetQty}
                      onChange={e => setTargetQty(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{
                        width: 70, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-bright)',
                        color: '#fff', fontSize: 18, fontWeight: 800, textAlign: 'center', borderRadius: 8, padding: '2px 4px'
                      }}
                    />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>LRs</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 12, padding: 10, textAlign: 'center'
                }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
                    Generated LRs Count
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#6ee7b7', fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>
                    {generatedCount} <span style={{ fontSize: 11, fontWeight: 600, color: '#34d399' }}>LRs</span>
                  </div>
                </div>

                <div style={{
                  background: pendingCount > 0 ? 'rgba(245,158,11,0.08)' : 'rgba(139,92,246,0.1)',
                  border: pendingCount > 0 ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(139,92,246,0.3)',
                  borderRadius: 12, padding: 10, textAlign: 'center'
                }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: pendingCount > 0 ? '#fbbf24' : '#c084fc', textTransform: 'uppercase' }}>
                    {pendingCount > 0 ? 'Pending LRs Balance' : 'Booking Fulfilled!'}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: pendingCount > 0 ? '#fef08a' : '#e9d5ff', fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>
                    {pendingCount} <span style={{ fontSize: 11, fontWeight: 600 }}>{pendingCount === 0 ? '✓ COMPLETE' : 'Pending'}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between gap-2" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '9px 12px', marginBottom: 14
              }}>
                <div className="flex items-center gap-2">
                  <button onClick={handleAddLR} disabled={pendingCount === 0} className="btn btn-emerald font-semibold">
                    <Plus size={13}/> Generate Single LR (+1)
                  </button>
                  <button onClick={() => handleAddBatch(10)} disabled={pendingCount === 0} className="btn btn-indigo font-semibold">
                    <Zap size={13}/> Batch Generate (+10 LRs)
                  </button>
                  <button
                    onClick={() => handleAddBatch(targetQty - generatedCount)}
                    disabled={pendingCount === 0}
                    className="btn btn-ghost font-semibold"
                    style={{ borderColor: 'rgba(245,158,11,0.4)', color: '#fbbf24' }}
                  >
                    Complete All {targetQty} LRs
                  </button>
                </div>

                <button onClick={handleReset} className="btn-icon" title="Reset Simulator">
                  <RotateCcw size={14}/>
                </button>
              </div>

              {/* Generated Table */}
              <div style={{
                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)',
                borderRadius: 12, overflow: 'hidden', maxHeight: 250, overflowY: 'auto'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '8px 10px' }}>#</th>
                      <th style={{ padding: '8px 10px' }}>LR Number</th>
                      <th style={{ padding: '8px 10px' }}>Parent BK</th>
                      <th style={{ padding: '8px 10px' }}>Container / Weight</th>
                      <th style={{ padding: '8px 10px' }}>Driver & Vehicle</th>
                      <th style={{ padding: '8px 10px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lrs.map((item, idx) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedLr(item)}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          background: selectedLr?.id === item.id ? 'rgba(99,102,241,0.18)' : idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                          cursor: 'pointer'
                        }}
                      >
                        <td style={{ padding: '8px 10px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{lrs.length - idx}</td>
                        <td style={{ padding: '8px 10px', fontWeight: 700, color: '#38bdf8', fontFamily: "'JetBrains Mono', monospace" }}>{item.lrNo}</td>
                        <td style={{ padding: '8px 10px', color: '#a5b4fc', fontFamily: "'JetBrains Mono', monospace" }}>BK-2026-00001</td>
                        <td style={{ padding: '8px 10px', color: 'var(--text-primary)' }}>{item.containerNo} • {item.weight}</td>
                        <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>
                          <div className="flex items-center gap-1">
                            <Truck size={12} color="#34d399"/>
                            <span>{item.vehicle} ({item.driver.split(' ')[0]})</span>
                          </div>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <span className="pill-tag" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', borderColor: 'rgba(16,185,129,0.3)', fontSize: 8.5 }}>
                            ✓ LINKED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 2: 15 LR OPERATIONAL FORM FIELDS */}
          {activeTab === 'form_preview' && (
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8' }}>
                  Operational LR Master Form Details (Active Record: {activeLr.lrNo})
                </div>
                <span className="pill-tag" style={{ background: 'rgba(56,189,248,0.15)', color: '#7dd3fc' }}>
                  15 Operational Fields + etc.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                
                <div className="fc-fields-wrap">
                  <div className="fc-items-label">1. Automatic LR Number</div>
                  <div className="fc-field-pill" style={{ fontSize: 12, color: '#38bdf8' }}>{activeLr.lrNo}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">2. LR Date & Timestamp</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.lrDate}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">3. Booking Number</div>
                  <div className="fc-field-pill" style={{ fontSize: 12, color: '#a5b4fc' }}>{activeLr.bookingNo}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">4. Customer Profile</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.customer}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">5. Consignor Details</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.consignor}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">6. Consignee Details</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.consignee}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">7. Container Number</div>
                  <div className="fc-field-pill" style={{ fontSize: 12, color: '#34d399' }}>{activeLr.containerNo}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">8. Container Details</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.containerDetails}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">9. Material Details</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.materialDetails}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">10. Quantity & Package Count</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.quantity}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">11. Cargo Weight</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.weight}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">12. Pickup Location</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.pickupLocation}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">13. Delivery Location</div>
                  <div className="fc-field-pill" style={{ fontSize: 12 }}>{activeLr.deliveryLocation}</div>
                </div>

                <div className="fc-fields-wrap">
                  <div className="fc-items-label">14. Driver & Vehicle</div>
                  <div className="fc-field-pill" style={{ fontSize: 12, color: '#fbbf24' }}>{activeLr.vehicle} | {activeLr.driver}</div>
                </div>

              </div>

              <div className="fc-fields-wrap" style={{ marginTop: 10 }}>
                <div className="fc-items-label">15. Other Transportation Details & Notes (etc.)</div>
                <div className="fc-field-pill" style={{ fontSize: 11.5, color: '#cbd5e1' }}>{activeLr.otherDetails}</div>
              </div>
            </div>
          )}

          {/* TAB 3: DUAL LEDGER ACCOUNTING (DRIVER BILL VS CUSTOMER BILL) */}
          {activeTab === 'dual_ledger' && (
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fbbf24' }}>
                    Dual LR Ledger & Billing Architecture ({activeLr.lrNo})
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    Each LR generates 2 separate ledgers: 1 for Driver (Transporter Expense) & 1 for Company Customer (Client Invoice)
                  </div>
                </div>
                <span className="fc-badge badge-warning">DUAL LEDGER ENGINE</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                
                {/* Driver Freight Voucher Bill */}
                <div style={{
                  background: 'linear-gradient(145deg, #1c1003 0%, #3a1a05 100%)',
                  border: '1px solid rgba(251,146,60,0.4)', borderRadius: 12, padding: 14
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                    <div className="flex items-center gap-2">
                      <Truck size={18} color="#fb923c" />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#ffedd5' }}>Driver Freight Voucher Ledger</span>
                    </div>
                    <span className="fc-badge badge-warning">DRIVER BILL</span>
                  </div>

                  <div style={{ fontSize: 11, color: '#fed7aa', marginBottom: 10 }}>
                    Transporter Expense Ledger for Driver Payment, Cash Advance & Fuel Allowances
                  </div>

                  <div className="fc-fields-wrap" style={{ background: 'rgba(0,0,0,0.4)' }}>
                    <div className="fc-items-label">Driver Assigned:</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{activeLr.driver}</div>
                    <div style={{ fontSize: 11, color: '#fdba74', marginTop: 4 }}>Vehicle: {activeLr.vehicle}</div>
                  </div>

                  <div className="fc-fields-wrap" style={{ background: 'rgba(0,0,0,0.4)', marginTop: 8 }}>
                    <div className="fc-items-label">Driver Freight Amount & Advances:</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#fbbf24', fontFamily: "'Outfit', sans-serif" }}>
                      {activeLr.driverFreightBill}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                      • Separate Driver Account Ledger • Cash Advance Voucher Issued
                    </div>
                  </div>
                </div>

                {/* Customer Freight Billing Invoice */}
                <div style={{
                  background: 'linear-gradient(145deg, #051a2d 0%, #0c3359 100%)',
                  border: '1px solid rgba(56,189,248,0.4)', borderRadius: 12, padding: 14
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                    <div className="flex items-center gap-2">
                      <Receipt size={18} color="#38bdf8" />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#e0f2fe' }}>Customer Freight Invoice Ledger</span>
                    </div>
                    <span className="fc-badge badge-info">CUSTOMER BILL</span>
                  </div>

                  <div style={{ fontSize: 11, color: '#bae6fd', marginBottom: 10 }}>
                    Client Billing Invoice for Consignor Freight Rates, Tax & Company Revenue Ledger
                  </div>

                  <div className="fc-fields-wrap" style={{ background: 'rgba(0,0,0,0.4)' }}>
                    <div className="fc-items-label">Customer Profile:</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{activeLr.customer}</div>
                    <div style={{ fontSize: 11, color: '#7dd3fc', marginTop: 4 }}>Consignor: {activeLr.consignor}</div>
                  </div>

                  <div className="fc-fields-wrap" style={{ background: 'rgba(0,0,0,0.4)', marginTop: 8 }}>
                    <div className="fc-items-label">Customer Invoice Total (+ GST):</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#38bdf8', fontFamily: "'Outfit', sans-serif" }}>
                      {activeLr.customerInvoiceBill}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                      • Independent Company Revenue Ledger • Accounts Receivable Entry
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          <div className="modal-tip" style={{ marginTop: 14 }}>
            <strong>💡 Operational Architecture:</strong> Employee inputs 15 operational fields per LR (Auto LR No, Date, Booking No, Customer, Consignor, Consignee, Container, Weight, Locations, Driver, Vehicle, etc.). Each LR automatically creates <strong>2 separate ledgers</strong>: one for Driver Trip Payment Voucher and one for Customer Billing Revenue Invoice!
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close Simulator</button>
        </div>
      </div>
    </div>
  );
}
