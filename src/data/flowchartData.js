// GOYAM Custom Logistics Management Software - Vertical Flowchart Data Architecture
// Split Login Node Architecture: Main Login Gate + 4 Connected Auth Sub-Nodes

export const CATEGORIES = [
  { id: 'all',               label: 'All Modules (Complete Vertical Flowchart)',   color: 'bg-slate-700 text-white' },
  { id: 'auth_multi_tenant', label: '1. Auth & Multi-Company Setup',               color: 'bg-indigo-600 text-white' },
  { id: 'core_pipeline',     label: '2. 15-Step Booking & LR Pipeline',            color: 'bg-emerald-600 text-white' },
  { id: 'customer_booking',  label: '3. Customer & Booking Engine',                color: 'bg-blue-600 text-white' },
  { id: 'multiple_lr_engine',label: '4. Multiple LR & Auto Math',                  color: 'bg-amber-600 text-white' },
  { id: 'lr_driver_vehicle', label: '5. Driver, Vehicle & Audit Log',              color: 'bg-purple-600 text-white' },
  { id: 'reports_admin',     label: '6. PDF Reports & Admin Control',              color: 'bg-rose-600 text-white' }
];

export const OPERATIONAL_STEPS = [
  { step: 1,  title: 'Start Flow & Secure Login',       nodeId: 'node_start',           desc: 'Initiate system login session' },
  { step: 2,  title: 'Login Credentials Portal',        nodeId: 'node_auth',            desc: 'Enter email/username & encrypted password' },
  { step: 3,  title: 'User Authorization Decision',     nodeId: 'node_dec_auth',        desc: 'Check active user status & permissions' },
  { step: 4,  title: 'Select Authorized Company',       nodeId: 'node_company_select',  desc: 'Switch context to Company A, B, or C' },
  { step: 5,  title: 'Company Operational Dashboard',   nodeId: 'node_dashboard',       desc: 'View operational metrics & active orders' },
  { step: 6,  title: 'Select or Create Customer',       nodeId: 'node_customer',        desc: 'Select existing or add new customer master' },
  { step: 7,  title: 'Create Booking & Auto BK No',     nodeId: 'node_booking',         desc: 'System auto-generates BK-2026-00001' },
  { step: 8,  title: 'Define Required LR Quantity',     nodeId: 'node_req_qty',         desc: 'Set Total Required LRs (e.g. 100)' },
  { step: 9,  title: 'Open LR Execution Engine',        nodeId: 'node_lr_module',       desc: 'Displays 100 Required, 0 Generated, 100 Pending' },
  { step: 10, title: 'Generate LR Record',              nodeId: 'node_create_lr',       desc: 'System auto-generates LR-2026-000001' },
  { step: 11, title: 'Input Shipment Details',          nodeId: 'node_lr_details',      desc: 'Enter container, weight, material & locations' },
  { step: 12, title: 'Assign Driver & Vehicle',         nodeId: 'node_assign_fleet',    desc: 'Assign 1 Driver & 1 Vehicle per LR' },
  { step: 13, title: 'Save & Commit LR Record',         nodeId: 'node_save_lr',         desc: 'LR linked to parent Booking' },
  { step: 14, title: 'Real-Time LR Balance Tracker',    nodeId: 'node_auto_math',       desc: 'Tracks Pending LRs, Completed LRs & Auto Finish' },
  { step: 15, title: 'Booking Status: COMPLETED',       nodeId: 'node_step15_completion', desc: 'When Pending LR = 0 ➔ Booking auto-set COMPLETED' }
];

