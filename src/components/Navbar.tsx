"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { certifications } from "@/lib/mock/certifications";
import SearchInput from "@/components/SearchInput";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState<typeof certifications>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (val: string) => {
        setSearchValue(val);
        if (val.trim().length > 1) {
            const filtered = certifications.filter(
                (c) =>
                    c.title.toLowerCase().includes(val.toLowerCase()) ||
                    c.tagline.toLowerCase().includes(val.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            setShowSuggestions(false);
            router.push(`/certifications?query=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const navLinks = [
        { href: "/#vendors", label: "Vendors" },
        { href: "/#certifications", label: "Certifications" },
        { href: "/#security", label: "Security" },
        { href: "/#about", label: "About" },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#") && window.location.pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
                // Determine offset. 'certifications' gets less padding so we scroll lower down the page
                // to frame the bottom CTA better. Normal sticky nav offset is ~80px (5rem).
                // We'll subtract less for certifications so it scrolls further down.
                const offset = id === "certifications" ? 0 : 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };


    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200 border-b border-[#E7E2D8] ${scrolled ? "shadow-[0_2px_20px_rgba(15,23,42,0.08)]" : ""}`}
        >
            <div className="container-content">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 rounded-lg bg-[#D4A017] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-[#0F172A] text-xl font-bold tracking-tight">Aurentis</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={(e) => handleAnchorClick(e, l.href)}
                                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div ref={searchRef} className="relative hidden lg:block flex-1 max-w-xs">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                placeholder="Search certifications…"
                                value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => suggestions.length && setShowSuggestions(true)}
                                containerClassName="h-10 w-full"
                                className="py-2 text-sm"
                                iconSize={16}
                            />
                        </form>

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-lg border border-[#E7E2D8] overflow-hidden z-50">
                                {suggestions.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setSearchValue(s.title);
                                            setShowSuggestions(false);
                                            router.push(`/certifications?query=${encodeURIComponent(s.title)}`);
                                        }}
                                        className="w-full text-left px-4 py-2.5 hover:bg-[#FAFAF8] transition-colors"
                                    >
                                        <div className="text-sm font-medium text-[#0F172A] truncate">{s.title}</div>
                                        <div className="text-xs text-[#94A3B8] truncate">{s.tagline}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <Link href="/#contact" className="btn-gold text-sm hidden md:inline-flex">
                        Request Enterprise Demo
                    </Link>

                    {/* Hamburger */}
                    <button
                        className="md:hidden p-2 text-[#0F172A] rounded-lg hover:bg-[#F3F0E8] transition-colors"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-[#E7E2D8] py-3 space-y-1">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearchSubmit} className="px-1 mb-3">
                            <SearchInput
                                placeholder="Search certifications…"
                                value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                containerClassName="h-10 w-full"
                                className="py-2 text-sm"
                                iconSize={16}
                            />
                        </form>
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={(e) => {
                                    handleAnchorClick(e, l.href);
                                    setMenuOpen(false);
                                }}
                                className="block px-2 py-2.5 text-sm font-medium text-[#475569] hover:text-[#0F172A] rounded-lg hover:bg-[#FAFAF8] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <div className="px-1 pt-2">
                            <Link href="/#contact" className="btn-gold text-sm w-full justify-center" onClick={() => setMenuOpen(false)}>
                                Request Enterprise Demo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
