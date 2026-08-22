export const CLINIC = {
  name: "[Clinic Name]",
  tagline: "Your health, our priority.",
  address: "[Street Address], [City], [State] — [PIN Code]",
  phone: "[Phone Number]",
  whatsapp: "[WhatsApp Number]",
  email: "[Email Address]",
  hours: {
    weekdays: "Mon – Fri: 9:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 2:00 PM",
    sunday: "Sunday: Closed",
  },
  mapEmbedUrl: "",
};

export const DOCTOR = {
  name: "[Doctor Name]",
  fullName: "Dr. [Doctor Name]",
  qualification: "MBBS, MD",
  specialization: "[Specialization]",
  experience: "[X]+",
  bio: [
    "[Opening paragraph about the doctor's background — where they trained, their qualifications, and how long they have been in practice.]",
    "[Second paragraph about clinical experience, the types of patients they see, and the conditions they manage most often.]",
    "[Third paragraph about the doctor's personal approach — their philosophy around patient care, communication, and treatment.]",
  ],
  shortBio: "[A brief 1–2 sentence summary of the doctor's approach and expertise, suitable for homepage preview.]",
  philosophy: '"[A short professional philosophy statement — a heartfelt, patient-first statement about why you practice medicine the way you do.]"',
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1672655412906-8e10ba6ee373?w=1200&h=1500&fit=crop&auto=format",
  doctorPortrait: "https://images.unsplash.com/photo-1758691463582-11aea602cd4a?w=900&h=1100&fit=crop&auto=format",
  consultation1: "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?w=1200&h=800&fit=crop&auto=format",
  consultation2: "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?w=1200&h=800&fit=crop&auto=format",
  consultation3: "https://images.unsplash.com/photo-1758691462858-f1286e5daf40?w=1200&h=800&fit=crop&auto=format",
  doctorPatient: "https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?w=1200&h=800&fit=crop&auto=format",
  reception: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop&auto=format",
  waitingRoom: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=900&h=700&fit=crop&auto=format",
  equipment: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?w=900&h=700&fit=crop&auto=format",
  corridor: "https://images.unsplash.com/photo-1777269749032-d8d458ae594d?w=1200&h=800&fit=crop&auto=format",
};

export const SERVICES = [
  {
    id: "consultation",
    icon: "Stethoscope",
    name: "General Consultation",
    short: "Thorough assessment and personalised medical advice.",
    overview: "[Overview of what a general consultation involves at this clinic — history taking, physical examination, assessment, and advice.]",
    whoFor: "[Description of which patients would benefit from a general consultation — new patients, those with an undifferentiated symptom, annual check-up, etc.]",
    involves: "[What happens during the consultation — patient history, examination, investigations if needed, explanation of findings.]",
    expect: "[What the patient can expect at the end of the consultation — a clear diagnosis or working diagnosis, treatment plan, follow-up arrangement.]",
    preparation: "[Any preparation needed before the appointment — fasting, bringing records, prior test results, etc.]",
  },
  {
    id: "diagnosis",
    icon: "ClipboardList",
    name: "Diagnosis & Treatment",
    short: "Accurate diagnosis with evidence-based treatment plans.",
    overview: "[Overview of the diagnostic and treatment process at this clinic.]",
    whoFor: "[Who this service is suitable for — patients presenting with a specific complaint requiring investigation and management.]",
    involves: "[What the process involves — clinical assessment, relevant investigations, interpretation, treatment initiation.]",
    expect: "[Expected outcomes — clear diagnosis, treatment plan, follow-up schedule.]",
    preparation: "[Preparation if applicable — prior investigations, medications to bring, fasting, etc.]",
  },
  {
    id: "preventive",
    icon: "Shield",
    name: "Preventive Care",
    short: "Proactive health management to keep you well.",
    overview: "[Overview of the preventive care approach — screening, lifestyle counselling, vaccinations, health optimisation.]",
    whoFor: "[Who preventive care is recommended for — adults of all ages, particularly those with family history or risk factors.]",
    involves: "[What preventive care involves — health assessment, risk stratification, screening tests, counselling.]",
    expect: "[Benefits and outcomes — early identification of risk factors, personalised prevention plan.]",
    preparation: "[What to bring — past blood tests, list of current medications, family history if known.]",
  },
  {
    id: "followup",
    icon: "RefreshCw",
    name: "Follow-up Care",
    short: "Continuity of care through every stage of treatment.",
    overview: "[Overview of how follow-up care is managed at this clinic — monitoring, medication review, treatment adjustment.]",
    whoFor: "[When follow-up care is recommended — after a new diagnosis, ongoing chronic condition, post-procedure, etc.]",
    involves: "[What a follow-up appointment involves — review of progress, investigation results, medication changes if needed.]",
    expect: "[Outcomes — adjusted treatment plan, reassurance, or referral if required.]",
    preparation: "[Any preparation — relevant investigation results, medication list, symptoms diary.]",
  },
  {
    id: "procedures",
    icon: "Activity",
    name: "Specialised Procedures",
    short: "[Brief description of specialisation-specific procedures available at this clinic.]",
    overview: "[Overview of the specialised procedures performed — procedure names and general purpose.]",
    whoFor: "[Who may require these procedures — patients with specific conditions or symptoms.]",
    involves: "[What the procedure involves — preparation, the procedure itself, immediate post-procedure care.]",
    expect: "[What the patient can expect before, during, and after — timeline, recovery, results.]",
    preparation: "[Preparation required — fasting, consent, transport arrangements, clothing, medications.]",
  },
];