export const FLOWCHART_NODES = [

  // ── 1. START ─────────────────────────────────────────────────────────────
  {
    id: 'node_start',
    categoryId: 'auth_multi_tenant',
    nodeType: 'start_end',
    title: 'Start — System Operational Session',
    subtitle: 'GOYAM Logistics Management System',
    badge: 'START', badgeType: 'purple',
    icon: 'PlayCircle',
    x: 580, y: 60, width: 400,
    items: [],
    connections: ['node_auth']
  },

  // ── 2. MAIN LOGIN BOX (Credentials Entry) ──────────────────────────────────
  {
    id: 'node_auth',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'System Login & Authentication Portal',
    subtitle: 'Primary User Access & Credential Gateway',
    stepNumber: 2,
    badge: 'LOGIN GATEWAY', badgeType: 'info',
    icon: 'Lock',
    x: 580, y: 220, width: 400,
    itemsTitle: 'Login Credentials:',
    items: [
      'Username / Email Address',
      'Password (Encrypted & Secure)'
    ],
    connections: ['node_auth_cred', 'node_auth_pass', 'node_auth_roles', 'node_auth_perm']
  },

  // ── 2A. SUB-NODE: USERNAME/PASSWORD & SECURE AUTH ─────────────────────────
  {
    id: 'node_auth_cred',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Username / Password & Secure Auth',
    subtitle: 'Credential Verification & Session Token',
    badge: 'Active', badgeType: 'completed',
    icon: 'KeyRound',
    x: 40, y: 580, width: 320,
    itemsTitle: 'Auth Sub-Module:',
    items: [
      'Email or Username + Encrypted Password',
      'SHA-256 Hash + Session Token Generation'
    ],
    connections: ['node_dec_auth']
  },

  // ── 2B. SUB-NODE: FORGOT & PASSWORD CHANGE ────────────────────────────────
  {
    id: 'node_auth_pass',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Forgot Password & Password Change',
    subtitle: 'OTP Reset Flow & Security Policy',
    badge: 'Active', badgeType: 'info',
    icon: 'RefreshCcw',
    x: 400, y: 580, width: 320,
    itemsTitle: 'Security Sub-Module:',
    items: [
      'Forgot Password (OTP / Email Reset Link Flow)',
      'Password Change (Enforce Strong Security Policy)'
    ],
    connections: ['node_dec_auth']
  },

  // ── 2C. SUB-NODE: USER STATUS & ROLE ACCESS ───────────────────────────────
  {
    id: 'node_auth_roles',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Active Status & Role-Based Access',
    subtitle: 'User Enable/Disable & Role Rules',
    badge: 'Config', badgeType: 'warning',
    icon: 'UserCheck',
    x: 760, y: 580, width: 320,
    itemsTitle: 'Access Control Sub-Module:',
    items: [
      'Active / Inactive Status (Admin Enable/Disable)',
      'Role-Based Access (Admin / Manager / Employee)'
    ],
    connections: ['node_dec_auth']
  },

  // ── 2D. SUB-NODE: PERMISSION MODULE & LOGOUT ──────────────────────────────
  {
    id: 'node_auth_perm',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Permission Module & Logout Handler',
    subtitle: 'Granular Access & Session Terminate',
    badge: 'Config / Active', badgeType: 'purple',
    icon: 'GitBranch',
    x: 1120, y: 580, width: 320,
    itemsTitle: 'Session & Audit Sub-Module:',
    items: [
      'Permission-Based Access per System Module',
      'Logout (Session Destroy + Audit Log Entry)'
    ],
    connections: ['node_dec_auth']
  },

  // ── 3. DECISION GATE: AUTHORIZED CREDENTIALS? ─────────────────────────────
  {
    id: 'node_dec_auth',
    categoryId: 'auth_multi_tenant',
    nodeType: 'decision',
    title: 'Authorized Credentials?',
    subtitle: 'Account Status & Permission Check',
    stepNumber: 3,
    badge: 'DECISION GATE', badgeType: 'pending',
    icon: 'HelpCircle',
    x: 580, y: 980, width: 400,
    itemsTitle: 'Routing Logic:',
    items: [
      'Yes ➔ Proceed to Company Selection',
      'No  ➔ Password Reset / Deny Access'
    ],
    connections: ['node_company_select', 'node_auth_denied']
  },

  // ── LEFT BRANCH: AUTH DENIED / ACCESS BLOCKED ─────────────────────────────
  {
    id: 'node_auth_denied',
    categoryId: 'auth_multi_tenant',
    nodeType: 'warning',
    title: 'Access Denied / Reset Password',
    subtitle: 'Invalid Credentials or Inactive User',
    badge: 'DENIED / RESET', badgeType: 'warning',
    icon: 'AlertTriangle',
    x: 80, y: 980, width: 320,
    itemsTitle: 'Resolution Actions:',
    items: [
      'If Inactive or Wrong Password ➔ Deny Access',
      'Trigger Forgot Password / Contact Admin',
      'Prompt User to Retry Credentials'
    ],
    connections: ['node_auth']
  },

  // ── 4. MAIN COMPANY SELECTION GATEWAY ──────────────────────────────────────
  {
    id: 'node_company_select',
    categoryId: 'auth_multi_tenant',
    nodeType: 'input_data',
    title: 'Select Authorized Company',
    subtitle: 'Multi-Tenant Data Isolation Engine',
    stepNumber: 4,
    badge: 'COMPANY GATEWAY', badgeType: 'info',
    icon: 'Building2',
    x: 580, y: 1320, width: 400,
    itemsTitle: 'Company Context Switcher:',
    items: [
      'Select active company context for current operational session',
      'Enforce complete database level data isolation per entity'
    ],
    fields: [
      { name: 'Active Context', type: 'Select Company dropdown' }
    ],
    connections: ['node_comp_a', 'node_comp_b', 'node_comp_c']
  },

  // ── 4A. SUB-NODE: COMPANY A ──────────────────────────────────────────────
  {
    id: 'node_comp_a',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Company A Context',
    subtitle: 'Goyam Logistics India Pvt Ltd',
    badge: 'Primary Entity', badgeType: 'completed',
    icon: 'Building',
    x: 140, y: 1720, width: 340,
    itemsTitle: 'Entity Specifications:',
    items: [
      'Isolated DB: goyam_logistics_db',
      'Road Transport, Multi-Axle Fleet & National Operations',
      'Direct Context Switch ➔ Opens Company A Dashboard'
    ],
    connections: ['node_dashboard']
  },

  // ── 4B. SUB-NODE: COMPANY B ──────────────────────────────────────────────
  {
    id: 'node_comp_b',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Company B Context',
    subtitle: 'Goyam Freight Forwarders',
    badge: 'Freight Entity', badgeType: 'info',
    icon: 'Ship',
    x: 610, y: 1720, width: 340,
    itemsTitle: 'Entity Specifications:',
    items: [
      'Isolated DB: goyam_freight_db',
      'Express Cargo, Port Operations & Container Freight',
      'Direct Context Switch ➔ Opens Company B Dashboard'
    ],
    connections: ['node_dashboard']
  },

  // ── 4C. SUB-NODE: COMPANY C ──────────────────────────────────────────────
  {
    id: 'node_comp_c',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Company C Context',
    subtitle: 'Goyam Supply Chain Solutions',
    badge: 'Supply Chain', badgeType: 'purple',
    icon: 'PackageCheck',
    x: 1080, y: 1720, width: 340,
    itemsTitle: 'Entity Specifications:',
    items: [
      'Isolated DB: goyam_supplychain_db',
      'Warehouse Hubs, Cold Storage & 3PL Logistics',
      'Direct Context Switch ➔ Opens Company C Dashboard'
    ],
    connections: ['node_dashboard']
  },

  // ── 5. OPERATIONAL DASHBOARD ──────────────────────────────────────────────
  {
    id: 'node_dashboard',
    categoryId: 'auth_multi_tenant',
    nodeType: 'process',
    title: 'Company Operational Dashboard',
    subtitle: 'Real-Time Order & Fleet Overview',
    stepNumber: 5,
    badge: 'DASHBOARD HUB', badgeType: 'completed',
    icon: 'LayoutDashboard',
    x: 580, y: 2120, width: 400,
    itemsTitle: 'Dashboard Highlights:',
    items: [
      'Isolated Company DB View & Metrics',
      'Live Active Bookings & Pending LR Queue',
      'Fleet Availability & Financial Summary'
    ],
    connections: ['node_customer']
  },

  // ── 6. CUSTOMER SELECTION & MASTER ────────────────────────────────────────
  {
    id: 'node_customer',
    categoryId: 'customer_booking',
    nodeType: 'input_data',
    title: 'Select or Create Customer Master',
    subtitle: 'Consignor / Consignee Billing Profile',
    stepNumber: 6,
    badge: 'CUSTOMER MASTER', badgeType: 'info',
    icon: 'Users',
    x: 580, y: 2500, width: 400,
    itemsTitle: 'Customer Operations:',
    items: [
      'Search Existing Customer (GST, Address, Billing)',
      'Add New Customer Master Record'
    ],
    fields: [
      { name: 'Customer ID', type: 'CUST-2026-089' },
      { name: 'Billing Type', type: 'To-Pay / Paid / Credit' }
    ],
    connections: ['node_cust_basic', 'node_cust_contact', 'node_cust_tax', 'node_cust_admin']
  },

  // ── 6A. SUB-NODE: BASIC CUSTOMER PROFILE ───────────────────────────────
  {
    id: 'node_cust_basic',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Basic Customer Details',
    subtitle: 'Identity & Entity Name',
    badge: 'Master Profile', badgeType: 'completed',
    icon: 'UserCheck',
    x: 40, y: 2880, width: 320,
    itemsTitle: 'Identity Fields:',
    items: [
      'Customer Name (Individual or Firm)',
      'Company / Business Registered Name, etc.'
    ],
    connections: ['node_booking']
  },

  // ── 6B. SUB-NODE: CONTACT & COMMUNICATION ──────────────────────────────
  {
    id: 'node_cust_contact',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Contact & Communication',
    subtitle: 'Representative Details',
    badge: 'Contact Info', badgeType: 'info',
    icon: 'PhoneCall',
    x: 400, y: 2880, width: 320,
    itemsTitle: 'Communication Fields:',
    items: [
      'Contact Person Name',
      'Mobile Number (SMS/WhatsApp Alerts)',
      'Email Address (Billing & Invoices), etc.'
    ],
    connections: ['node_booking']
  },

  // ── 6C. SUB-NODE: ADDRESS & TAX DETAILS ───────────────────────────────
  {
    id: 'node_cust_tax',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Address & GST/Tax Details',
    subtitle: 'Billing Location & Tax Code',
    badge: 'GST & Compliance', badgeType: 'warning',
    icon: 'FileCheck2',
    x: 760, y: 2880, width: 320,
    itemsTitle: 'Billing & Tax Fields:',
    items: [
      'Registered Business Address',
      'GSTIN / PAN / Tax Details (If Required), etc.'
    ],
    connections: ['node_booking']
  },

  // ── 6D. SUB-NODE: STATUS & ADMIN METADATA ──────────────────────────────
  {
    id: 'node_cust_admin',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Status & Admin Details',
    subtitle: 'Account State & Extra Notes',
    badge: 'Admin & Notes', badgeType: 'purple',
    icon: 'ClipboardList',
    x: 1120, y: 2880, width: 320,
    itemsTitle: 'Admin Fields:',
    items: [
      'Customer Status (Active / On-Hold / Inactive)',
      'Remarks & Credit Limit Terms',
      'Other Admin-Defined Details, etc.'
    ],
    connections: ['node_booking']
  },

  // ── 7. CREATE BOOKING & AUTO NO ───────────────────────────────────────────
  {
    id: 'node_booking',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Booking Management Portal',
    subtitle: 'Create & Manage Transport Requests',
    stepNumber: 7,
    badge: 'BOOKING ENGINE', badgeType: 'completed',
    icon: 'FileText',
    x: 580, y: 3260, width: 400,
    itemsTitle: 'System Auto-Generation:',
    items: [
      'System Auto-Generates Unique Booking No:',
      'BK-2026-00001 (Sequential per Company)'
    ],
    actions: ['Set Route', 'Set Rate Card', 'Set Terms'],
    connections: ['node_bk_basic', 'node_bk_routing', 'node_bk_cargo', 'node_bk_qty', 'node_bk_multi']
  },

  // ── 7A. SUB-NODE: BOOKING HEADER & PARTIES ─────────────────────────────
  {
    id: 'node_bk_basic',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Booking Header & Parties',
    subtitle: 'BK Number & Customer Profile',
    badge: 'BK Header', badgeType: 'completed',
    icon: 'FileText',
    x: 40, y: 3640, width: 300,
    itemsTitle: 'Header Fields:',
    items: [
      'Auto Booking No: BK-2026-00001',
      'Booking Date & Time Stamp',
      'Customer, Consignor & Consignee, etc.'
    ],
    connections: ['node_req_qty']
  },

  // ── 7B. SUB-NODE: PICKUP & DELIVERY ROUTING ────────────────────────────
  {
    id: 'node_bk_routing',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Pickup & Delivery Routing',
    subtitle: 'Origin & Destination Locations',
    badge: 'Route Master', badgeType: 'info',
    icon: 'MapPin',
    x: 370, y: 3640, width: 300,
    itemsTitle: 'Location Fields:',
    items: [
      'Pickup Location (Factory / Port)',
      'Delivery Location (Warehouse / Site), etc.'
    ],
    connections: ['node_req_qty']
  },

  // ── 7C. SUB-NODE: CARGO & CONTAINER SPECS ─────────────────────────────
  {
    id: 'node_bk_cargo',
    categoryId: 'customer_booking',
    nodeType: 'process',
    title: 'Cargo & Container Specs',
    subtitle: 'Material Type & Container Specs',
    badge: 'Cargo Details', badgeType: 'warning',
    icon: 'Package',
    x: 700, y: 3640, width: 300,
    itemsTitle: 'Cargo Fields:',
    items: [
      'Material Description & Weight',
      'Container Details & Size, etc.'
    ],
    connections: ['node_req_qty']
  },

  // ── 7D. SUB-NODE: REQUIRED QUANTITY & LR TARGET ────────────────────────
  {
    id: 'node_bk_qty',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Required Qty & LR Target',
    subtitle: 'Consignment Volume & Target LRs',
    badge: 'LR Targets', badgeType: 'purple',
    icon: 'Layers',
    x: 1030, y: 3640, width: 300,
    itemsTitle: 'Volume & LR Fields:',
    items: [
      'Total Container / Required Quantity',
      'Required LR Quantity Target (e.g. 100 LRs)',
      'Other Shipment Details, etc.'
    ],
    connections: ['node_req_qty']
  },

  // ── 7E. SUB-NODE: MULTIPLE LRS PER BOOKING ────────────────────────────
  {
    id: 'node_bk_multi',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Multiple LRs per Booking',
    subtitle: '1 Booking ➔ Multiple Linked LRs',
    badge: 'Multi-LR Link', badgeType: 'warning',
    icon: 'CopyCheck',
    x: 1360, y: 3640, width: 300,
    itemsTitle: 'Multi-LR Architecture:',
    items: [
      'Ability to generate multiple LR records against a single Booking',
      'Each LR remains linked to original parent Booking',
      'Dynamic tracking of required vs generated LR count'
    ],
    connections: ['node_req_qty']
  },

  // ── 8. DEFINE REQUIRED LR QUANTITY ───────────────────────────────────────
  {
    id: 'node_req_qty',
    categoryId: 'multiple_lr_engine',
    nodeType: 'input_data',
    title: 'Define Total Required LR Quantity',
    subtitle: 'Bulk Consignment Split Definition',
    stepNumber: 8,
    badge: 'INPUT REQUIRED LRs', badgeType: 'warning',
    icon: 'Hash',
    x: 580, y: 4020, width: 400,
    itemsTitle: 'Quantity Input:',
    items: [
      'Enter Total Required LRs for Booking (e.g. 100 LRs)'
    ],
    fields: [
      { name: 'Total Required LRs', type: '100 (Editable Integer)' }
    ],
    connections: ['node_lr_module']
  },

  // ── 9. OPEN LR EXECUTION ENGINE ───────────────────────────────────────────
  {
    id: 'node_lr_module',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Open LR Execution Engine',
    subtitle: 'Multiple LR Generation Dashboard',
    stepNumber: 9,
    badge: 'LR ENGINE HUB', badgeType: 'purple',
    icon: 'Layers',
    x: 580, y: 4360, width: 400,
    itemsTitle: 'Real-Time LR State Tracker:',
    items: [
      'Displays: 100 Required | 0 Generated | 100 Pending LRs'
    ],
    connections: ['node_create_lr']
  },

  // ── 10. GENERATE LR RECORD ────────────────────────────────────────────────
  {
    id: 'node_create_lr',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Generate Individual LR Record',
    subtitle: 'Single Lorry Receipt Creation',
    stepNumber: 10,
    badge: 'AUTO LR NO', badgeType: 'completed',
    icon: 'FileCheck',
    x: 580, y: 4660, width: 400,
    itemsTitle: 'Auto-Numbering:',
    items: [
      'Auto-Generates Unique LR No: LR-2026-000001'
    ],
    connections: ['node_lr_details']
  },

  // ── 11. SHIPMENT & LR DETAILS GATEWAY ─────────────────────────────────────
  {
    id: 'node_lr_details',
    categoryId: 'multiple_lr_engine',
    nodeType: 'input_data',
    title: 'Input LR Operational & Ledger Details',
    subtitle: 'Shipment Master Specifications & Dual Ledger Setup',
    stepNumber: 11,
    badge: 'LR DETAILS GATEWAY', badgeType: 'info',
    icon: 'PackageCheck',
    x: 580, y: 4960, width: 400,
    itemsTitle: 'Operational Details & Dual Ledger Engine:',
    items: [
      'Comprehensive LR Operational Form (15+ Mandatory Fields)',
      'Generates 2 Separate Ledger Bills: 1 Driver Freight Voucher & 1 Customer Freight Invoice'
    ],
    fieldsTitle: 'Mandatory Form Fields & Dual Ledgers:',
    fields: [
      'Auto LR No', 'LR Date', 'Booking No', 'Customer', 'Consignor', 'Consignee',
      'Container No', 'Container Details', 'Material Details', 'Quantity & Weight',
      'Pickup Location', 'Delivery Location', 'Driver', 'Vehicle', 'Driver Bill', 'Customer Bill, etc.'
    ],
    connections: ['node_lrd_fields', 'node_lrd_driver_bill', 'node_lrd_cust_bill']
  },

  // ── 11A. SUB-NODE: LR OPERATIONAL FIELD CATALOG ─────────────────────────
  {
    id: 'node_lrd_fields',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'LR Operational Fields Catalog',
    subtitle: '15 Operational Specifications',
    badge: '15+ Form Fields', badgeType: 'completed',
    icon: 'FileSpreadsheet',
    x: 230, y: 5600, width: 340,
    itemsTitle: 'LR Form Operational Details:',
    items: [
      'Automatic LR Number, LR Date, Booking Number',
      'Customer, Consignor & Consignee Profiles',
      'Container Number & Container Details',
      'Material Details, Quantity & Weight',
      'Pickup Location & Delivery Location',
      'Driver, Vehicle & Other Details, etc.'
    ],
    connections: ['node_assign_fleet']
  },

  // ── 11B. SUB-NODE: DRIVER FREIGHT BILL LEDGER ────────────────────────────
  {
    id: 'node_lrd_driver_bill',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Driver Freight Bill & Voucher Ledger',
    subtitle: 'Transporter Payment & Trip Advance',
    badge: 'Driver Bill', badgeType: 'warning',
    icon: 'Truck',
    x: 610, y: 5600, width: 340,
    itemsTitle: 'Driver Payment Ledger:',
    items: [
      'Separate Freight Bill / Voucher generated for Driver / Transporter',
      'Tracks Driver Hire Charges, Trip Cash Advance & Diesel Allowances',
      'Independent Driver Account Ledger & Settlement History, etc.'
    ],
    connections: ['node_assign_fleet']
  },

  // ── 11C. SUB-NODE: CUSTOMER FREIGHT INVOICE LEDGER ────────────────────────
  {
    id: 'node_lrd_cust_bill',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Customer Freight Invoice Ledger',
    subtitle: 'Client Revenue & Tax Billing',
    badge: 'Customer Bill', badgeType: 'info',
    icon: 'Receipt',
    x: 990, y: 5600, width: 340,
    itemsTitle: 'Customer Revenue Ledger:',
    items: [
      'Separate Freight Billing Invoice generated for Customer / Consignor',
      'Applies Customer Rate Card, Freight Charges, Taxes & GST Ledger',
      'Independent Customer Accounts Receivable Ledger Entry, etc.'
    ],
    connections: ['node_assign_fleet']
  },

  // ── 12. DRIVER & VEHICLE ASSIGNMENT ───────────────────────────────────────
  {
    id: 'node_assign_fleet',
    categoryId: 'lr_driver_vehicle',
    nodeType: 'input_data',
    title: 'Assign Driver & Vehicle per LR',
    subtitle: 'Fleet & Driver Resource Linking',
    stepNumber: 12,
    badge: '1 DRIVER + 1 VEHICLE', badgeType: 'info',
    icon: 'Truck',
    x: 580, y: 6120, width: 400,
    itemsTitle: 'Rule Enforcement:',
    items: [
      'Assign EXACTLY 1 Driver & 1 Vehicle per LR',
      'Driver Name, License No & Phone Number',
      'Vehicle No (e.g. MH-12-PQ-9988)'
    ],
    connections: ['node_save_lr']
  },

  // ── 13. SAVE & COMMIT LR RECORD ───────────────────────────────────────────
  {
    id: 'node_save_lr',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Save & Commit LR Record',
    subtitle: 'DB Persist & Master Linkage',
    stepNumber: 13,
    badge: 'SAVED & LINKED', badgeType: 'completed',
    icon: 'Database',
    x: 580, y: 6440, width: 400,
    itemsTitle: 'Database Commit:',
    items: [
      'LR Linked directly to Parent Booking (BK-2026-00001)',
      'Generated Count Increments by +1'
    ],
    connections: ['node_auto_math']
  },

  // ── 14. REAL-TIME LR BALANCE & COMPLETION TRACKER ─────────────────────────
  {
    id: 'node_auto_math',
    categoryId: 'multiple_lr_engine',
    nodeType: 'process',
    title: 'Real-Time LR Balance & Completion Tracker',
    subtitle: 'Live Tracking of Pending & Completed LRs',
    stepNumber: 14,
    badge: 'LR BALANCE TRACKER', badgeType: 'completed',
    icon: 'Calculator',
    x: 580, y: 6760, width: 400,
    itemsTitle: 'LR Status & Ledger Math:',
    items: [
      'Generated LRs: Displays live count of created LRs (e.g. 80 Generated)',
      'Pending LRs Balance: Remaining LRs (Pending = Required - Generated)',
      'Auto-Completion: When Pending = 0 ➔ Booking auto-marked COMPLETED'
    ],
    connections: ['node_step15_completion']
  },

  // ── 15. BOOKING COMPLETION ────────────────────────────────────────────────
  {
    id: 'node_step15_completion',
    categoryId: 'core_pipeline',
    nodeType: 'process',
    title: 'Booking Status: COMPLETED',
    subtitle: 'Automated Status Lifecycle Change',
    stepNumber: 15,
    badge: 'COMPLETED ✓', badgeType: 'completed',
    icon: 'Flag',
    x: 580, y: 7160, width: 400,
    itemsTitle: 'Completion Condition:',
    items: [
      'When Generated == Required (e.g. 100 == 100)',
      'Pending LR = 0 ➔ Booking auto-set to COMPLETED'
    ],
    connections: ['node_reports_audit']
  },

  // ── 16. REPORTS & AUDIT LOG ───────────────────────────────────────────────
  {
    id: 'node_reports_audit',
    categoryId: 'reports_admin',
    nodeType: 'process',
    title: 'Generate PDF Reports & Activity Audit Log',
    subtitle: 'Filtered Reports & Accountability Trail',
    badge: 'PDF & AUDIT LOG', badgeType: 'info',
    icon: 'FileSpreadsheet',
    x: 580, y: 7560, width: 400,
    itemsTitle: 'Report Types:',
    items: [
      'Generate Date-wise & Customer-wise PDF Reports',
      'Record Employee Audit Trail (Soft Delete & Timestamp)'
    ],
    connections: ['node_end']
  },

  // ── 17. END ───────────────────────────────────────────────────────────────
  {
    id: 'node_end',
    categoryId: 'reports_admin',
    nodeType: 'start_end',
    title: 'End — Order Fulfilled & Archived',
    subtitle: 'Data Persisted in Company Silo',
    badge: 'END', badgeType: 'purple',
    icon: 'CheckCircle',
    x: 580, y: 7960, width: 400,
    connections: []
  }
];

