# UI/UX Design System & Interaction Standards

This document establishes the official standard for all forms, components, user interactions, and visual hierarchy across the system. All newly created or modified interfaces must adhere to these principles.

---

## 1. Create Account Form (Single-Column Standard)

### Layout & Flow
- **Single-Column Only:** Form fields must strictly follow a single vertical path from top to bottom.
- Avoid splitting basic inputs into side-by-side columns (e.g. First Name / Last Name side-by-side) unless entering inherently paired data (e.g. City / Zip). Single-column layouts minimize eye saccades and dramatically reduce completion time.

### Structure & Content
- **H1:** `Create Account`
- **Labels:** Explicit labels placed directly above each input (`Full Name`, `Work Email`, `Company`).
- **Placeholders:** Concrete, realistic example values (e.g., `e.g. Alex Morgan`, `e.g. alex@company.com`, `e.g. Acme Corporation`).
- **Validation & Error Handling:**
  - Real-time inline feedback upon user touch/blur.
  - Informative, polite error messages (e.g., *"Please enter a valid work email address (e.g. alex@company.com)"*).
  - Clear visual cues: red border, red helper text, accessible alert role (`role="alert"`).
- **Submit Button:**
  - Label: `Create Account`.
  - **Must remain disabled** with reduced opacity and not-allowed cursor until all required fields pass validation.
  - Display loading spinner state upon click.
- **Success State:**
  - Replace form with a clear success card featuring confirmation messaging, summary of entered details, and follow-up actions.

---

## 2. Multi-Step Form / Stepper

### Stepper Anatomy
- Use a **3-step stepper** for progressive data collection.
- Provide a persistent header clearly demarcating:
  - **Completed steps** (check icon, green/success or solid filled theme).
  - **Current step** (accent color, focus ring, bold text).
  - **Remaining steps** (muted neutral border, inactive number).
- Visual connecting bar reflecting current progress (0%, 50%, 100%).

### Navigation & State Integrity
- **Navigation Controls:**
  - Always provide **Back** and **Next** buttons where applicable (Back on steps 2 & 3; Next on steps 1 & 2).
  - Final step replaces "Next" with **Submit**.
- **State Persistence:**
  - Returning to previous steps must **never wipe or reset user input**.
  - All form values persist across step transitions.
- **Per-Step Validation:**
  - Users cannot advance to the next step until the current step is validated.
  - Trigger inline field errors if the user attempts to click "Next" with invalid or missing inputs.
- **Final Step:**
  - Provide a concise summary card of previous step inputs for user verification prior to final submission.

---

## 3. Confirmation Dialogs

### Explicit Action-Based Buttons
- **Prohibited:** Ambiguous, generic buttons like “Yes”, “OK”, or “Proceed”.
- **Standard:** Explicit action verbs matching user intent (e.g., **Delete**, **Discard**, **Revoke**, **Archive**).
- Pair with a neutral **Cancel** button.

### Dialog Anatomy
- **Title:** State the action and the exact item name (e.g., `Delete “Q3 Roadmap”?`).
- **Item Identification:** Prominently identify the selected resource with its title, tags, or metadata.
- **Consequence Explanation:** Explicitly outline irreversible repercussions:
  > *"This action cannot be undone. All 14 milestones, 38 tasks, and associated files will be permanently deleted."*
- **Destructive Styling:**
  - Primary destructive actions must use high-contrast red warning styling (`bg-rose-600` / `bg-red-600`), clear white typography, and danger icon indicators.

---

## 4. General UI & Visual Consistency Standards

### Spacing & Grid
- Base unit: **8px spacing grid** (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`).
- Form field gap: `16px` to `20px` (Tailwind `gap-4` or `gap-5`).

### Typography
- Page Title (H1): `text-2xl font-bold tracking-tight text-slate-900`
- Section Title (H2): `text-lg font-semibold text-slate-900`
- Field Label: `text-sm font-medium text-slate-800`
- Placeholder text: `text-slate-400`
- Helper / Caption text: `text-xs text-slate-500`
- Inline Error text: `text-xs font-medium text-rose-600`

### Interactive States
Every interactive element must provide distinct visual feedback for all 6 states:
1. **Default:** Clean border, legible contrast.
2. **Hover:** Subtle background or border shift.
3. **Focus:** Visible 2px outline/ring with offset (`focus:ring-2 focus:ring-offset-1`).
4. **Active/Pressed:** Darker background shade.
5. **Disabled:** 50% opacity, `cursor-not-allowed`, non-reactive to clicks.
6. **Loading:** Disabled state with spinning indicator and action label.

### Component Reusability
- Always reuse core primitives (`Button`, `Input`, `PasswordInput`, `Modal`, `Card`) rather than writing ad-hoc styles for common interactions.

---

## 5. Student Portal & Enrollment Standards

### Student Login Patterns
- Single-column card layout with university branding.
- Multi-format identity field supporting Student ID numbers and institutional email addresses.
- Accessible password input with visibility toggle.
- "Remember this device" option and student helpdesk recovery links.
- Submit button disabled until valid credentials format is detected.

### Student Registration Flow
- Sequential 3-step enrollment stepper:
  1. **Personal Identity & Contact:** Legal Name, Date of Birth, Email, Mobile Phone.
  2. **Academic Program Selection:** Degree Level, Faculty/Department, Intended Major, Entry Term.
  3. **Security, Honor Code & Review:** Password creation with live complexity rules, Emergency Contact, Honor Code agreement, and Input Review.
- Input persistence across navigation steps.
- Clear post-submission confirmation providing assigned Student ID and enrollment receipt.


