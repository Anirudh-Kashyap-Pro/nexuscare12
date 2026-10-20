# 🫀 NexusCare Aura — Clinical Healthcare Operating System

> **A polished, hackathon-ready healthcare platform website designed to coordinate care sooner, eliminate avoidable hospital waiting, and empower patients, clinical staff, and hospital administrators.**
> Inspired by and incorporating the 4 reference blueprints for 3D Holographic Anatomy, "intelly" Doctor Workstation, AI Healthcare Ecosystem Architecture, and "Fenco" OS Window styling.

---

## 🎨 Design & Color System (Synthesized from the 4 References)

### 1. OS Window & Canvas (References 1 & 4)
- **Rounded App Window Shell** (`border-radius: 28px`, `background: #0C1712`, glowing border `rgba(52, 211, 153, 0.22)`): Mac/iPad-style window frame with traffic light controls (🔴 🟡 🟢).
- **Dark Vertical Dock** (`width: 76px`, `background: #070E0B`):
  - Brand Emblem (🫀 NexusCare Aura)
  - One-click navigation icons with spring hover tooltips:
    - 🏠 Home / Entry Portals (`landing`)
    - 👤 Patient Dashboard (`patient-dash`)
    - 🩺 Staff Clinical Workstation (`staff-dash`)
    - 🏛️ Hospital Admin Capacity (`admin-capacity`)
    - 📐 AI Ecosystem Architecture (`architecture`)
    - 🎟️ Vacancy Matrix (`cinema-booking`)
    - 🚨 Symptom Assistant (`symptom-assistant`)
    - 🏥 Nearby Hospitals (`hospital-search`)
    - 💊 Pharmacy & Pre-Orders (`pharmacy`)
    - 📅 Care Timeline (`care-timeline`)
    - ⚠️ Safety Hazard Tracker (`safety-reviews`)
    - ⚙️ Accessibility Settings (`settings`)
  - User profile avatar with active green status dot.

### 2. Reference 1: Patient Dashboard & 3D Centerpiece
- **Top Greeting**: *"Hello Ali 👋 Welcome Back"* with subtitle *"Review your health status, consultation logs, and upcoming checkups."*
- **Left Vitals Deck**:
  1. **Blood Pressure**: `116 / 70 mmhg` with *"Normal Pressure"* badge and a **24-Dot Status Matrix** (4x6 cyan/mint grid).
  2. **Cardiac Rhythm**: `175 bpm` with animated SVG rhythm wave and *"Attention"* warning badge.
  3. **Daily Volume Telemetry**: `2.3 %` with vertical multi-channel equalizer telemetry bars and *"Overall average"* chip.
  4. **Blood Glucose**: `230 / 70 mg/dL` with dual-phase sine wave curves and *"Normal Level"* badge.
- **Consulting Doctors Deck**: Dr. Ali Jafar (Orthopedics), Dr. Priya Nair (Cardiology), Dr. Sarah Jenkins (Neurology) with 1-click booking.
- **Centerpiece 3D Holographic Anatomy Model**:
  - Translucent holographic human body with glowing ribcage and cardiac pulse.
  - **Illuminated Elliptical Pedestal Platform** with neon outer ring, rotating inner dash ring, and pulse glow.
  - **Pedestal Angle Controls (`< || >`)**: Rotates between Anterior (Front), Lateral Right 45°, Posterior (Back), and Lateral Left 45°.
  - **Callout Hotspot Badges with Pointer Pins**:
    - ⚠️ `Injured & Pain` (amber badge on right arm/shoulder)
    - 🌡️ `Body temperature 40°C` (cyan badge on chest)
    - 🔴 `Cardiac 175 BPM` (red pulsing badge on sternum)
  - **3 Floating Organ Inspection Cards**:
    - 🫁 **Lungs**: `89%` Capacity & Oxygenation
    - 🧠 **Brain**: `Good` (EEG Normal, GCS 15/15)
    - 🫀 **Heart**: `Attention` (175 BPM Tachycardia)
    - *Clicking any card or pin launches the detailed Telemetry Inspection Modal!*
- **Right Column Emergency Card**:
  - **Signature Blue Gradient** (`linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)`).
  - Emergency Services text and prominent `[Get Help Now ➔]` button that launches the 108 Emergency Ambulance dispatch modal!

---