export const PIPELINE_CONNECTIONS = [
  { from: 'node_start',             to: 'node_auth',              label: 'Start Session' },

  // Main login branches out to 4 sub-feature nodes
  { from: 'node_auth',              to: 'node_auth_cred',         label: 'Credentials' },
  { from: 'node_auth',              to: 'node_auth_pass',         label: 'Password Policy' },
  { from: 'node_auth',              to: 'node_auth_roles',        label: 'Role Access' },
  { from: 'node_auth',              to: 'node_auth_perm',         label: 'Permissions' },

  // All 4 sub-feature nodes converge into Authorized Credentials decision gate
  { from: 'node_auth_cred',         to: 'node_dec_auth',          label: 'Validate' },
  { from: 'node_auth_pass',         to: 'node_dec_auth',          label: 'Policy Pass' },
  { from: 'node_auth_roles',        to: 'node_dec_auth',          label: 'Roles Verified' },
  { from: 'node_auth_perm',         to: 'node_dec_auth',          label: 'Perms Granted' },

  { from: 'node_dec_auth',          to: 'node_auth_denied',       label: 'No (Denied)' },
  { from: 'node_dec_auth',          to: 'node_company_select',    label: 'Yes (Authorized)' },
  { from: 'node_auth_denied',       to: 'node_auth',              label: 'Retry Login' },

  // Company selection branches out to 3 company entity sub-nodes
  { from: 'node_company_select',    to: 'node_comp_a',            label: 'Company A' },
  { from: 'node_company_select',    to: 'node_comp_b',            label: 'Company B' },
  { from: 'node_company_select',    to: 'node_comp_c',            label: 'Company C' },

  // All 3 company entity sub-nodes converge directly into Operational Dashboard Hub
  { from: 'node_comp_a',            to: 'node_dashboard',         label: 'Company A Active' },
  { from: 'node_comp_b',            to: 'node_dashboard',         label: 'Company B Active' },
  { from: 'node_comp_c',            to: 'node_dashboard',         label: 'Company C Active' },

  { from: 'node_dashboard',         to: 'node_customer',          label: 'Customer Engine' },

  // Customer Gateway branches out to 4 Customer Detail Sub-Nodes
  { from: 'node_customer',          to: 'node_cust_basic',        label: 'Basic Info' },
  { from: 'node_customer',          to: 'node_cust_contact',      label: 'Contact Info' },
  { from: 'node_customer',          to: 'node_cust_tax',          label: 'Address & GST' },
  { from: 'node_customer',          to: 'node_cust_admin',        label: 'Status & Admin' },

  // All 4 Customer Detail Sub-Nodes converge into Booking Gateway
  { from: 'node_cust_basic',        to: 'node_booking',           label: 'Profile Verified' },
  { from: 'node_cust_contact',      to: 'node_booking',           label: 'Contacts Set' },
  { from: 'node_cust_tax',          to: 'node_booking',           label: 'GST Validated' },
  { from: 'node_cust_admin',        to: 'node_booking',           label: 'Account Active' },

  // Booking Gateway branches out to 5 Booking Detail Sub-Nodes
  { from: 'node_booking',           to: 'node_bk_basic',          label: 'BK Header' },
  { from: 'node_booking',           to: 'node_bk_routing',        label: 'Route Master' },
  { from: 'node_booking',           to: 'node_bk_cargo',          label: 'Cargo Specs' },
  { from: 'node_booking',           to: 'node_bk_qty',            label: 'LR Target Qty' },
  { from: 'node_booking',           to: 'node_bk_multi',          label: 'Multi-LR Relation' },

  // All 5 Booking Detail Sub-Nodes converge into Set Target Qty step
  { from: 'node_bk_basic',          to: 'node_req_qty',           label: 'BK Generated' },
  { from: 'node_bk_routing',        to: 'node_req_qty',           label: 'Route Locked' },
  { from: 'node_bk_cargo',          to: 'node_req_qty',           label: 'Cargo Defined' },
  { from: 'node_bk_qty',            to: 'node_req_qty',           label: 'Qty Set' },
  { from: 'node_bk_multi',          to: 'node_req_qty',           label: 'LR Linkage' },

  { from: 'node_req_qty',           to: 'node_lr_module',         label: 'Open LR Module' },
  { from: 'node_lr_module',         to: 'node_create_lr',         label: 'Create LR' },
  { from: 'node_create_lr',         to: 'node_lr_details',        label: 'LR Form Input' },

  // Step 11: LR Details Gateway branches out to 3 LR Sub-Nodes
  { from: 'node_lr_details',        to: 'node_lrd_fields',        label: 'Field Catalog' },
  { from: 'node_lr_details',        to: 'node_lrd_driver_bill',   label: 'Driver Bill Ledger' },
  { from: 'node_lr_details',        to: 'node_lrd_cust_bill',     label: 'Customer Bill Ledger' },

  // All 3 LR Sub-Nodes converge into Fleet Assignment step
  { from: 'node_lrd_fields',        to: 'node_assign_fleet',      label: 'Specs Validated' },
  { from: 'node_lrd_driver_bill',   to: 'node_assign_fleet',      label: 'Driver Voucher Set' },
  { from: 'node_lrd_cust_bill',     to: 'node_assign_fleet',      label: 'Client Rate Set' },

  { from: 'node_assign_fleet',      to: 'node_save_lr',           label: 'Save Record' },
  { from: 'node_save_lr',           to: 'node_auto_math',         label: 'LR Balance Math' },
  { from: 'node_auto_math',         to: 'node_step15_completion', label: 'Pending LR = 0' },
  { from: 'node_step15_completion', to: 'node_reports_audit',     label: 'Generate Reports' },
  { from: 'node_reports_audit',     to: 'node_end',               label: 'Fulfilled' }
];
