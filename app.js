/**
 * NEXUSCARE AURA — CLINICAL OPERATING SYSTEM ENGINE
 * Designed with 4 Reference Blueprints:
 * - Ref 1: 3D Holographic Anatomy on Glowing Pedestal with Angle Controls (< || >),
 *          Callout Badges (Injured & Pain, Body temp 40°C, 175 BPM),
 *          3 Floating Organ Inspection Cards (Lungs 89%, Brain Good, Heart Attention),
 *          24-Dot Pressure Matrix, ECG Rhythm Wave, Equalizer Telemetry, Dual Sine Wave,
 *          and Signature Blue Gradient Emergency Services Card.
 * - Ref 2: AI Healthcare Ecosystem Architecture (Frontend -> Backend -> Gemini LLM / Symptom Classifier -> DB -> Leaflet.js).
 * - Ref 3: "intelly" Doctor Clinical Workstation (Category Filter, 4 Pastel KPI Cards,
 *          Patient Queue Table, Visit Details Card with Symptom Tags, Schedule Calendar).
 * - Ref 4: "Fenco" OS Window Frame with Dark Vertical Dock, Avatars, Sparklines.
 */

// ==========================================================================
// 1. GLOBAL STATE STORE
// ==========================================================================
const appState = {
  currentRole: 'guest', // 'guest', 'patient', 'staff', 'admin'
  currentView: 'landing', // 'landing', 'patient-dash', 'staff-dash', 'admin-capacity', 'architecture', 'cinema-booking', 'symptom-assistant', 'hospital-search', 'pharmacy', 'care-timeline', 'safety-reviews', 'settings'
  
  // Ref 1: Patient Profile (Ali Jafar / Ramesh Kumar)
  patient: {
    name: 'Ali Jafar',
    alias: 'Ramesh Kumar',
    age: 54,
    bloodGroup: 'B+',
    abhaId: '91-4820-1928-4011',
    pmjayEligible: true,
    condition: 'Cardiac Evaluation & Right Clavicle Strain',
    currentWaitMinutes: 14,
    vitals: {
      bp: '116/70',
      hr: 175,
      temp: 40.0,
      spo2: 89,
      glucose: '230/70',
      volume: '2.3%'
    }
  },

  // Ref 3: Staff Profile ("intelly" Doctor)
  staff: {
    name: 'Dr. Priya Nair',
    role: 'Chief Cardiac Surgeon',
    hospitalId: 'METRO-CAR-8841',
    hospital: 'Metro Super-Specialty Hospital',
    department: 'Cardiology',
    shift: '08:00 - 16:00 (Shift A)',
    room: 'Chamber 204'
  },

  // 3D Anatomy Rotation Angles
  anatomyAngles: [
    'Anterior (Front)',
    'Lateral (Right 45°)',
    'Posterior (Back)',
    'Lateral (Left 45°)'
  ],
  currentAngleIndex: 0,
  isRotating: false,
  rotationTimer: null,

  // Selected Booking Slot
  selectedSlot: null,
  selectedDoctor: 'Dr. Priya Nair',

  // Cart & Pre-Orders
  cartCount: 0,

  // Language & Accessibility
  currentLang: 'en',
  fontSize: 'normal'
};

