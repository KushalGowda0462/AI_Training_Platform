"use client";

import { useState, FormEvent } from "react";
import Modal from "@/components/Modal";

type FormData = {
  firstName: string;
  lastName: string;
  workEmail: string;
  jobRole: string;
  telephone: string;
  country: string;
};

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
  "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Ghana", "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland",
  "Israel", "Italy", "Japan", "Jordan", "Kenya", "Malaysia", "Mexico",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines",
  "Poland", "Portugal", "Romania", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand",
  "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Vietnam",
];

const JOB_ROLES = [
  "C-Suite / Executive",
  "VP / Director",
  "Engineering Manager",
  "Senior Engineer / Tech Lead",
  "Software / Platform Engineer",
  "DevOps / SRE Engineer",
  "Security Engineer",
  "IT Manager / Administrator",
  "Training & Development Lead",
  "HR / Talent & Learning",
  "Procurement / Vendor Management",
  "Other",
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DemoRequestModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    jobRole: "",
    telephone: "",
    country: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address.";
    }
    if (!form.jobRole) newErrors.jobRole = "Job role is required.";
    if (!form.telephone.trim()) {
      newErrors.telephone = "Telephone number is required.";
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(form.telephone)) {
      newErrors.telephone = "Please enter a valid phone number.";
    }
    if (!form.country) newErrors.country = "Country is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setForm({ firstName: "", lastName: "", workEmail: "", jobRole: "", telephone: "", country: "" });
      setErrors({});
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request an Enterprise Demo" size="lg">
      {submitted ? (
        /* ── Success state ── */
        <div className="flex flex-col items-center text-center py-8 gap-5">
          <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-800 text-[#0F172A] mb-2">Thank you, {form.firstName}!</h3>
            <p className="text-[#64748B] text-base leading-relaxed max-w-sm mx-auto">
              Your demo request has been received. An Aurilearn representative will reach out to you within one business day.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="btn-gold px-8 py-2.5 text-sm font-bold mt-2"
          >
            Close
          </button>
        </div>
      ) : (
        /* ── Form ── */
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <p className="text-[#64748B] text-sm leading-relaxed -mt-1">
            Fill in your details below and an Aurilearn specialist will be in touch to schedule your personalised demo.
          </p>

          {/* Row 1 – First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="First Name"
              name="firstName"
              placeholder="Jane"
              value={form.firstName}
              error={errors.firstName}
              onChange={handleChange}
              required
            />
            <Field
              label="Last Name"
              name="lastName"
              placeholder="Smith"
              value={form.lastName}
              error={errors.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 – Work Email */}
          <Field
            label="Work Email"
            name="workEmail"
            type="email"
            placeholder="jane.smith@company.com"
            value={form.workEmail}
            error={errors.workEmail}
            onChange={handleChange}
            required
          />

          {/* Row 3 – Job Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-wide">
              Job Role <span className="text-[var(--gold)]">*</span>
            </label>
            <select
              name="jobRole"
              value={form.jobRole}
              onChange={handleChange}
              className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[#0F172A] bg-white outline-none transition-all
                focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]
                ${errors.jobRole ? "border-red-400 ring-2 ring-red-100" : "border-[#E7E2D8] hover:border-[#C8BFA8]"}`}
            >
              <option value="" disabled>Select your role…</option>
              {JOB_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.jobRole && <p className="text-xs text-red-500 mt-0.5">{errors.jobRole}</p>}
          </div>

          {/* Row 4 – Telephone & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Telephone"
              name="telephone"
              type="tel"
              placeholder="+1 555 000 0000"
              value={form.telephone}
              error={errors.telephone}
              onChange={handleChange}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wide">
                Country <span className="text-[var(--gold)]">*</span>
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[#0F172A] bg-white outline-none transition-all
                  focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]
                  ${errors.country ? "border-red-400 ring-2 ring-red-100" : "border-[#E7E2D8] hover:border-[#C8BFA8]"}`}
              >
                <option value="" disabled>Select country…</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className="text-xs text-red-500 mt-0.5">{errors.country}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E7E2D8] mt-1">
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              By submitting, you agree to Aurilearn's privacy policy. We will never share your data.
            </p>
            <button
              type="submit"
              className="btn-gold px-8 py-2.5 text-sm font-bold shrink-0 w-full sm:w-auto justify-center"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ── Reusable text-input field ── */
type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
};

function Field({ label, name, value, onChange, placeholder, type = "text", error, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-bold text-[#475569] uppercase tracking-wide">
        {label} {required && <span className="text-[var(--gold)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-11 px-3.5 rounded-xl border text-sm text-[#0F172A] placeholder:text-[#CBD5E1] outline-none transition-all
          focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]
          ${error ? "border-red-400 ring-2 ring-red-100" : "border-[#E7E2D8] hover:border-[#C8BFA8]"}`}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
