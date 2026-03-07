"use client";

import { useState } from "react";
import { Certification } from "@/lib/mock/certifications";
import Modal from "./Modal";

type Props = {
    cert: Certification;
};

export default function CertificationCard({ cert }: Props) {
    const [open, setOpen] = useState(false);

    const difficultyColors: Record<string, string> = {
        Beginner: "#22C55E",
        Intermediate: "#D4A017",
        Advanced: "#EF4444",
    };

    return (
        <>
            <div className="card p-5 flex flex-col gap-4 h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <span className="badge-difficulty" style={{ borderColor: difficultyColors[cert.difficulty], color: difficultyColors[cert.difficulty] }}>
                        {cert.difficulty}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-medium">{cert.duration}</span>
                </div>

                {/* Title */}
                <div className="flex-1">
                    <h3 className="text-base font-700 text-[#0F172A] leading-snug mb-1.5">{cert.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{cert.tagline}</p>
                </div>

                {/* Footer: vendor + role */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E7E2D8]">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs px-2 py-0.5 bg-[#FAFAF8] border border-[#E7E2D8] rounded-full text-[#64748B] font-medium">{cert.vendorSlug.replace("-", " ").toUpperCase()}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#FAFAF8] border border-[#E7E2D8] rounded-full text-[#64748B] font-medium">{cert.role}</span>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="text-sm font-600 text-[#D4A017] hover:text-[#B8870A] transition-colors"
                    >
                        View details →
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal isOpen={open} onClose={() => setOpen(false)} title={cert.title} size="lg">
                <div className="space-y-5">
                    <p className="text-[#475569] text-sm leading-relaxed">{cert.summary}</p>

                    <div>
                        <h4 className="text-sm font-700 text-[#0F172A] mb-3">What you&apos;ll learn</h4>
                        <ul className="space-y-2">
                            {cert.learnBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-[#475569]">
                                    <span className="w-4 h-4 rounded-full bg-[#F5E6B8] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M1.5 4l2 2 3-3" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {cert.relatedLabs.length > 0 && (
                        <div>
                            <h4 className="text-sm font-700 text-[#0F172A] mb-3">Related labs</h4>
                            <div className="flex flex-wrap gap-2">
                                {cert.relatedLabs.map((lab) => (
                                    <span key={lab} className="text-xs px-3 py-1.5 bg-[#FAFAF8] border border-[#E7E2D8] rounded-full text-[#475569] font-medium">
                                        {lab}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-[#E7E2D8]">
                        <a href="/#contact" className="btn-gold w-full justify-center" onClick={() => setOpen(false)}>
                            Request Demo for this Certification
                        </a>
                    </div>
                </div>
            </Modal>
        </>
    );
}
