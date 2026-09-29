"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    /** "dark" matches the dark Aurilearn sections; defaults to the white sheet. */
    tone?: "light" | "dark";
};

export default function Modal({ isOpen, onClose, title, children, size = "md", tone = "light" }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKey);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClass = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    }[size];

    const dark = tone === "dark";
    const sheetClass = dark
        ? "bg-[#0B1220] border border-[#1E2D45]"
        : "bg-white";
    const headerClass = dark ? "border-[#1E2D45]" : "border-[#E7E2D8]";
    const titleClass = dark ? "text-white" : "text-[#0F172A]";
    const closeClass = dark
        ? "text-[#94A3B8] hover:text-white hover:bg-[#162035]"
        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F3F0E8]";

    return (
        <div
            className="modal-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Modal"}
        >
            <div
                ref={modalRef}
                className={`${sheetClass} rounded-2xl shadow-2xl w-full ${sizeClass} max-h-[90vh] overflow-y-auto`}
                style={{ animation: "slideUp 0.25s ease" }}
            >
                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${headerClass}`}>
                    {title && (
                        <h2 className={`text-lg font-800 ${titleClass}`}>{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className={`ml-auto p-2 rounded-lg transition-colors ${closeClass}`}
                        aria-label="Close"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                {/* Body */}
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
}