### 3. Reference 2: AI Healthcare Ecosystem Architecture Diagram
- Dedicated technical architecture screen (`#view-architecture`) visualizing the full end-to-end platform topology:
  - **Frontend Layer**: Patient Dashboard, AI Diagnostic Interface, Health Tracker, Nearby Hospitals.
  - **Backend Services Layer**: Node.js / Express REST & WebSocket Gateway, Patient Auth (ABHA / RBAC), Consultation Vacancy Engine, Pharmacy Pre-Order Service.
  - **AI & Data Layer**: Gemini API LLM (Clinical Guidance Review), Symptom Prediction Model (Trained ML Urgency Classifier), SQLite / Encrypted Patient Store, Leaflet.js Geospatial Routing.
  - Live system health monitor showing **99.98% uptime**, **14ms average latency**, and **AES-256 end-to-end encryption**.

---

### 4. Reference 3: "intelly" Doctor Clinical Workstation
- **Header**: Category search with chips: `Search for... In: Patients | Education | Prescriptions | Test results`.
- **4 Pastel Metric KPI Cards**:
  1. 🟨 **Soft Yellow Card**: **Patients Today** (`1,429`, `↗ +12% vs last week`).
  2. 🌸 **Soft Pink Card**: **Visits Summary** (`842`, `620 completed • 222 pending`).
  3. 🟩 **Soft Green Card**: **By Condition** (`Chronic 58% • Acute 27% • Follow-up 15%`).
  4. 🟦 **Soft Blue Card**: **Sessions Completed** (`358`, `148 Telehealth • 210 In-Person`).
- **Clinical Workstation Grid**:
  - **Patient Queue Table**: Real-time arrival queue with patient profile, condition, wait time, and review triggers.
  - **Visit Details Card**: Active patient vitals (BP `118/78`, Heart Rate `74 bpm`, SpO2 `98%`), **Reported Symptom Tags** (`Chest Tightness`, `Shortness of Breath`, `Exertional Fatigue`, `Mild Diaphoresis`), Preliminary AI Guidance Note, and Action buttons (`Prescribe Rx`, `Add Note`, `Transfer`).
  - **Schedule Calendar & Timeline**: Daily roster schedule from 08:30 morning rounds to 13:00 staggered buffer breaks.
  - **Queue Calling Chime**: Web Audio API audio chime synthesizer + broadcast notification.

---

### 5. Hospital Department Appointment Vacancy Matrix (Replacing Movie Tickets)
- **Consultation Chamber Vacancy Grid**:
  - 36 consultation slots across Chambers 201-206 from 09:00 to 17:40.
  - **Physician Consultation Terminal Bar**: Glowing desk header replacing the old cinema screen.
  - **Accessible Legend**: Available Vacancy (Luminescent Mint), Filled Slot / In Session (Dashed Slate), Selected Vacancy (Emerald Glow).
  - Seamless ₹0 Ayushman PMJAY cashless coverage verification.

---

### 6. Emergency Support & 108 Ambulance Dispatch
- **Synthesizer Siren**: Authentic emergency siren sound synthesized via the Web Audio API on red-flag detection.
- **Real-Time GPS ETA**: 4-minute paramedic arrival countdown and trauma bay pre-alert.
- Direct helpline button with `tel:108` emergency link.

---

### 7. Online Medicine Ordering & Pre-Orders
- Product catalog with in-stock vs. out-of-stock states.
- Pre-order reservation pipeline with restock date notifications.
- Pharmacist clinical check verification badge (R.Ph Ananya Sharma).

---

### 8. Facility Safety Reporting (Private & Anonymous)
- Patients and staff can report physical hazards (e.g. wet floors, broken handrails, elevator outages).
- Real-time resolution tracker showing status updates from housekeeping and facility engineering.

---

### 9. Accessibility, Multilingual Engine & Privacy
- **Font Resizer**: Default (16px), Large (18px), Extra Large (20px).
- **Multilingual Support**: English, हिन्दी (Hindi), and தமிழ் (Tamil).
- **Caregiver Proxy Access** and encrypted Ayushman Bharat ABHA data synchronization.

---

## ⚡ How to Run
Simply open [index.html](file:///C:/Users/amirc/.gemini/antigravity/scratch/nexuscare/index.html) in any modern web browser (Edge, Chrome, Safari, Firefox).
No build dependencies, Node.js installation, or server configuration required! Everything runs standalone.