// ==========================================================================
// 2. VIEW & ROLE NAVIGATION ENGINE
// ==========================================================================
function navigateToView(viewId) {
  // Update state
  appState.currentView = viewId;

  // Hide all views
  const views = document.querySelectorAll('.view-section');
  views.forEach(v => v.classList.add('hidden'));

  // Show target view
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Dock buttons
  const dockBtns = document.querySelectorAll('.dock-btn[data-nav]');
  dockBtns.forEach(btn => {
    if (btn.getAttribute('data-nav') === viewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Header Greeting dynamically
  updateHeaderForView(viewId);
}

function handleRoleSwitch(role) {
  appState.currentRole = role;

  // Update Role Switcher Tabs in Top Judge Bar
  const tabs = document.querySelectorAll('.role-tab-btn');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-role-switch') === role) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Navigate to appropriate primary view
  if (role === 'guest') {
    navigateToView('landing');
  } else if (role === 'patient') {
    navigateToView('patient-dash');
    showToast('👤 Switched to Patient Dashboard: Ali Jafar / Ramesh Kumar');
  } else if (role === 'staff') {
    navigateToView('staff-dash');
    showToast('🩺 Switched to "intelly" Doctor Workstation: Dr. Priya Nair');
  } else if (role === 'admin') {
    navigateToView('admin-capacity');
    showToast('🏛️ Switched to Hospital Administrator Capacity Console');
  }
}

function updateHeaderForView(viewId) {
  const greetingTitle = document.getElementById('top-bar-greeting');
  const greetingSub = document.getElementById('top-bar-sub');

  if (!greetingTitle || !greetingSub) return;

  if (viewId === 'patient-dash' || appState.currentRole === 'patient') {
    greetingTitle.innerHTML = `Hello Ali 👋 <span style="font-weight: 400; color: var(--text-muted); font-size: 0.95rem;">Welcome Back</span>`;
    greetingSub.textContent = `Review your health status, consultation logs, and upcoming checkups.`;
  } else if (viewId === 'staff-dash' || appState.currentRole === 'staff') {
    greetingTitle.innerHTML = `Good morning Dr. Priya Nair 👋 <span style="font-weight: 400; color: var(--text-muted); font-size: 0.95rem;">Cardiology Roster</span>`;
    greetingSub.textContent = `18 of 24 patients seen today • Next consultation in 4 minutes.`;
  } else if (viewId === 'admin-capacity' || appState.currentRole === 'admin') {
    greetingTitle.innerHTML = `Hospital Capacity Console 🏛️ <span style="font-weight: 400; color: var(--text-muted); font-size: 0.95rem;">Metro General Health System</span>`;
    greetingSub.textContent = `Bed Occupancy: 74% • OPD Chamber Utilization: Optimal • Zero Critical Waiting.`;
  } else if (viewId === 'architecture') {
    greetingTitle.innerHTML = `AI Healthcare Ecosystem Architecture 📐 <span style="font-weight: 400; color: var(--text-muted); font-size: 0.95rem;">Topology Reference</span>`;
    greetingSub.textContent = `Interactive technical diagram of Frontend, Backend, AI Models, and Leaflet Maps.`;
  } else {
    greetingTitle.innerHTML = `NexusCare Aura 🫀 <span style="font-weight: 400; color: var(--mint-300); font-size: 0.95rem;">Clinical Operating System</span>`;
    greetingSub.textContent = `Care Sooner • Zero Avoidable Waiting • Human-in-the-Loop AI Safeguards.`;
  }
}

// ==========================================================================
// 3. 3D HOLOGRAM ANATOMY CONTROLS (Ref 1 Centerpiece)
// ==========================================================================
function initAnatomyControls() {
  const btnPrev = document.getElementById('btn-angle-prev');
  const btnNext = document.getElementById('btn-angle-next');
  const btnPause = document.getElementById('btn-angle-pause');
  const angleLabel = document.getElementById('current-angle-label');
  const svgCanvas = document.getElementById('anatomy-svg-canvas');

  if (btnPrev && btnNext && angleLabel) {
    btnNext.addEventListener('click', () => {
      appState.currentAngleIndex = (appState.currentAngleIndex + 1) % appState.anatomyAngles.length;
      updateAnatomyDisplay();
    });

    btnPrev.addEventListener('click', () => {
      appState.currentAngleIndex = (appState.currentAngleIndex - 1 + appState.anatomyAngles.length) % appState.anatomyAngles.length;
      updateAnatomyDisplay();
    });

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        appState.isRotating = !appState.isRotating;
        if (appState.isRotating) {
          btnPause.textContent = '▶';
          showToast('🔄 3D Hologram automatic rotation enabled');
          appState.rotationTimer = setInterval(() => {
            appState.currentAngleIndex = (appState.currentAngleIndex + 1) % appState.anatomyAngles.length;
            updateAnatomyDisplay();
          }, 3500);
        } else {
          btnPause.textContent = '||';
          clearInterval(appState.rotationTimer);
          showToast('⏸️ 3D Hologram rotation paused');
        }
      });
    }
  }

  function updateAnatomyDisplay() {
    if (angleLabel) {
      angleLabel.textContent = appState.anatomyAngles[appState.currentAngleIndex];
    }
    if (svgCanvas) {
      // Perspective shift transform based on angle
      const angles = [0, 40, 180, -40];
      const rotY = angles[appState.currentAngleIndex];
      svgCanvas.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      svgCanvas.style.transform = `perspective(600px) rotateY(${rotY}deg) scale(0.98)`;
    }
  }
}

