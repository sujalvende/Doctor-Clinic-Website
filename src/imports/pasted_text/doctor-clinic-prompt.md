# Premium Doctor & Clinic Website — Development Prompt

Build a **premium, modern, extremely clean doctor portfolio + clinic website** for a real medical professional.

The website must feel **trustworthy, calm, sophisticated, professional, and effortless to use**. Prioritize clarity, whitespace, typography, photography, accessibility, responsive behavior, and conversion over visual gimmicks.

The user should understand the entire website immediately, even with almost no technical knowledge. The UX should be so obvious that **“even a drunk grandma can understand it.”**

Use existing **GitHub healthcare/medical website repositories as design and architecture references**, especially:

* **Dent — Next Gen Dental Studio** for premium medical visual design, responsive layouts, smooth motion, typography, and doctor presentation.
* **PulsePoint** for healthcare appointment/product-flow ideas.
* **ClinicCare** for clinic-oriented React/Vite/Tailwind patterns.
* **Shadcn Dashboard** for the admin dashboard, forms, tables, authentication, and dashboard UI.

Do not copy any repository. Use them only as references and create a **distinct, polished final design**.

---

## 1. TECH STACK

Use:

* React
* Vite
* TypeScript
* Tailwind CSS
* React Router
* Supabase
* Supabase Auth
* GSAP for subtle animations
* shadcn/ui where appropriate
* Lucide icons

Keep the architecture clean, modular, scalable, and production-ready.

---

# 2. DESIGN DIRECTION

The visual identity should communicate:

**Trust + Medical Expertise + Premium Care + Calmness**

Avoid the common generic healthcare-template look.

### Color direction

Use a restrained palette such as:

* Warm ivory / off-white background
* Deep medical green or sophisticated navy as the primary color
* Charcoal/dark text
* Muted grey-green secondary text
* White surfaces
* Very subtle borders

Suggested starting palette:

```text
Background: #F8F7F4
Primary:    #183A3A
Text:       #172020
Muted:      #657070
Border:     #DDE2DF
White:      #FFFFFF
```

The palette can be adjusted if the doctor's branding requires it.

### Typography

Use a sophisticated serif for major editorial headings and a clean sans-serif for UI/body text.

Recommended:

* Headings: Cormorant Garamond or DM Serif Display
* Body/UI: Inter or Manrope

Use typography hierarchy carefully. Never overload the interface with different font sizes or weights.

---

# 3. CORE DESIGN RULE

**Minimal does NOT mean empty.**

Every section should have a clear purpose.

Do not add elements merely to fill space.

Do not use:

* Excessive gradients
* Neon colors
* Excessive glassmorphism
* Large decorative blobs
* Cartoon medical illustrations
* Excessive rounded cards
* Excessive shadows
* Fake statistics
* Fake testimonials
* Fake certifications
* Fake reviews
* Unnecessary badges
* Unnecessary animations
* Overcrowded navigation
* Huge blocks of text

Use real content supplied by the doctor.

---

# 4. GLOBAL NAVBAR

The navbar is extremely important.

It must be **clean, balanced, premium, and easy to understand**.

### Desktop layout

Place the clinic/doctor identity on the **left**:

```text
[Clinic Name]
Dr. [Doctor Name]
```

Place navigation on the **right**:

```text
About
Services
Facilities
Gallery
Visit
[ Book Appointment ]
```

So the structure is:

```text
┌─────────────────────────────────────────────────────────────────┐
│ Clinic Name / Doctor Name          About Services ...   BOOK    │
└─────────────────────────────────────────────────────────────────┘
```

The navigation must be **right-aligned**.

Do not clutter the center of the navbar.

### Navbar behavior

* Transparent/overlay version over the hero if visually appropriate.
* Transition to a clean solid background after scrolling.
* Subtle backdrop blur only when needed.
* Thin bottom border.
* Smooth transition.
* Sticky on desktop and mobile.
* Excellent contrast.
* Clear active page state.

### Mobile navbar

Use:

* Clinic/doctor identity on the left
* Menu button on the right
* Clean full-screen or dropdown navigation
* Prominent `Book Appointment`
* Easy-to-tap links

Never make mobile navigation difficult to operate.

---

# 5. HOME PAGE

Route:

`/`

The homepage should be **short and introductory**.

It provides only the essential information and acts as a gateway to the detailed pages.

The homepage should contain these five major sections:

1. Hero
2. About Doctor
3. Services
4. Facilities
5. Visit / Appointment

Each section should contain concise content and one meaningful CTA leading to the detailed page.

---

# 6. HERO SECTION

This is the most visually important section.

Use a **large professional photograph of the doctor sitting naturally on a chair inside the clinic**.

The doctor's image should feel authentic and editorial, not like a generic stock medical image.

### Layout

Desktop:

* Doctor image dominates the right/center.
* Text block positioned on the left.
* Large amount of breathing room.
* Text should remain highly readable.

Example:

