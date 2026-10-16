"use client";

import { useState, FormEvent } from "react";
import Modal from "@/components/Modal";
import { Field } from "@/components/DemoRequestModal";
import { FALLBACK_CONTACT } from "@/lib/demoRequest";
import {
  submitFreeTrialRequest,
  freeTrialMailtoHref,
  isPersonalEmail,
  PERSONAL_EMAIL_MESSAGE,
  FreeTrialRequest,
} from "@/lib/freeTrial";

const EMPTY: FreeTrialRequest = { firstName: "", lastName: "", jobTitle: "", workEmail: "" };

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FreeTrialModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FreeTrialRequest>(EMPTY);
  /** idle → sending → sent, or error if delivery failed. */
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sendError, setSendError] = useState<string>("");
  /** Spam trap — real people never fill this in. */
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Partial<FreeTrialRequest>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FreeTrialRequest> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!form.workEmail.trim()) {
      newErrors.workEmail = "Company email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) {
      newErrors.workEmail = "Please enter a valid email address.";
    } else if (isPersonalEmail(form.workEmail)) {
      newErrors.workEmail = PERSONAL_EMAIL_MESSAGE;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FreeTrialRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (company) return; // honeypot tripped — drop it silently

    setStatus("sending");
    setSendError("");
    try {
      await submitFreeTrialRequest(form, company);
      setStatus("sent");
    } catch (err) {
      // Never show a thank-you we cannot stand behind.
      setStatus("error");
      setSendError(
        err instanceof Error && err.message ? err.message : "We could not send your request just now."
      );
      console.error("Free trial request failed:", err);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setStatus("idle");
      setSendError("");
      setCompany("");
      setForm(EMPTY);
      setErrors({});
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Try AuriLearn for Free" size="lg">
      {status === "sent" ? (
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
              We&apos;ll be in touch at <strong className="text-[#0F172A]">{form.workEmail.trim()}</strong> with your free trial access.
            </p>
          </div>
          <button onClick={handleClose} className="btn-gold px-8 py-2.5 text-sm font-bold mt-2">
            Close
          </button>
        </div>
      ) : (
        /* ── Form ── */
        <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
          <p className="text-[#64748B] text-sm leading-relaxed -mt-1">
            Fill in your details to get 10 free minutes of AI instruction. A company email address is required.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" placeholder="Jane" value={form.firstName} error={errors.firstName} onChange={handleChange} required />
            <Field label="Last Name" name="lastName" placeholder="Smith" value={form.lastName} error={errors.lastName} onChange={handleChange} required />
          </div>

          <Field label="Job Title" name="jobTitle" placeholder="e.g. Platform Engineer" value={form.jobTitle} error={errors.jobTitle} onChange={handleChange} required />

          <Field
            label="Company Email"
            name="workEmail"
            type="email"
            placeholder="jane.smith@company.com"
            value={form.workEmail}
            error={errors.workEmail}
            onChange={handleChange}
            required
          />

          {/* Spam trap — hidden from people, tempting to bots */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />

          {/* Delivery failed — say so, and give them a way through */}
          {status === "error" && (
            <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4">
              <p className="text-sm font-800 text-[#0F172A] mb-1">{sendError}</p>
              <p className="text-sm text-[#475569] leading-relaxed">
                Please email us directly at{" "}
                <a href={freeTrialMailtoHref(form)} className="font-bold text-[var(--gold-hover)] underline underline-offset-2">
                  {FALLBACK_CONTACT}
                </a>{" "}
                and we will get straight back to you.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E7E2D8] mt-1">
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              By submitting, you agree to Aurilearn&apos;s privacy policy. Your details are used only to set up your free trial.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold px-8 py-2.5 text-sm font-bold shrink-0 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : status === "error" ? (
                "Try again"
              ) : (
                "Start Free Trial"
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