// Organ Inspection Modal Data (Ref 1 Floating Cards & Callout Pins)
const organDataMap = {
  lungs: {
    icon: '🫁',
    title: 'Pulmonary Telemetry & Oxygenation',
    sub: 'Respiratory Status: 89% Capacity',
    body: `
      <div style="font-size:0.85rem; line-height:1.6; color:#E2E8F0;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>SpO2 Oxygen Saturation:</span> <strong>98% (Optimal)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Tidal Airway Volume:</span> <strong>480 mL</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Respiratory Rate:</span> <strong>16 breaths / min</strong>
        </div>
        <div style="background:rgba(52,211,153,0.12); border-left:3px solid #34D399; padding:0.65rem; border-radius:6px; margin-top:0.75rem;">
          <strong>Clinical Note:</strong> Bilateral air entry clear. No wheeze or rales detected. Suitable for outpatient checkup.
        </div>
      </div>
    `
  },
  brain: {
    icon: '🧠',
    title: 'Neurological & Cognitive Telemetry',
    sub: 'Neural Status: Good (Normal EEG)',
    body: `
      <div style="font-size:0.85rem; line-height:1.6; color:#E2E8F0;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Consciousness Level:</span> <strong>Alert & Oriented (GCS 15/15)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Alpha Wave Rhythm:</span> <strong>10.2 Hz (Calm & Focused)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Cranial Nerve Response:</span> <strong>Intact (Normal)</strong>
        </div>
        <div style="background:rgba(59,130,246,0.12); border-left:3px solid #60A5FA; padding:0.65rem; border-radius:6px; margin-top:0.75rem;">
          <strong>Clinical Note:</strong> No focal deficits. Sleep-wake rhythm stable. Recommended: maintain adequate hydration.
        </div>
      </div>
    `
  },
  heart: {
    icon: '🫀',
    title: 'Coronary Hemodynamics & Rhythm',
    sub: 'Cardiac Status: Attention (175 BPM Tachycardia)',
    body: `
      <div style="font-size:0.85rem; line-height:1.6; color:#E2E8F0;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Resting Heart Rate:</span> <strong style="color:#F87171;">175 BPM (Tachycardia Alert)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Arterial Pressure:</span> <strong>116 / 70 mmHg</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>ECG QTc Interval:</span> <strong>412 ms (Normal Axis)</strong>
        </div>
        <div style="background:rgba(239,68,68,0.15); border-left:3px solid #EF4444; padding:0.65rem; border-radius:6px; margin-top:0.75rem;">
          <strong style="color:#FCA5A5;">Priority Action:</strong> Elevated heart rate detected. Scheduled priority chamber consultation with Dr. Priya Nair at 11:00 AM.
        </div>
      </div>
    `
  },
  shoulder: {
    icon: '🦴',
    title: 'Right Clavicle & Shoulder Telemetry',
    sub: 'Orthopedic Status: Injured & Pain (Amber Flag)',
    body: `
      <div style="font-size:0.85rem; line-height:1.6; color:#E2E8F0;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Range of Motion:</span> <strong>Restricted abduction (80°)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Reported Pain Score:</span> <strong style="color:#FCD34D;">6 / 10 (Moderate Post-Strain)</strong>
        </div>
        <div style="background:rgba(245,158,11,0.15); border-left:3px solid #F59E0B; padding:0.65rem; border-radius:6px; margin-top:0.75rem;">
          <strong>Action:</strong> Apply cold compression pack. Dr. Ali Jafar recommends an ultrasound soft tissue scan if tenderness persists beyond 48 hours.
        </div>
      </div>
    `
  },
  core: {
    icon: '🌡️',
    title: 'Core Thermoregulation',
    sub: 'Body Temperature: 40°C (Hyperthermic Alert)',
    body: `
      <div style="font-size:0.85rem; line-height:1.6; color:#E2E8F0;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Tympanic Temperature:</span> <strong style="color:#67E8F9;">40.0°C (104.0°F)</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Hydration Status:</span> <strong>Mild Diaphoresis</strong>
        </div>
        <div style="background:rgba(6,182,212,0.15); border-left:3px solid #06B6D4; padding:0.65rem; border-radius:6px; margin-top:0.75rem;">
          <strong>Recommendation:</strong> Oral hydration salts (ORS) administered. Paracetamol 650mg verified by pharmacy.
        </div>
      </div>
    `
  }
};

