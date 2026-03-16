"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Hi — I'm the Aurilearn demo assistant. Ask me about training programs, onboarding, or product guidance.",
  },
  {
    role: "user",
    text: "How does Aurilearn help freshers during onboarding?",
  },
  {
    role: "assistant",
    text: "Aurilearn provides 1:1 AI-led mentorship, guided learning modules, and real-time support during the training period.",
  },
];

const CANNED_REPLY =
  "This is a demo chatbot response. In the live product, Aurilearn would answer based on training content, product knowledge, and learning context.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    // Simulate a slight delay for the canned reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: CANNED_REPLY },
      ]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 z-[9999] w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Aurilearn demo chatbot"
      >
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(15,23,42,0.20)] border border-[#E7E2D8] flex flex-col bg-white" style={{ maxHeight: "480px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B1220] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-[0_0_12px_rgba(169,128,42,0.4)]">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">Aurilearn Assistant</div>
                <div className="text-[#94A3B8] text-xs leading-tight">Demo chatbot</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[#94A3B8] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#FAFAF8]" style={{ minHeight: "260px", maxHeight: "300px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-[var(--gold)] text-white"
                      : "bg-[#E7E2D8] text-[#64748B]"
                  }`}
                >
                  {msg.role === "assistant" ? "A" : "U"}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-[80%] ${
                    msg.role === "assistant"
                      ? "bg-white border border-[#E7E2D8] text-[#0F172A] rounded-tl-sm"
                      : "bg-[#0F172A] text-white rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-[#E7E2D8] bg-white shrink-0 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#E7E2D8] focus:outline-none focus:border-[var(--gold)] bg-[#FAFAF8] text-[#0F172A] placeholder-[#94A3B8] transition-colors"
              aria-label="Type your message"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-xl bg-[var(--gold)] text-white flex items-center justify-center hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-4 z-[9999] w-14 h-14 rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.20)] flex items-center justify-center transition-all duration-300 cursor-pointer ${
          open
            ? "bg-[#0B1220] text-[#94A3B8] hover:text-white"
            : "bg-[var(--gold)] text-white hover:bg-[var(--gold-hover)]"
        }`}
        aria-label={open ? "Close chat" : "Open Aurilearn chat assistant"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
