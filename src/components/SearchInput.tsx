import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    iconSize?: number;
}

export default function SearchInput({
    className = "",
    containerClassName = "",
    iconSize = 18,
    ...props
}: SearchInputProps) {
    return (
        <div
            className={`flex flex-row items-center gap-3 px-3.5 border-[1.5px] border-[#E7E2D8] rounded-[10px] bg-white focus-within:border-[#D4A017] focus-within:shadow-[0_0_0_3px_rgba(212,160,23,0.12)] transition-all overflow-hidden ${containerClassName}`}
        >
            <svg
                className="shrink-0 text-[#94A3B8]"
                width={iconSize}
                height={iconSize}
                viewBox="0 0 18 18"
                fill="none"
            >
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
                type="text"
                className={`flex-1 bg-transparent border-none outline-none text-[#0F172A] placeholder-[#94A3B8] w-full min-w-0 focus:ring-0 ${className}`}
                {...props}
            />
        </div>
    );
}
