"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);

            const hero = document.getElementById("hero");
            if (!hero) {
                if (window.location.pathname !== "/") setHeroVisible(false);
                return;
            }

            const rect = hero.getBoundingClientRect();
            if (rect.bottom < 120) {
                setHeroVisible(false);
            } else {
                setHeroVisible(true);
            }
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "/#about", label: "About" },
        { href: "/#security", label: "Security" },
        { href: "/#analytics", label: "Analytics" },
        { href: "/#testimonials", label: "Testimonials" },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#") && window.location.pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
                // Align section beautifully to top for fullscreen mode
                const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                setMenuOpen(false);
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200 border-b border-[#E7E2D8] ${scrolled ? "shadow-[0_2px_20px_rgba(15,23,42,0.08)]" : ""}`}
        >
            <div className="container-content">
                <div className="flex items-center justify-between h-20 gap-4">
                    {/* Logo */}
                    <Link href="/" onClick={(e) => {
                        if (window.location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setMenuOpen(false);
                        }
                    }} className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-lg bg-[var(--gold)] flex items-center justify-center shadow-sm">
                            <span className="text-white text-base font-bold">A</span>
                        </div>
                        <span className="text-[#0F172A] text-2xl font-800 tracking-tight">Aurilearn</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={(e) => handleAnchorClick(e, l.href)}
                                className="text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTAs */}
                    <div className={`hidden md:flex items-center gap-3 transition-all duration-300 ${heroVisible ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}>
                        <Link href="/#contact" className="text-sm font-600 px-4 py-2 rounded-lg text-[#0F172A] hover:bg-[#F3F0E8] transition-colors">
                            Try for Free
                        </Link>
                        <Link href="/#contact" className="btn-gold text-sm px-5 py-2">
                            Request Enterprise Demo
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden p-2 text-[#0F172A] rounded-lg hover:bg-[#F3F0E8] transition-colors"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-[#E7E2D8] py-4 space-y-2 pb-6">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={(e) => handleAnchorClick(e, l.href)}
                                className="block px-3 py-3 text-base font-semibold text-[#475569] hover:text-[#0F172A] rounded-xl hover:bg-[#FAFAF8] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <div className="px-3 pt-4 flex flex-col gap-3">
                            <Link href="/#contact" className="w-full text-center py-3 text-sm font-600 rounded-xl bg-[#F3F0E8] text-[#0F172A]" onClick={() => setMenuOpen(false)}>
                                Try for Free
                            </Link>
                            <Link href="/#contact" className="btn-gold text-sm w-full justify-center py-3" onClick={() => setMenuOpen(false)}>
                                Request Enterprise Demo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