```text
DR. [DOCTOR NAME]

MBBS, MD
[Specialization]

Compassionate care backed by
experience, expertise and a
patient-first approach.

[ Book an Appointment ]
[ Explore Profile ]
```

Below that, optionally show 2–3 genuine credibility indicators:

```text
10+ Years Experience
5,000+ Patients
[Specialization]
```

Only display real metrics provided by the doctor.

### Hero behavior

Use extremely subtle GSAP animation:

* Image reveal
* Text fade/slide
* CTA entrance
* Small stagger

Animation should feel premium and calm.

Do not create exaggerated cinematic animation.

---

# 7. ABOUT PREVIEW

Heading:

**About Dr. [Name]**

Two-column layout.

Left:

* Professional doctor image

Right:

* Short biography
* Qualification summary
* Experience
* Specialization

Example structure:

```text
About Dr. [Name]

[Short 2–4 paragraph introduction]

Qualifications
MBBS / MD / etc.

Experience
[X] years

Specialization
[Specialization]
```

CTA:

**Meet the Doctor →**

Link:

`/about`

---

# 8. SERVICES PREVIEW

Heading:

**Areas of Expertise**

Display only the key services.

Use a clean editorial grid rather than generic oversized cards.

Each item:

```text
[Small icon]

Service Name

Short one-line explanation
```

Example:

* Consultation
* Diagnosis & Treatment
* Preventive Care
* Follow-up Care
* Specialized Procedures

CTA:

**Explore Services →**

Route:

`/services`

---

# 9. FACILITIES PREVIEW

Heading:

**A Comfortable Place for Better Care**

Show real clinic photography.

Use an elegant composition such as:

```text
┌──────────────────────────────┐
│                              │
│         Large Image          │
│                              │
└──────────────┬───────────────┘
               │
       ┌───────┴───────┐
       │ Small │ Small │
       │ Image │ Image │
       └───────┴───────┘
```

Highlight:

* Clean consultation rooms
* Comfortable waiting area
* Modern equipment
* Privacy
* Hygiene
* Patient comfort

CTA:

**Explore Facilities →**

Route:

`/facilities`

---

# 10. VISIT / APPOINTMENT PREVIEW

This is the final homepage section.

Use a calm two-column layout.

### Left

**Visit Dr. [Name]**

Display:

* Clinic address
* Opening hours
* Phone
* WhatsApp
* Email if applicable
* Short directions

Add Google Maps.

### Right

**Book an Appointment**

Form fields:

```text
Full Name
Phone Number
Email (optional)
Service / Consultation Type
Preferred Date
Preferred Time
Message (optional)

[ Book Appointment ]
```

The form must be extremely clean.

Do not ask unnecessary questions.

After submission, show:

**Appointment request received.**

Explain that the clinic will contact the patient to confirm the appointment.

Do NOT falsely tell the patient the appointment is confirmed merely because the database insertion succeeded.

Route/page:

`/visit`

---

# 11. ABOUT PAGE

Route:

`/about`

This page should be more detailed and feel like a premium professional profile.

Sections:

### Doctor Introduction

Detailed professional introduction.

### Professional Journey

Elegant timeline.

Example:

```text
2026
Current Practice

2023
Advanced Certification

2020
MD — [Institution]

2017
MBBS — [Institution]
```

### Qualifications

Detailed education and certifications.

### Experience

Professional history.

### Areas of Expertise

Relevant medical specialties.

### Professional Philosophy

Short patient-first statement.

### Clinic Introduction

Explain the clinic and its approach to patient care.

---

# 12. SERVICES PAGE

Route:

`/services`

Give every major service enough information to be useful.

For each service:

* Name
* Overview
* Who it is for
* What the consultation involves
* What patients can expect
* Optional preparation information
* `Book Appointment`

Keep medical information factual and based only on doctor-approved content.

---

# 13. FACILITIES PAGE

Route:

`/facilities`

Create a visually rich but clean page.

Show:

* Reception
* Waiting area
* Consultation rooms
* Equipment
* Procedure area if applicable
* Hygiene
* Accessibility
* Patient comfort features

Use real photography.

Do not invent facilities.

---

# 14. GALLERY PAGE

Route:

`/gallery`

Create a premium image gallery.

Optional filters:

```text
All
Clinic
Doctor
Facilities
Events
```

Use responsive grid/masonry layout.

Clicking an image should open a polished fullscreen lightbox.

Images should support:

* Lazy loading
* Responsive sizing
* Alt text
* Smooth transitions

---

# 15. VISIT PAGE

Route:

`/visit`

This should be the main conversion page.

Top section:

**Plan Your Visit**

Display:

* Clinic name
* Doctor name
* Full address
* Phone
* WhatsApp
* Opening hours

Then:

### Location

Large Google Maps section.

Then:

### Book an Appointment

The same booking form used on the homepage.

The navbar `Book Appointment` button must directly navigate to:

`/visit`

---

# 16. BOOKING SYSTEM

Use **Supabase**.

