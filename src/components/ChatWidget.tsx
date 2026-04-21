"use client";

import { useEffect, useRef, useState } from "react";
import DemoRequestModal from "@/components/DemoRequestModal";
import { createChatSession, appendUserChatMessage } from "@/lib/chat-storage";

type Message = {
  role: "assistant" | "user";
  text: string;
  showContactCard?: boolean;
};

type LeadForm = {
  name: string;
  email: string;
  company: string;
  role: string;
  jobTitle: string;
};

type Reply = {
  text: string;
  showContactCard?: boolean;
};

type Faq = {
  label: string;
  question: string;
  answer: string;
  keywords: string[];
  showContactCard?: boolean;
};

const FAQS: Faq[] = [
  {
    label: "Onboarding",
    question: "How does Aurilearn help freshers during onboarding?",
    answer:
      "Aurilearn gives new hires a 1:1 AI instructor from day one. Learners can move through guided modules, ask questions at any point, and get hands-on support during labs without waiting for instructor availability.",
    keywords: ["onboarding", "fresher", "freshers", "new hire", "new hires", "ramp"],
  },
  {
    label: "Mentorship",
    question: "How does the AI instructor behave during training?",
    answer:
      "The Aurilearn instructor is designed to feel like a senior engineer guiding the learner. It explains reasoning, adapts to the learner's current task, and gives immediate feedback so progress keeps moving.",
    keywords: ["mentor", "mentorship", "instructor", "coach", "guidance", "support"],
  },
  {
    label: "Labs",
    question: "Can Aurilearn support labs and certification prep?",
    answer:
      "Yes. Aurilearn is built around lab-driven learning, validation feedback, and structured tracks such as Kubernetes, DevOps, platform engineering, certification prep, and internal product enablement.",
    keywords: ["lab", "labs", "certification", "certifications", "cka", "training track", "tracks"],
  },
  {
    label: "Security",
    question: "How does Aurilearn handle enterprise security and deployment?",
    answer:
      "Aurilearn can be deployed within the customer's environment or dedicated cloud setup, keeping training data inside the perimeter. Administrators also control who can access instructors, programs, and analytics.",
    keywords: ["security", "secure", "deployment", "deploy", "governance", "compliance", "access"],
  },
  {
    label: "Analytics",
    question: "What kind of learner analytics does Aurilearn provide?",
    answer:
      "Teams can track enrollment, module progress, lab validation outcomes, certification readiness, and roadblocks at the learner or cohort level. The goal is clear visibility into capability growth, not just course completion.",
    keywords: ["analytics", "reporting", "dashboard", "progress", "metrics", "insights"],
  },
  {
    label: "Demo",
    question: "How do demos, trials, and pricing work?",
    answer:
      "Demos, trials, and pricing are tailored around your team size, delivery model, and training goals. The fastest next step is an enterprise walkthrough so the Aurilearn team can recommend the right rollout.",
    keywords: ["demo", "trial", "pricing", "price", "cost", "quote", "plan"],
    showContactCard: true,
  },
];

