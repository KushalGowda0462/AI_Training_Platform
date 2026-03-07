"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVendorBySlug } from "@/lib/mock/vendors";
import { getCertificationsByVendor } from "@/lib/mock/certifications";
import { getLabsByVendor } from "@/lib/mock/labs";
import CertificationCard from "@/components/CertificationCard";
import Modal from "@/components/Modal";
import { use } from "react";

type Props = { params: Promise<{ slug: string }> };

export default function VendorDetailPage({ params }: Props) {
    const { slug } = use(params);
    const vendor = getVendorBySlug(slug);
    if (!vendor) notFound();

    const certs = getCertificationsByVendor(slug);
    const labs = getLabsByVendor(slug);

    const [activeTab, setActiveTab] = useState<"overview" | "certifications" | "labs" | "resources">("overview");
    const [labModal, setLabModal] = useState<string | null>(null);
    const [demoModal, setDemoModal] = useState(false);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "certifications", label: `Certifications (${certs.length})` },
        { id: "labs", label: `Labs (${labs.length})` },
        { id: "resources", label: "Resources" },
    ] as const;

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            {/* Vendor Hero */}
            <section className="bg-white border-b border-[#E7E2D8] py-14">
                <div className="container-content">
                    <Link href="/vendors" className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#D4A017] transition-colors mb-6">
                        ← All Vendors
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-xs uppercase font-600 text-[#D4A017] tracking-wider mb-2 block">{vendor.category}</span>
                            <h1 className="text-4xl md:text-5xl font-800 text-[#0F172A] mb-4">{vendor.name}</h1>
                            <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">{vendor.longDescription}</p>
                            <div className="flex gap-5 mt-5">
                                <div>
                                    <span className="text-2xl font-800 text-[#D4A017]">{vendor.certCount}</span>
                                    <span className="text-sm text-[#94A3B8] ml-1.5">Certifications</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-800 text-[#D4A017]">{vendor.labCount}</span>
                                    <span className="text-sm text-[#94A3B8] ml-1.5">Labs</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setDemoModal(true)}
                            className="btn-gold text-base px-8 py-3 shrink-0"
                        >
                            Request Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <div className="bg-white border-b border-[#E7E2D8] sticky top-16 z-40">
                <div className="container-content">
                    <div className="flex gap-0 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-4 text-sm font-600 whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
                                        ? "text-[#D4A017] border-[#D4A017]"
                                        : "text-[#64748B] border-transparent hover:text-[#0F172A]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="section-pad">
                <div className="container-content">

                    {/* Overview */}
                    {activeTab === "overview" && (
                        <div className="max-w-2xl space-y-8">
                            <div>
                                <div className="gold-divider" />
                                <h2 className="text-2xl font-700 text-[#0F172A] mb-4">About {vendor.name} Training</h2>
                                <p className="text-[#64748B] leading-relaxed">{vendor.longDescription}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Avg. lab completion rate", value: "94%" },
                                    { label: "Time to first cert", value: "6 weeks" },
                                    { label: "Engineer satisfaction", value: "4.9/5" },
                                    { label: "Enterprise clients", value: "40+" },
                                ].map((stat) => (
                                    <div key={stat.label} className="card p-5 text-center">
                                        <div className="text-2xl font-800 text-[#D4A017] mb-1">{stat.value}</div>
                                        <div className="text-xs text-[#94A3B8]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {activeTab === "certifications" && (
                        <div>
                            {certs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {certs.map((c) => <CertificationCard key={c.id} cert={c} />)}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-[#94A3B8]">
                                    <div className="text-4xl mb-3">📋</div>
                                    <p>No certifications listed yet. Check back soon.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Labs */}
                    {activeTab === "labs" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {labs.map((lab) => (
                                <div key={lab.id} className="card p-5 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="badge-difficulty">{lab.level}</span>
                                        <span className="text-xs text-[#94A3B8]">{lab.duration}</span>
                                    </div>
                                    <h3 className="text-base font-700 text-[#0F172A]">{lab.title}</h3>
                                    <p className="text-sm text-[#64748B] leading-relaxed flex-1">{lab.description}</p>
                                    <button
                                        onClick={() => setLabModal(lab.id)}
                                        className="btn-gold text-sm py-2 justify-center"
                                    >
                                        Start lab
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resources */}
                    {activeTab === "resources" && (
                        <div className="max-w-xl space-y-3">
                            {[
                                "Official Vendor Documentation",
                                "Learning Path Guide (PDF)",
                                "Lab Environment Setup Guide",
                                "Exam Blueprint Reference",
                                "Community Forum & Discussion Board",
                            ].map((r) => (
                                <div key={r} className="card p-4 flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#D4A017]">📄</span>
                                        <span className="text-sm font-500 text-[#0F172A]">{r}</span>
                                    </div>
                                    <span className="text-[#94A3B8] group-hover:text-[#D4A017] transition-colors text-sm">→</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lab placeholder modal */}
            <Modal isOpen={!!labModal} onClose={() => setLabModal(null)} title="Lab Environment" size="md">
                <div className="text-center py-8">
                    <div className="text-5xl mb-4">⚗️</div>
                    <p className="text-[#475569] text-sm">Lab demo placeholder — environment provisioning would launch here.</p>
                </div>
            </Modal>

            {/* Demo modal */}
            <Modal isOpen={demoModal} onClose={() => setDemoModal(false)} title={`Request Demo — ${vendor.name}`} size="md">
                <div className="space-y-4">
                    <p className="text-[#64748B] text-sm">Tell us a bit about your team and we&apos;ll set up a personalized demo.</p>
                    <input type="email" placeholder="Corporate email" className="input-base" />
                    <input type="text" placeholder="Company name" className="input-base" />
                    <button className="btn-gold w-full justify-center">Submit Request</button>
                </div>
            </Modal>
        </div>
    );
}
