import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0B1220] text-white">
            <div className="container-content py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-[#D4A017] flex items-center justify-center">
                                <span className="text-white text-xs font-bold">A</span>
                            </div>
                            <span className="text-white text-xl font-bold tracking-tight">Aurentis</span>
                        </div>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            AI-powered instructor agents for enterprise technical training at scale.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: "Vendors", href: "/vendors" },
                                { label: "Certifications", href: "/certifications" },
                                { label: "Security", href: "/#security" },
                                { label: "How It Works", href: "/demo" },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-sm text-[#94A3B8] hover:text-[#D4A017] transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: "About", href: "/#about" },
                                { label: "Contact", href: "/#contact" },
                                { label: "Careers", href: "#" },
                                { label: "Blog", href: "#" },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-[#94A3B8] hover:text-[#D4A017] transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: "Docs", href: "#" },
                                { label: "Support", href: "#" },
                                { label: "Status", href: "#" },
                                { label: "API Reference", href: "#" },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-[#94A3B8] hover:text-[#D4A017] transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="border-t border-[#162035] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#475569] text-sm">© 2024 Aurentis Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                            <Link key={l} href="#" className="text-sm text-[#475569] hover:text-[#D4A017] transition-colors">
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
