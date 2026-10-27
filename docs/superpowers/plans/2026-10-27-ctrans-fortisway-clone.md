# CTRANS 1-to-1 Clone with FortisWay Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 1-to-1 visual and functional clone of `https://ctrans.uz/ru` adapted with the branding, texts, contacts, and services of FortisWay Logistics (`https://kurbanovabdulhakim.github.io/Fortis-way/`), located in `C:\Users\user\GitHub\fortisway-ctrans`.

**Architecture:** Pure production-grade static web application with vanilla CSS tokens replicating CTRANS's design system, modular ES6 JavaScript for interactive modules (rate calculator, cargo tracker, currency rates ticker, modal popups), and semantic accessible HTML5.

**Tech Stack:** HTML5, Modern Vanilla CSS3, JavaScript (ES6+), Python HTTP Server for local testing.

**Spec:** [`docs/superpowers/specs/2026-10-27-ctrans-fortisway-clone-design.md`](file:///C:/Users/user/GitHub/fortisway-ctrans/docs/superpowers/specs/2026-10-27-ctrans-fortisway-clone-design.md)

## Global Constraints
- Target workspace directory: `C:\Users\user\GitHub\fortisway-ctrans`.
- Design fidelity: 1-to-1 layout, spacing, typography, colors, animations, and component structure from `https://ctrans.uz/ru`.
- Content fidelity: 100% accurate company information from FortisWay (ООО «FORTISWAY», phone `+998 (93) 555-22-62`, Telegram `@LogisticsFortisway`, WhatsApp `+998935552262`, direct contract with VAT, FTL/LTL freight).
- Zero external build dependencies required for preview; runnable immediately in any modern browser or via static HTTP server.

## Review Focus
1. **Phone dialing (`tel:` protocol):** Click on any phone number must correctly trigger `tel:+998935552262` without losing the `+`.
2. **Calculator edge cases:** Validates non-negative weight/volume, properly switches between FTL (truckload) and LTL (groupage/сборный) rates.
3. **Tracking modal lookup:** Entering any track number displays a 5-stage progress timeline without blank screens or script errors.
4. **Mobile layout:** Navbar drawer collapses properly on small screens (< 992px) without overlapping content.
5. **Asset fallbacks:** Logo and vehicle images render crisp graphics with graceful CSS fallback gradients if offline.

---

### Task 1: Scaffolding, Asset Integration & Design System CSS

**Files:**
- Create: `C:\Users\user\GitHub\fortisway-ctrans\css\app.css`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\css\components.css`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\css\responsive.css`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\assets\images\` (copy brand assets)

**Interfaces:**
- Produces: CSS design tokens (`--primary: #0084ff`, `--dark-bg: #0d131f`, `--card-bg: #141c2c`, etc.), utility classes, header, hero, card, and modal base styling matching CTRANS.

- [ ] **Step 1: Write test verifying CSS design token presence and syntax**
- [ ] **Step 2: Run test and verify it fails (files do not exist yet)**
- [ ] **Step 3: Copy FortisWay logo and logistics imagery into `assets/images/`**
- [ ] **Step 4: Implement `css/app.css`, `css/components.css`, and `css/responsive.css`**
- [ ] **Step 5: Run CSS verification test to verify it passes**
- [ ] **Step 6: Git commit Task 1**

---

### Task 2: Interactive Modules (Calculator, Tracking, Currency Ticker)

**Files:**
- Create: `C:\Users\user\GitHub\fortisway-ctrans\js\currency.js`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\js\tracker.js`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\js\calculator.js`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\tests\test_modules.py`

**Interfaces:**
- Consumes: User inputs (origin, destination, cargo format, weight, volume, track code).
- Produces:
  - `initCurrencyTicker()`: populates real-time rates.
  - `trackCargo(trackNumber)`: returns stage index (1..5), status text, timeline timestamps.
  - `calculateFreight(origin, destination, mode, weight, volume)`: returns `{ priceUSD, transitDays, summaryText, telegramUrl }`.

- [ ] **Step 1: Write unit tests in `tests/test_modules.py` for calculator formulas and tracker state**
- [ ] **Step 2: Run tests to verify failure**
- [ ] **Step 3: Implement `js/currency.js`, `js/tracker.js`, and `js/calculator.js`**
- [ ] **Step 4: Run unit tests to verify 100% pass rate**
- [ ] **Step 5: Git commit Task 2**

---

### Task 3: HTML Markup & Page Assembly (1-to-1 CTRANS Layout with FortisWay Content)

**Files:**
- Create: `C:\Users\user\GitHub\fortisway-ctrans\index.html`
- Create: `C:\Users\user\GitHub\fortisway-ctrans\js\app.js`

**Interfaces:**
- Consumes: `css/app.css`, `css/components.css`, `css/responsive.css`, `js/currency.js`, `js/tracker.js`, `js/calculator.js`.
- Produces: Complete DOM with TopBar, Sticky Header, Hero Banner with Quick Tracker, Services Grid, Calculator, Routes Matrix, Fleet Showcase, Company Details, Contact Form, and Footer.

- [ ] **Step 1: Write verification script to check DOM structure, IDs, and presence of all FortisWay texts**
- [ ] **Step 2: Run verification script to confirm failure prior to implementation**
- [ ] **Step 3: Implement `index.html` and `js/app.js` with full CTRANS 1-in-1 layout and FortisWay content**
- [ ] **Step 4: Run verification script to confirm all elements, links, and texts are present**
- [ ] **Step 5: Git commit Task 3**

---

### Task 4: Local Server Launch, Cross-Browser Verification & Demonstration

**Files:**
- Verify: `C:\Users\user\GitHub\fortisway-ctrans\index.html`
- Script: `C:\Users\user\GitHub\fortisway-ctrans\serve.py`

- [ ] **Step 1: Implement lightweight `serve.py` script on port 3000**
- [ ] **Step 2: Launch local web server**
- [ ] **Step 3: Perform HTTP request verification and automated browser sanity check**
- [ ] **Step 4: Verify interactive features (calculator, track modal, phone dialing link)**
- [ ] **Step 5: Prepare walkthrough and demo report for the user**
- [ ] **Step 6: Git commit Task 4**