function openOrganModal(organKey) {
  const data = organDataMap[organKey];
  if (!data) return;

  const modal = document.getElementById('modal-organ-inspect');
  const icon = document.getElementById('organ-modal-icon');
  const title = document.getElementById('organ-modal-title');
  const sub = document.getElementById('organ-modal-sub');
  const body = document.getElementById('organ-modal-body');

  if (modal && icon && title && sub && body) {
    icon.textContent = data.icon;
    title.textContent = data.title;
    sub.textContent = data.sub;
    body.innerHTML = data.body;
    modal.classList.add('active');
  }
}

// ==========================================================================
// 4. "intelly" DOCTOR & CLINICAL WORKSTATION (Ref 3)
// ==========================================================================
function selectStaffPatient(name, age, blood, bp, hr, condition) {
  const nameEl = document.getElementById('visit-patient-name');
  const metaEl = document.getElementById('visit-patient-meta');
  const bpEl = document.getElementById('visit-bp-val');
  const hrEl = document.getElementById('visit-hr-val');

  if (nameEl) nameEl.textContent = name;
  if (metaEl) metaEl.textContent = `Age ${age} • Blood: ${blood} • Condition: ${condition}`;
  if (bpEl) bpEl.textContent = bp;
  if (hrEl) hrEl.textContent = hr;

  // Highlight active row cleanly across all browsers
  const rows = document.querySelectorAll('#intelly-queue-rows tr');
  rows.forEach(r => {
    if (r.textContent.includes(name)) {
      r.classList.add('active-row');
    } else {
      r.classList.remove('active-row');
    }
  });

  showToast(`📋 Loaded clinical record for ${name}`);
}

function callNextPatient(name, token) {
  // Web Audio chime
  playNotificationChime();
  showToast(`📢 Calling ${name} (Token ${token}) to Chamber 204`);
}

// Audio Chime Synthesizer via Web Audio API
function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log('Audio chime not supported');
  }
}

// Emergency Ambulance Siren Sound Synthesizer
function playAmbulanceSiren() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(950, ctx.currentTime + 0.35);
    osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.7);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.25);
  } catch (e) {
    console.log('Siren audio not supported');
  }
}