export const TIMELINE = [
  {
    year: "[Year]",
    title: "Current Practice — [Clinic Name]",
    desc: "[Description of current role and focus of practice.]",
  },
  {
    year: "[Year]",
    title: "[Fellowship / Advanced Certification]",
    desc: "[Institution and area of specialisation.]",
  },
  {
    year: "[Year]",
    title: "MD — [Institution Name]",
    desc: "[Residency specialty and key clinical training.]",
  },
  {
    year: "[Year]",
    title: "MBBS — [Institution Name]",
    desc: "[Undergraduate medical education.]",
  },
];

export const AREAS_OF_EXPERTISE = [
  "[Area of Expertise 1]",
  "[Area of Expertise 2]",
  "[Area of Expertise 3]",
  "[Area of Expertise 4]",
  "[Area of Expertise 5]",
  "[Area of Expertise 6]",
];

export const FACILITIES_LIST = [
  {
    title: "Reception & Registration",
    desc: "[Description of the reception experience — how patients are greeted, registration process, wait times.]",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Comfortable Waiting Area",
    desc: "[Description of the waiting area — seating, privacy, environment, reading material, refreshments if applicable.]",
    img: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Private Consultation Rooms",
    desc: "[Number of consultation rooms and privacy measures in place for patient comfort and confidentiality.]",
    img: "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Modern Medical Equipment",
    desc: "[Medical equipment and diagnostic tools available at the clinic — specific devices, imaging, lab facilities.]",
    img: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Hygiene & Sterilisation",
    desc: "[Sterilisation protocols, infection control standards, and cleanliness measures maintained at the clinic.]",
    img: "https://images.unsplash.com/photo-1777269749032-d8d458ae594d?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Patient Accessibility",
    desc: "[Wheelchair access, ramp availability, elevator if applicable, and other accessibility features at the clinic.]",
    img: "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?w=800&h=600&fit=crop&auto=format",
  },
];

export const GALLERY_ITEMS = [
  { id: 1, category: "clinic", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&auto=format", alt: "Clinic reception area" },
  { id: 2, category: "facilities", src: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=800&h=1000&fit=crop&auto=format", alt: "Waiting room" },
  { id: 3, category: "doctor", src: "https://images.unsplash.com/photo-1758691463582-11aea602cd4a?w=800&h=1000&fit=crop&auto=format", alt: "Dr. [Doctor Name]" },
  { id: 4, category: "facilities", src: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?w=800&h=600&fit=crop&auto=format", alt: "Medical diagnostic equipment" },
  { id: 5, category: "clinic", src: "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?w=800&h=600&fit=crop&auto=format", alt: "Consultation room" },
  { id: 6, category: "clinic", src: "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?w=800&h=600&fit=crop&auto=format", alt: "Doctor in consultation" },
  { id: 7, category: "facilities", src: "https://images.unsplash.com/photo-1777269749032-d8d458ae594d?w=800&h=500&fit=crop&auto=format", alt: "Clinic corridor" },
  { id: 8, category: "doctor", src: "https://images.unsplash.com/photo-1758691462858-f1286e5daf40?w=800&h=600&fit=crop&auto=format", alt: "Doctor with patient" },
  { id: 9, category: "clinic", src: "https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?w=800&h=600&fit=crop&auto=format", alt: "Doctor speaking with patient" },
];

export type AppointmentStatus = "pending" | "confirmed" | "rescheduled" | "cancelled" | "completed";

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export function getAppointments(): Appointment[] {
  try {
    return JSON.parse(localStorage.getItem("clinic_appointments") || "[]");
  } catch {
    return [];
  }
}

export function saveAppointment(data: Omit<Appointment, "id" | "status" | "created_at" | "updated_at">): Appointment {
  const appointments = getAppointments();
  const now = new Date().toISOString();
  const apt: Appointment = {
    ...data,
    id: `apt_${Date.now()}`,
    status: "pending",
    created_at: now,
    updated_at: now,
  };
  appointments.push(apt);
  localStorage.setItem("clinic_appointments", JSON.stringify(appointments));
  return apt;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): void {
  const appointments = getAppointments();
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx !== -1) {
    appointments[idx].status = status;
    appointments[idx].updated_at = new Date().toISOString();
    localStorage.setItem("clinic_appointments", JSON.stringify(appointments));
  }
}
