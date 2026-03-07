"use client";

import { useState } from "react";
import { vendors } from "@/lib/mock/vendors";
import VendorCard from "@/components/VendorCard";

const categories = ["All", "Networking", "Cloud", "Storage", "DevOps", "Virtualization", "Cloud Native"];

export default function VendorsPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = vendors.filter((v) => {
        const matchSearch =
            !search.trim() ||
            v.name.toLowerCase().includes(search.toLowerCase()) ||
            v.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = activeCategory === "All" || v.category === activeCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="section-pad bg-[#FAFAF8] min-h-screen">
            <div className="container-content">
                {/* Header */}
                <div className="mb-10">
                    <div className="gold-divider" />
                    <h1 className="text-4xl font-800 text-[#0F172A] mb-3">Vendors</h1>
                    <p className="text-[#64748B] text-lg max-w-xl">
                        Browse AI-powered training programs across every major enterprise technology vendor.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-md mb-6">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search vendors…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-base pl-9 text-sm"
                        />
                    </div>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-600 transition-all border ${activeCategory === cat
                                    ? "bg-[#D4A017] border-[#D4A017] text-white"
                                    : "border-[#E7E2D8] text-[#64748B] hover:border-[#D4A017] hover:text-[#D4A017]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((v) => (
                            <VendorCard key={v.slug} vendor={v} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-[#94A3B8]">
                        <div className="text-4xl mb-3">🔍</div>
                        <p className="text-base font-500">No vendors match your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