// ==========================================================================
// 5. APPOINTMENT VACANCY MATRIX (Replaced Movie Tickets)
// ==========================================================================
function initVacancyMatrix() {
  const mount = document.getElementById('cinema-seat-matrix');
  if (!mount) return;

  // Generate 36 slots across Rooms 201-206 (9:00 AM to 5:00 PM)
  const times = [
    '09:00', '09:20', '09:40', '10:00', '10:20', '10:40',
    '11:00', '11:20', '11:40', '12:00', '12:20', '12:40',
    '14:00', '14:20', '14:40', '15:00', '15:20', '15:40',
    '16:00', '16:20', '16:40', '17:00', '17:20', '17:40'
  ];

  mount.innerHTML = '';
  times.forEach((t, index) => {
    const isOccupied = (index % 3 === 0) || (index === 6); // slot 6 (11:00 AM) is Ali Jafar's slot
    const slot = document.createElement('div');
    slot.className = `vacancy-slot-card ${isOccupied ? 'occupied' : 'vacant'}`;
    slot.setAttribute('data-time', t);
    slot.setAttribute('data-chamber', `Chamber ${201 + (index % 4)}`);

    slot.innerHTML = `
      <div class="slot-time-txt">${t}</div>
      <div class="slot-status-txt">${isOccupied ? 'In Session' : 'Vacancy'}</div>
    `;

    if (!isOccupied) {
      slot.addEventListener('click', () => {
        document.querySelectorAll('.vacancy-slot-card').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        appState.selectedSlot = { time: t, chamber: `Chamber ${201 + (index % 4)}` };
        
        const summary = document.getElementById('selected-seat-summary-txt');
        if (summary) {
          summary.innerHTML = `Selected Vacancy: <strong>${t} Today</strong> in <strong>${appState.selectedSlot.chamber}</strong> with Dr. Priya Nair`;
        }
      });
    }

    mount.appendChild(slot);
  });

  const confirmBtn = document.getElementById('btn-confirm-seat-booking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (appState.selectedSlot) {
        showToast(`🎟️ Consultation Vacancy confirmed for ${appState.selectedSlot.time} (${appState.selectedSlot.chamber})!`);
      } else {
        showToast('🎟️ 11:00 AM Chamber 204 confirmed under PMJAY Cashless Network!');
      }
    });
  }
}

// ==========================================================================
// 6. SYMPTOM DISCUSSION ASSISTANT & RED-FLAG ESCALATION
// ==========================================================================
function initSymptomAssistant() {
  const sendBtn = document.getElementById('btn-send-chat');
  const input = document.getElementById('chat-user-input');

  if (sendBtn && input) {
    sendBtn.addEventListener('click', handleChatSubmit);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChatSubmit();
    });
  }
}

function handleChatSubmit() {
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  appendChatBubble(userText, 'user');
  input.value = '';

  // Process symptoms
  setTimeout(() => {
    evaluateSymptoms(userText);
  }, 600);
}

function appendChatBubble(text, sender) {
  const mount = document.getElementById('chat-messages-container');
  if (!mount) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;
  mount.appendChild(bubble);
  mount.scrollTop = mount.scrollHeight;
}

function evaluateSymptoms(text) {
  const lower = text.toLowerCase();
  const banner = document.getElementById('urgent-escalation-banner');

  if (lower.includes('chest') || lower.includes('tightness') || lower.includes('arm') || lower.includes('breath') || lower.includes('heart') || lower.includes('severe')) {
    // Red flag escalation
    if (banner) banner.style.display = 'flex';
    playAmbulanceSiren();

    appendChatBubble(`
      <strong style="color:#FCA5A5;">⚠️ CRITICAL ALERT:</strong> Symptoms of chest tightness, breathlessness, or radiating arm pain require immediate in-person clinical evaluation.
      <br><br>
      <strong>Next Steps:</strong>
      1. An emergency ambulance alert has been prepared.
      2. Avoid physical exertion and remain seated.
      3. A supervising doctor (Dr. Priya Nair) has been alerted.
    `, 'assistant');
    showToast('🚨 Red-Flag Alert: Emergency Ambulance Dispatch ready');
  } else if (lower.includes('fever') || lower.includes('throat') || lower.includes('cold')) {
    if (banner) banner.style.display = 'none';
    appendChatBubble(`
      Thank you for providing those details. For mild fever and sore throat:
      <br><br>
      1. Stay well hydrated with lukewarm fluids.
      2. Monitor your temperature twice daily.
      3. You can book an outpatient consultation or telehealth call if fever exceeds 38.5°C.
      <br><br>
      <em style="font-size:0.75rem; color:var(--mint-200);">Supervising Clinician: Dr. Anita Joshi (Pediatrics & General Care).</em>
    `, 'assistant');
  } else {
    if (banner) banner.style.display = 'none';
    appendChatBubble(`
      I have recorded your symptoms. Based on your profile, we recommend monitoring over the next 24 hours. Would you like to schedule an appointment vacancy or discuss this with a nurse via telehealth?
    `, 'assistant');
  }
}