const INITIAL_LEAD_FORM: LeadForm = {
  name: "",
  email: "",
  company: "",
  role: "",
  jobTitle: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FALLBACK_REPLY: Reply = {
  text: "That is a valuable question. For anything more specific to your stack, learner journey, or rollout plan, the Aurilearn team can walk you through the best setup for your organization.",
  showContactCard: true,
};

const GREETING_PATTERNS: { patterns: string[]; response: string }[] = [
  {
    patterns: [
      "hi", "hello", "hey", "hiya", "howdy", "greetings", "good morning",
      "good afternoon", "good evening", "what's up", "whats up", "sup",
      "yo", "hola", "namaste",
    ],
    response:
      "Hello! Welcome to the Aurilearn assistant. Feel free to ask me about onboarding, AI mentorship, labs, analytics, security, or demo planning — I am happy to help!",
  },
  {
    patterns: [
      "bye", "goodbye", "good bye", "see you", "see ya", "take care",
      "later", "cya", "ttyl", "gotta go", "have a good day",
      "have a nice day", "good night", "goodnight",
    ],
    response:
      "Thanks for chatting with Aurilearn! If you have more questions later, feel free to come back anytime. Have a great day!",
  },
  {
    patterns: [
      "thank you", "thanks", "thank u", "thx", "ty", "appreciate it",
      "much appreciated",
    ],
    response:
      "You are welcome! If there is anything else you would like to know about Aurilearn, feel free to ask.",
  },
  {
    patterns: ["how are you", "how r u", "how do you do", "how's it going"],
    response:
      "I am doing great, thank you for asking! I am here to help you explore Aurilearn. Feel free to ask about onboarding, labs, analytics, security, or demo planning.",
  },
];

function isGreeting(text: string): Reply | null {
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim();
  for (const group of GREETING_PATTERNS) {
    if (
      group.patterns.some(
        (p) => normalized === p || normalized.startsWith(p + " ") || normalized.endsWith(" " + p)
      )
    ) {
      return { text: group.response };
    }
  }
  return null;
}

function getReply(question: string): Reply {
  const greetingReply = isGreeting(question);
  if (greetingReply) {
    return greetingReply;
  }

  const normalizedQuestion = question.toLowerCase();
  const match = FAQS.find(
    (faq) =>
      normalizedQuestion.includes(faq.question.toLowerCase()) ||
      faq.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (!match) {
    return FALLBACK_REPLY;
  }

  return {
    text: match.answer,
    showContactCard: match.showContactCard,
  };
}

function getShortName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function getUserInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "Y";
}


export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [stage, setStage] = useState<"welcome" | "chat">("welcome");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [leadForm, setLeadForm] = useState<LeadForm>(INITIAL_LEAD_FORM);
  const [leadError, setLeadError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStartingChat, setIsStartingChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const replyTimersRef = useRef<number[]>([]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, stage, isTyping]);

  useEffect(() => {
    const timersRef = replyTimersRef;

    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleLeadChange =
    (field: keyof LeadForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLeadForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (leadError) {
        setLeadError("");
      }
    };

  const openDemoRequest = () => {
    setOpen(false);
    setDemoOpen(true);
  };

  const scrollToContact = () => {
    setOpen(false);

    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.location.assign("/#contact");
  };

  const startConversation = async () => {
    const trimmedName = leadForm.name.trim();
    const trimmedEmail = leadForm.email.trim();

    if (!trimmedName) {
      setLeadError("Please add your name so the chat can feel personalised.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setLeadError("Please enter a valid work email address.");
      return;
    }

    setIsStartingChat(true);

    try {
      const newSessionId = crypto.randomUUID();

      await createChatSession({
        id: newSessionId,
        name: trimmedName,
        email: trimmedEmail,
        company: leadForm.company.trim(),
        role: leadForm.role.trim(),
        jobTitle: leadForm.jobTitle.trim(),
      });

      const shortName = getShortName(trimmedName);
      const perspective = [leadForm.jobTitle.trim(), leadForm.role.trim()]
        .filter(Boolean)
        .join(" / ");
      const trimmedCompany = leadForm.company.trim();

      let intro = `Hi ${shortName} — welcome to Aurilearn.`;

      if (perspective && trimmedCompany) {
        intro = `Hi ${shortName} — welcome to Aurilearn. I will keep your ${perspective} perspective at ${trimmedCompany} in mind while we explore the platform.`;
      } else if (perspective) {
        intro = `Hi ${shortName} — welcome to Aurilearn. I will keep your ${perspective} perspective in mind while we explore the platform.`;
      } else if (trimmedCompany) {
        intro = `Hi ${shortName} — welcome to Aurilearn. I will keep ${trimmedCompany} in mind while we explore the platform.`;
      }

      setLeadError("");
      setSessionId(newSessionId);
      setStage("chat");
      setMessages([
        {
          role: "assistant",
          text: `${intro}\n\nAsk about onboarding, AI mentorship, labs, analytics, security, or demo planning and I will give you a quick overview.`,
        },
      ]);
    } catch (error) {
      setLeadError(
        error instanceof Error
          ? error.message
          : "We could not start the chat right now. Please try again in a moment."
      );
    } finally {
      setIsStartingChat(false);
    }
  };

  const sendMessage = async (nextQuestion?: string) => {
    const question = (nextQuestion ?? input).trim();

    if (!question || isTyping || !sessionId) return;

    const reply = getReply(question);

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsTyping(true);

    try {
      await appendUserChatMessage(sessionId, question);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "We could not save your message right now. Please try again in a moment.",
        },
      ]);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply.text,
          showContactCard: reply.showContactCard,
        },
      ]);
    }, 650);

    replyTimersRef.current.push(timer);
  };

  const sessionMeta = [
    leadForm.jobTitle.trim(),
    leadForm.role.trim(),
    leadForm.company.trim(),
  ]
    .filter(Boolean)
    .join(" • ");
  const userInitial = getUserInitial(leadForm.name);

  return (
    <>
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      <div
        className={`fixed bottom-24 right-3 z-[9998] w-[calc(100vw-1.5rem)] max-w-[410px] origin-bottom-right transition-all duration-300 sm:bottom-24 sm:right-5 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-[0.98] opacity-0"
        }`}
        role="dialog"
        aria-label="Aurilearn chat assistant"
      >
        <div
          id="aurilearn-chat-window"
          className="relative flex flex-col overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          style={{ maxHeight: "min(80vh, 720px)" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-44"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(169, 128, 42, 0.18), transparent 55%)",
            }}
          />

          <div className="relative flex items-center gap-3 border-b border-white/10 bg-[#0B1220] px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--gold)] shadow-[0_0_18px_rgba(169,128,42,0.35)]">
              <span className="text-sm font-bold text-white">A</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-white">
                Aurilearn Assistant
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Demo assistant for onboarding, labs, and enterprise rollout
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {stage === "welcome" ? (
            <div
              className="flex-1 overflow-y-auto px-5 py-5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250, 250, 248, 1) 0%, rgba(244, 239, 230, 0.8) 100%)",
              }}
            >
              <div className="rounded-[24px] border border-[#E7E2D8] bg-white/85 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1220] shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gold)] text-sm font-bold text-white">
                      AI
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#64748B]">
                      Start a Guided Chat
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A]">
                      Welcome to Aurilearn
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      Share a few details and the assistant will tailor this demo
                      around your onboarding, training, or enterprise rollout
                      questions.
                    </p>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {["Onboarding", "Labs", "Analytics", "Security"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#E7E2D8] bg-[#FAFAF8] px-3 py-1.5 text-[11px] font-semibold text-[#475569]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void startConversation();
                  }}
                  className="space-y-3"
                >
                  <Field
                    id="chat-widget-name"
                    label="Full Name"
                    placeholder="Jane Smith"
                    value={leadForm.name}
                    onChange={handleLeadChange("name")}
                    required
                    autoComplete="name"
                  />

                  <Field
                    id="chat-widget-email"
                    label="Work Email"
                    placeholder="jane.smith@company.com"
                    value={leadForm.email}
                    onChange={handleLeadChange("email")}
                    type="email"
                    required
                    autoComplete="email"
                  />

                  <Field
                    id="chat-widget-company"
                    label="Company"
                    placeholder="Acme Technologies"
                    value={leadForm.company}
                    onChange={handleLeadChange("company")}
                    autoComplete="organization"
                  />

                  <Field
                    id="chat-widget-role"
                    label="Role"
                    placeholder="Learning & Development"
                    value={leadForm.role}
                    onChange={handleLeadChange("role")}
                  />

                  <Field
                    id="chat-widget-job-title"
                    label="Job Title"
                    placeholder="Platform Engineer"
                    value={leadForm.jobTitle}
                    onChange={handleLeadChange("jobTitle")}
                    autoComplete="organization-title"
                  />

                  {leadError ? (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                      {leadError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isStartingChat}
                    className="flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--gold)] px-4 text-sm font-bold text-white shadow-[0_10px_24px_rgba(169,128,42,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[var(--gold-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isStartingChat ? "Starting..." : "Start Conversation"}
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] leading-5 text-[#94A3B8]">
                  Your details are used only to personalise this demo
                  experience.
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex min-h-0 flex-1 flex-col"
              style={{
                background:
                  "linear-gradient(180deg, rgba(251, 250, 247, 1) 0%, rgba(247, 243, 235, 1) 100%)",
              }}
            >
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mb-4 rounded-2xl border border-[var(--gold)]/15 bg-white/90 px-4 py-3 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
                        Active Session
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                        Chatting as {leadForm.name.trim()}
                      </p>
                      {sessionMeta ? (
                        <p className="mt-1 text-xs text-[#64748B]">
                          {sessionMeta}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {messages.map((message, index) => {
                    const isUser = message.role === "user";

                    return (
                      <div
                        key={`${message.role}-${index}-${message.text.slice(0, 24)}`}
                        className={`flex items-end gap-2.5 ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            isUser
                              ? "bg-[#0F172A] text-white"
                              : "bg-[var(--gold)] text-white"
                          }`}
                        >
                          {isUser ? userInitial : "A"}
                        </div>

                        <div
                          className={`max-w-[82%] rounded-[20px] px-4 py-3 text-[13px] leading-6 shadow-sm ${
                            isUser
                              ? "rounded-br-md bg-[#0F172A] text-white"
                              : "rounded-bl-md border border-[#E7E2D8] bg-white text-[#0F172A]"
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.text}</p>

                          {message.showContactCard ? (
                            <div className="mt-3 rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] p-3">
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                                Next Step
                              </p>
                              <div className="mt-2 grid gap-2">
                                <button
                                  type="button"
                                  onClick={openDemoRequest}
                                  className="flex items-center justify-between rounded-xl border border-[#E7E2D8] bg-white px-3 py-2.5 text-left text-xs font-semibold text-[#0F172A] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                                >
                                  Request enterprise demo
                                  <span aria-hidden="true">→</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={scrollToContact}
                                  className="flex items-center justify-between rounded-xl border border-[#E7E2D8] bg-white px-3 py-2.5 text-left text-xs font-semibold text-[#0F172A] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                                >
                                  View contact options
                                  <span aria-hidden="true">→</span>
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}

                  {isTyping ? (
                    <div className="flex items-end gap-2.5">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-white">
                        A
                      </div>
                      <div className="rounded-[20px] rounded-bl-md border border-[#E7E2D8] bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((dot) => (
                            <span
                              key={dot}
                              className="h-2 w-2 rounded-full bg-[var(--gold)] animate-bounce"
                              style={{ animationDelay: `${dot * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="border-t border-[#E7E2D8] bg-white/95 px-4 py-3 backdrop-blur-sm">
                <div className="mb-3 flex flex-wrap gap-2">
                  {FAQS.map((faq) => (
                    <button
                      type="button"
                      key={faq.label}
                      onClick={() => void sendMessage(faq.question)}
                      disabled={isTyping}
                      className="rounded-full border border-[#E7E2D8] bg-[#FAFAF8] px-3 py-1.5 text-[11px] font-semibold text-[#475569] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {faq.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void sendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about onboarding, labs, analytics, or rollout..."
                    disabled={isTyping}
                    className="h-11 flex-1 rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] px-4 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Type your question"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F172A] text-white transition-all hover:-translate-y-0.5 hover:bg-[#1A2538] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2 11 13" />
                      <path d="m22 2-7 20-4-9-9-4Z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-5 right-3 z-[9999] sm:right-5">
        {!open ? (
          <span className="pointer-events-none absolute inset-0 rounded-[22px] bg-[var(--gold)]/30 blur-md" />
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`relative flex h-[60px] w-[60px] items-center justify-center rounded-[22px] shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition-all duration-300 ${
            open
              ? "bg-[#0F172A] text-white"
              : "bg-[var(--gold)] text-white hover:-translate-y-0.5 hover:bg-[var(--gold-hover)]"
          }`}
          aria-label={open ? "Close Aurilearn assistant" : "Open Aurilearn assistant"}
          aria-expanded={open}
          aria-controls="aurilearn-chat-window"
        >
          {!open ? (
            <span className="absolute inset-0 rounded-[22px] border border-white/25 animate-pulse" />
          ) : null}

          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8.5 10h.01" />
              <path d="M12 10h.01" />
              <path d="M15.5 10h.01" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#475569]">
        {label}
        {required ? <span className="ml-1 text-[var(--gold)]">*</span> : null}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border border-[#E7E2D8] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#CBD5E1] hover:border-[#C8BFA8] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
      />
    </label>
  );
}
