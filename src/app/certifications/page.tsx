"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { certifications } from "@/lib/mock/certifications";
import { vendors } from "@/lib/mock/vendors";
import CertificationCard from "@/components/CertificationCard";
import SearchInput from "@/components/SearchInput";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const roles = ["All", "DevOps", "SRE", "SecOps", "Network", "Storage", "Cloud"];

function CertificationsContent() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("query") || "";

    const [search, setSearch] = useState(queryParam);
    const [vendor, setVendor] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const [role, setRole] = useState("All");

    useEffect(() => {
        setSearch(queryParam);
    }, [queryParam]);

    const filtered = certifications.filter((c) => {
        const matchSearch =
            !search.trim() ||
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.tagline.toLowerCase().includes(search.toLowerCase()) ||
            c.vendorSlug.toLowerCase().includes(search.toLowerCase());
        const matchVendor = vendor === "All" || c.vendorSlug === vendor;
        const matchDifficulty = difficulty === "All" || c.difficulty === difficulty;
        const matchRole = role === "All" || c.role === role;
        return matchSearch && matchVendor && matchDifficulty && matchRole;
    });

    return (
        <div className="section-pad bg-[#FAFAF8] min-h-screen">
            <div className="container-content">
                {/* Header */}
                <div className="mb-10">
                    <div className="gold-divider" />
                    <h1 className="text-4xl font-800 text-[#0F172A] mb-3">Certifications</h1>
                    <p className="text-[#64748B] text-lg max-w-xl">
                        Explore the full catalog of AI-powered certification paths with hands-on labs and intelligent instructor agents.
                    </p>
                </div>

                {/* Search bar */}
                <div className="max-w-xl mb-8">
                    <SearchInput
                        placeholder="Search certifications, vendors, roles…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-3 text-base"
                        iconSize={18}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8 p-5 bg-white rounded-2xl border border-[#E7E2D8] shadow-card">
                    {/* Vendor */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-600 text-[#94A3B8] uppercase tracking-wider">Vendor</label>
                        <select
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                            className="input-base text-sm py-1.5 min-w-[180px]"
                        >
                            <option value="All">All Vendors</option>
                            {vendors.map((v) => (
                                <option key={v.slug} value={v.slug}>{v.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-600 text-[#94A3B8] uppercase tracking-wider">Difficulty</label>
                        <div className="flex gap-1.5">
                            {difficulties.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDifficulty(d)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-600 transition-all border ${difficulty === d
                                        ? "bg-[#D4A017] border-[#D4A017] text-white"
                                        : "border-[#E7E2D8] text-[#64748B] hover:border-[#D4A017]"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-600 text-[#94A3B8] uppercase tracking-wider">Role</label>
                        <div className="flex flex-wrap gap-1.5">
                            {roles.map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-600 transition-all border ${role === r
                                        ? "bg-[#D4A017] border-[#D4A017] text-white"
                                        : "border-[#E7E2D8] text-[#64748B] hover:border-[#D4A017]"
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear */}
                    {(search || vendor !== "All" || difficulty !== "All" || role !== "All") && (
                        <div className="flex items-end">
                            <button
                                onClick={() => { setSearch(""); setVendor("All"); setDifficulty("All"); setRole("All"); }}
                                className="text-sm text-[#94A3B8] hover:text-[#0F172A] transition-colors underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="mb-5 text-sm text-[#94A3B8]">
                    Showing <span className="font-600 text-[#0F172A]">{filtered.length}</span> certifications
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((c) => (
                            <CertificationCard key={c.id} cert={c} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 text-[#94A3B8]">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-base font-500 mb-2">No certifications match your filters.</p>
                        <p className="text-sm">Try adjusting your search or clearing filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CertificationsPage() {
    return (
        <Suspense fallback={<div className="section-pad container-content text-[#94A3B8]">Loading…</div>}>
            <CertificationsContent />
        </Suspense>
    );
}