function triggerSymptomDemo(type) {
  const input = document.getElementById('chat-user-input');
  if (!input) return;

  if (type === 'urgent') {
    input.value = "Severe chest tightness and radiating pain to left arm";
  } else if (type === 'moderate') {
    input.value = "Mild fever of 38.2°C and sore throat for 2 days";
  } else if (type === 'ortho') {
    input.value = "Right shoulder pain after carrying heavy groceries";
  }
  handleChatSubmit();
}

// ==========================================================================
// 7. HOSPITALS, PHARMACY & CARE TIMELINE DATA
// ==========================================================================
const hospitalData = [
  {
    name: 'Metro Super-Specialty Hospital',
    distance: '1.8 km',
    erWait: '12 mins',
    badge: 'Cath Lab Ready • Level 1 Trauma',
    reason: 'Best match for acute cardiovascular symptoms. Dr. Priya Nair on duty.'
  },
  {
    name: 'AIIMS Trauma Bay & Critical Care',
    distance: '3.4 km',
    erWait: '18 mins',
    badge: 'Resuscitation Ready',
    reason: 'State-funded tertiary apex referral center with 100% PMJAY cashless coverage.'
  },
  {
    name: 'St. Jude Orthopedic & Joint Institute',
    distance: '2.1 km',
    erWait: '15 mins',
    badge: '2 Fracture Suites Active',
    reason: 'Specialized in shoulder clavicle strain, fractures, and joint mobility scans.'
  },
  {
    name: 'City Children & Maternity Hospital',
    distance: '4.0 km',
    erWait: '8 mins',
    badge: 'NICU Active',
    reason: 'Dedicated pediatric emergency department with zero waiting.'
  }
];

function renderHospitals() {
  const mount = document.getElementById('hospitals-list-grid');
  if (!mount) return;

  mount.innerHTML = hospitalData.map(h => `
    <div class="mirror-card" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <strong style="color:#FFFFFF; font-size:1.05rem;">${h.name}</strong>
          <span style="font-size:0.75rem; background:rgba(52,211,153,0.18); color:var(--mint-300); padding:3px 8px; border-radius:99px; font-weight:800;">${h.distance}</span>
        </div>
        <div style="font-size:0.8rem; color:#60A5FA; font-weight:700; margin-bottom:0.5rem;">● ${h.badge}</div>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.45;">${h.reason}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.25rem;">
        <span style="font-size:0.8rem; color:#FCD34D;">ER Wait: <strong>${h.erWait}</strong></span>
        <button class="btn-primary-forest" style="font-size:0.78rem; padding:0.4rem 0.9rem;" onclick="navigateToView('cinema-booking')">Book Vacancy</button>
      </div>
    </div>
  `).join('');
}

const pharmacyData = [
  {
    name: 'Atorvastatin 20mg (Cardio-Lipid Refill)',
    dosage: '1 tablet daily at bedtime • 30 days pack',
    price: '₹145 (100% PMJAY Covered)',
    stock: 'In Stock',
    preOrder: false
  },
  {
    name: 'Metoprolol Tartrate 50mg (Beta-Blocker)',
    dosage: '1 tablet twice daily • Prescribed by Dr. Priya Nair',
    price: '₹98 (100% PMJAY Covered)',
    stock: 'In Stock',
    preOrder: false
  },
  {
    name: 'Ticagrelor 90mg (Antiplatelet Specialty)',
    dosage: 'Specialty cardiac reserve pack',
    price: '₹420 (Pre-Order Available)',
    stock: 'Out of Stock • Restock: 22 Oct',
    preOrder: true
  },
  {
    name: 'Paracetamol 650mg & ORS Sachet Kit',
    dosage: 'Thermoregulation & Fever management kit',
    price: '₹45 (Free under Community Care)',
    stock: 'In Stock',
    preOrder: false
  }
];