When the patient submits the form, save the appointment to Supabase.

Suggested table:

```text
appointments

id
patient_name
phone
email
service
preferred_date
preferred_time
message
status
created_at
updated_at
```

Initial status:

```text
pending
```

Possible status values:

```text
pending
confirmed
rescheduled
cancelled
completed
```

---

# 17. ADMIN SYSTEM

Create a secure admin dashboard.

Routes:

```text
/admin/login
/admin
/admin/appointments
```

Use:

**Supabase Authentication**

The admin must log in before accessing appointment information.

Never expose appointment data publicly.

---

# 18. ADMIN DASHBOARD

The dashboard should be minimal and professional.

Top metrics:

```text
Today's Appointments
Pending
Confirmed
Completed
```

Then appointment table:

```text
Patient
Service
Date
Time
Status
Created
Actions
```

Actions:

* View
* Confirm
* Reschedule
* Cancel
* Mark Completed

Allow filtering:

* All
* Pending
* Confirmed
* Completed
* Cancelled

Allow date filtering.

---

# 19. APPOINTMENT DETAILS

Clicking an appointment should open a clean details panel/page.

Show:

```text
Patient Name
Phone
Email
Service
Preferred Date
Preferred Time
Message
Status
Submitted At
```

Admin can update status.

Avoid unnecessary complexity.

---

# 20. SUPABASE SECURITY

Implement proper Row Level Security.

Public users may create appointment requests.

Public users must NOT be able to read appointment records.

Only authenticated authorized admin users may:

* Read appointments
* Update appointments
* Delete/cancel appointments

Never place private Supabase service-role credentials in the frontend.

---

# 21. RESPONSIVE DESIGN

The website must be designed mobile-first.

Test carefully at:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Nothing should:

* Overflow horizontally
* Become unreadable
* Break the layout
* Hide important CTAs
* Create tiny tap targets

On mobile, add a subtle sticky action bar:

```text
[ Call ]   [ WhatsApp ]   [ Book Appointment ]
```

Only use this where it improves usability.

---

# 22. ACCESSIBILITY

Follow good accessibility standards.

Use:

* Semantic HTML
* Proper heading hierarchy
* Accessible buttons
* Visible focus states
* Keyboard navigation
* Alt text
* Good color contrast
* Proper form labels
* Error messages
* Loading states
* Success states

---

# 23. UX PRINCIPLE

Every visitor should understand these four things almost immediately:

### WHO?

Who is the doctor?

### WHAT?

What does the doctor specialize in?

### WHERE?

Where is the clinic?

### HOW?

How do I book an appointment?

If the answer to any of these is difficult to find, simplify the design.

---

# 24. MICROINTERACTIONS

Use GSAP only when it improves the experience.

Recommended:

* Hero reveal
* Scroll fade-in
* Image reveal
* Subtle section transitions
* Button hover
* Gallery hover
* Page transitions

Avoid:

* Constant movement
* Aggressive parallax
* Excessive text animation
* Bouncy UI
* Long loading animations

The site should feel **expensive**, not animated for the sake of animation.

---

# 25. FOOTER

Minimal footer.

Include:

```text
Clinic Name
Dr. Doctor Name

About
Services
Facilities
Gallery
Visit

Phone
WhatsApp
Address

© [Year] [Clinic Name]
```

No unnecessary links.

---

# 26. CONTENT RULE

Do not invent medical information.

Use placeholders only where the client has not supplied information.

Create clearly marked placeholders such as:

```text
[Doctor Name]
[Specialization]
[Qualification]
[Years of Experience]
[Clinic Address]
[Phone Number]
[Opening Hours]
```

Do not fabricate:

* Awards
* Qualifications
* Patient counts
* Reviews
* Certifications
* Medical claims
* Treatments
* Facilities

---

# 27. FINAL VISUAL GOAL

The finished website should feel like:

**A premium doctor's professional profile combined with a refined private clinic website.**

Think:

**Editorial + Medical + Trustworthy + Minimal + Human**

Not:

**Corporate hospital + generic SaaS dashboard + flashy AI template**

The design must make the doctor feel **credible, experienced, approachable, and worth visiting**.

---

# 28. QUALITY BAR

Before considering the website finished, verify:

* Navbar is perfectly balanced.
* Brand is left aligned.
* Navigation is right aligned.
* `Book Appointment` is the dominant CTA.
* Hero immediately communicates doctor identity.
* Every homepage section is concise.
* Every detailed page has a clear purpose.
* Typography is consistent.
* Spacing is consistent.
* Photography is prominent.
* Mobile experience is excellent.
* Appointment form is effortless.
* Supabase data insertion works.
* Admin authentication works.
* Admin appointments are protected with RLS.
* Loading/error/success states exist.
* No fake medical claims are present.
* No unnecessary visual clutter exists.
* The entire website feels cohesive rather than like separate templates.

**The final result should look like a website a high-end private doctor could confidently show to patients and use as the official digital presence of the clinic.**
