import Link from "next/link";
import { Vendor } from "@/lib/mock/vendors";

const categoryIcons: Record<string, string> = {
    Storage: "🗄️",
    Networking: "🌐",
    Virtualization: "💻",
    "Cloud Native": "☸️",
    Cloud: "☁️",
    DevOps: "⚙️",
};

export default function VendorCard({ vendor }: { vendor: Vendor }) {
    return (
        <Link href={`/vendors/${vendor.slug}`} className="block group">
            <div className="card p-6 h-full flex flex-col gap-4">
                {/* Icon + Category */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryIcons[vendor.category] || "🏢"}</span>
                    <span className="text-xs font-600 text-[#94A3B8] uppercase tracking-wider">{vendor.category}</span>
                </div>

                {/* Name */}
                <div className="flex-1">
                    <h3 className="text-lg font-700 text-[#0F172A] mb-1.5 group-hover:text-[#D4A017] transition-colors">
                        {vendor.name}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{vendor.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-[#E7E2D8]">
                    <div className="text-center">
                        <div className="text-base font-700 text-[#D4A017]">{vendor.certCount}</div>
                        <div className="text-xs text-[#94A3B8]">Certs</div>
                    </div>
                    <div className="w-px h-8 bg-[#E7E2D8]" />
                    <div className="text-center">
                        <div className="text-base font-700 text-[#D4A017]">{vendor.labCount}</div>
                        <div className="text-xs text-[#94A3B8]">Labs</div>
                    </div>
                    <div className="ml-auto text-sm font-600 text-[#D4A017] group-hover:text-[#B8870A] transition-colors">
                        Explore training →
                    </div>
                </div>
            </div>
        </Link>
    );
}