function renderPharmacy() {
  const mount = document.getElementById('pharmacy-products-grid');
  if (!mount) return;

  mount.innerHTML = pharmacyData.map(p => `
    <div class="mirror-card med-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <strong style="color:#FFFFFF; font-size:0.95rem;">${p.name}</strong>
          <span class="med-stock-badge ${p.preOrder ? 'pre-order' : 'in-stock'}">${p.stock}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.75rem;">${p.dosage}</div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
        <strong style="font-size:0.85rem; color:var(--mint-300);">${p.price}</strong>
        <button class="${p.preOrder ? 'btn-outline-forest' : 'btn-primary-forest'}" style="font-size:0.75rem; padding:0.4rem 0.85rem;" onclick="addToCart('${p.name}', ${p.preOrder})">
          ${p.preOrder ? '📦 Reserve Pre-Order' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(medName, isPreOrder) {
  appState.cartCount++;
  const counter = document.getElementById('cart-counter');
  if (counter) counter.textContent = appState.cartCount;

  if (isPreOrder) {
    showToast(`📦 Pre-order reserved for ${medName}. Pharmacist notification active.`);
  } else {
    showToast(`🛒 Added ${medName} to pickup cart.`);
  }
}

// Safety Report Form Submission
function submitSafetyReport() {
  const cat = document.getElementById('hazard-category');
  const loc = document.getElementById('hazard-location');
  const details = document.getElementById('hazard-details');

  if (!loc || !loc.value.trim()) {
    showToast('⚠️ Please specify the location of the hazard');
    return;
  }

  const list = document.getElementById('safety-tracker-list');
  if (list) {
    const newItem = document.createElement('div');
    newItem.style.cssText = 'background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #EF4444;';
    newItem.innerHTML = `
      <div style="display: flex; justify-content: space-between;">
        <strong>${cat ? cat.value : 'Hazard Reported'} (${loc.value})</strong>
        <span style="font-size: 0.7rem; background: rgba(239, 68, 68, 0.2); color: #FCA5A5; padding: 2px 7px; border-radius: 99px;">Dispatched</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
        ${details ? details.value : 'Reported anonymously.'} • Safety team notified.
      </div>
    `;
    list.prepend(newItem);
  }

  showToast('⚠️ Safety hazard submitted privately. Housekeeping dispatched.');
  if (loc) loc.value = '';
  if (details) details.value = '';
}

// Unified Care Timeline & Health Records
const careTimelineData = [
  {
    date: 'Today, 20 Oct 2026 • 11:00 AM',
    title: 'In-Person Cardiology Consultation',
    doctor: 'Dr. Priya Nair, MD (Chief of Cardiology)',
    type: 'Consultation',
    status: 'Scheduled',
    badgeClass: 'badge-mint',
    details: 'Evaluation of resting tachycardia (175 BPM) and chest discomfort post exertion. Chamber 204.'
  },
  {
    date: 'Today, 20 Oct 2026 • 09:15 AM',
    title: '12-Lead Digital ECG & Telemetry Stream',
    doctor: 'Cardiac Diagnostic Lab (AIIMS Super-Specialty)',
    type: 'Diagnostic Report',
    status: 'Verified',
    badgeClass: 'badge-mint',
    details: 'Sinus tachycardia with normal PR and QTc intervals (412 ms). No acute ST segment elevation.'
  },
  {
    date: '18 Oct 2026 • 04:30 PM',
    title: 'E-Prescription Refill Verification',
    doctor: 'R.Ph Ananya Sharma (License #DL-8821)',
    type: 'Pharmacy',
    status: 'Dispensed',
    badgeClass: 'badge-mint',
    details: 'Atorvastatin 20mg (30 tabs) + Metoprolol Tartrate 50mg (60 tabs). Co-Pay 100% PMJAY covered.'
  },
  {
    date: '14 Oct 2026 • 02:00 PM',
    title: 'Right Shoulder Clavicle Soft-Tissue Ultrasound',
    doctor: 'Dr. Ali Jafar (Orthopedics Specialist)',
    type: 'Imaging Report',
    status: 'Completed',
    badgeClass: 'badge-mint',
    details: 'Mild supraspinatus tendinopathy. No complete cuff tear. Conservative R.I.C.E protocol advised.'
  }
];

function renderCareTimeline() {
  const mount = document.getElementById('care-timeline-mount');
  if (!mount) return;

  mount.innerHTML = careTimelineData.map(item => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(52,211,153,0.15); border-radius: 12px; padding: 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; border-left: 4px solid var(--mint-400);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.76rem; color: var(--mint-300); font-weight: 800;">${item.date}</span>
        <span style="font-size: 0.72rem; background: rgba(52,211,153,0.18); color: var(--mint-300); padding: 2px 8px; border-radius: 99px; font-weight: 800;">${item.type} • ${item.status}</span>
      </div>
      <h3 style="font-size: 1.05rem; font-weight: 800; color: #FFFFFF; margin: 0;">${item.title}</h3>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${item.doctor}</div>
      <p style="font-size: 0.82rem; color: var(--text-main); margin-top: 0.25rem; line-height: 1.45;">${item.details}</p>
    </div>
  `).join('');
}

// ==========================================================================
// 8. MODALS & HELPERS
// ==========================================================================
function openAmbulanceModal() {
  playAmbulanceSiren();
  const m = document.getElementById('modal-ambulance');
  if (m) m.classList.add('active');
}

function openTelehealthModal() {
  const m = document.getElementById('modal-telehealth');
  if (m) m.classList.add('active');
}

function openHospitalPartnerModal() {
  const m = document.getElementById('modal-hospital-partner');
  if (m) m.classList.add('active');
}

function openLoginModal(role) {
  handleRoleSwitch(role);
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

function callEmergencyPhone() {
  showToast('📞 Initiating phone call to 108 Emergency Medical Response...');
  window.location.href = 'tel:108';
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Accessibility
function setFontSize(size) {
  if (size === 'normal') {
    document.documentElement.style.fontSize = '16px';
  } else if (size === 'large') {
    document.documentElement.style.fontSize = '18px';
  } else if (size === 'xlarge') {
    document.documentElement.style.fontSize = '20px';
  }
  showToast(`👁️ Font size updated to ${size}`);
}

function setLanguage(lang) {
  appState.currentLang = lang;
  showToast(`🌐 Interface language switched to ${lang === 'hi' ? 'हिन्दी (Hindi)' : lang === 'ta' ? 'தமிழ் (Tamil)' : 'English'}`);
}

// Reading Scroll Progress Glow Tracker
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  bar.style.width = `${progress}%`;
});

// ==========================================================================
// 9. DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Dock Nav Clicks
  document.querySelectorAll('.dock-btn[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const navTarget = btn.getAttribute('data-nav');
      navigateToView(navTarget);
    });
  });

  // Top Bar Role Switcher Clicks
  document.querySelectorAll('.role-tab-btn[data-role-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const roleTarget = btn.getAttribute('data-role-switch');
      handleRoleSwitch(roleTarget);
    });
  });

  // Category Search Chips (Ref 3 "intelly")
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-cat');
      showToast(`🔍 Search filter applied: In ${cat.toUpperCase()}`);
    });
  });

  // Global Search Input Listener
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        showToast(`🔍 Searching clinical records for "${searchInput.value.trim()}"...`);
      }
    });
  }

  // Initialize Subsystems
  initAnatomyControls();
  initVacancyMatrix();
  initSymptomAssistant();
  renderHospitals();
  renderPharmacy();
  renderCareTimeline();

  // Initial Landing setup
  navigateToView('landing');
});
