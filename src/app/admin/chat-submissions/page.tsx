"use client";

import { useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  getChatSubmissionsPage,
  getAllSubmissionsForExport,
  type ChatSubmission,
} from "@/lib/chat-storage";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const DEFAULT_PAGE_SIZE = 25;

function formatDate(value: Date | null) {
  if (!value) return "\u2014";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ── CSV helpers ──

function escapeCsvValue(value: string | null) {
  if (!value) return '""';
  return `"${value.replaceAll('"', '""')}"`;
}

function formatCsvDate(value: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString();
}

function downloadCsv(submissions: ChatSubmission[]) {
  const headers = [
    "session_id", "full_name", "work_email", "company_name", "role_label",
    "job_title", "session_created_at", "last_message_at", "message_id",
    "sender", "message_text", "message_created_at",
  ];

  const rows = submissions.flatMap((s) => {
    if (s.messages.length === 0) {
      return [[
        s.id, s.fullName, s.workEmail, s.companyName ?? "", s.roleLabel ?? "",
        s.jobTitle ?? "", formatCsvDate(s.createdAt), formatCsvDate(s.lastMessageAt),
        "", "", "", "",
      ]];
    }
    return s.messages.map((m) => [
      s.id, s.fullName, s.workEmail, s.companyName ?? "", s.roleLabel ?? "",
      s.jobTitle ?? "", formatCsvDate(s.createdAt), formatCsvDate(s.lastMessageAt),
      m.id, m.sender, m.messageText, formatCsvDate(m.createdAt),
    ]);
  });

  const csv = [
    "\uFEFF" + headers.join(","),
    ...rows.map((row) => row.map((v) => escapeCsvValue(v)).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chat-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Login form ──

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
      onLogin();
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">
      <div className="w-full max-w-md rounded-[28px] border border-[#E7E2D8] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">
          Admin
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-[#0F172A]">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Enter your admin credentials to view chat submissions.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#475569]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl border border-[#E7E2D8] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#CBD5E1] hover:border-[#C8BFA8] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
              placeholder="admin@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#475569]">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl border border-[#E7E2D8] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#CBD5E1] hover:border-[#C8BFA8] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
              placeholder="Enter password"
            />
          </label>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1A2538] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

// ── Main admin page ──

export default function ChatSubmissionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [submissions, setSubmissions] = useState<ChatSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [lastDocs, setLastDocs] = useState<Map<number, QueryDocumentSnapshot<DocumentData>>>(new Map());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  const loadPage = useCallback(async (targetPage: number) => {
    setLoading(true);
    setError("");

    try {
      const lastDoc = targetPage > 1 ? lastDocs.get(targetPage - 1) ?? null : null;
      const result = await getChatSubmissionsPage({
        page: targetPage,
        pageSize: DEFAULT_PAGE_SIZE,
        lastDoc,
      });

      setSubmissions(result.submissions);
      setTotal(result.total);
      setPage(result.page);
      setTotalPages(result.totalPages);

      if (result.lastDoc) {
        setLastDocs((prev) => {
          const next = new Map(prev);
          next.set(result.page, result.lastDoc!);
          return next;
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load submissions."
      );
    } finally {
      setLoading(false);
    }
  }, [lastDocs]);

  useEffect(() => {
    if (user) {
      loadPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const all = await getAllSubmissionsForExport();
      downloadCsv(all);
    } catch {
      alert("Failed to export CSV. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(getFirebaseAuth());
    setSubmissions([]);
    setTotal(0);
    setPage(1);
    setTotalPages(1);
    setLastDocs(new Map());
  };

  if (!authChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8]">
        <p className="text-sm text-[#64748B]">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />;
  }

  const pageMessageCount = submissions.reduce(
    (count, s) => count + s.messages.length,
    0
  );
  const rangeStart = total === 0 ? 0 : (page - 1) * DEFAULT_PAGE_SIZE + 1;
  const rangeEnd = total === 0 ? 0 : rangeStart + submissions.length - 1;

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="rounded-[28px] border border-[#E7E2D8] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">
                Admin
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0F172A]">
                Chat Submissions
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                This page shows every captured chat session, the user details
                that started it, and the user messages saved for that session.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                disabled={exporting || total === 0}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#0F172A] px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1A2538] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E7E2D8] bg-white px-5 text-sm font-bold text-[#475569] transition-all hover:border-[#C8BFA8] hover:bg-[#FAFAF8]"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatCard label="Total Sessions" value={total} />
            <StatCard label="Messages (this page)" value={pageMessageCount} />
            <StatCard
              label="Showing"
              value={total === 0 ? "0" : `${rangeStart}\u2013${rangeEnd}`}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-[28px] border border-[#E7E2D8] bg-white p-8 text-center text-[#64748B]">
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#D6CEBF] bg-white p-8 text-center text-[#64748B] shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
            No chat submissions have been captured yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {submissions.map((submission) => (
              <details
                key={submission.id}
                className="group overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] open:shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-4 transition-colors hover:bg-[#FBF8F2] [&::-webkit-details-marker]:hidden">
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="truncate text-base font-black tracking-tight text-[#0F172A]">
                        {submission.fullName}
                      </h2>
                      <span className="truncate text-sm text-[#475569]">
                        {submission.workEmail}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8]">
                      {submission.companyName && (
                        <span className="truncate">{submission.companyName}</span>
                      )}
                      {submission.companyName && submission.roleLabel && (
                        <span aria-hidden="true">&bull;</span>
                      )}
                      {submission.roleLabel && (
                        <span className="truncate">{submission.roleLabel}</span>
                      )}
                      {(submission.companyName || submission.roleLabel) && (
                        <span aria-hidden="true">&bull;</span>
                      )}
                      <span className="truncate">
                        {formatDate(submission.lastMessageAt ?? submission.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="rounded-full border border-[#E7E2D8] bg-[#FAFAF8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                      {submission.messages.length} msg
                      {submission.messages.length === 1 ? "" : "s"}
                    </span>
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#64748B] transition-transform group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="5 8 10 13 15 8" />
                    </svg>
                  </div>
                </summary>

                <div className="border-t border-[#E7E2D8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF8F2_100%)] px-6 py-5">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <MetaCard label="Company" value={submission.companyName} />
                    <MetaCard label="Role" value={submission.roleLabel} />
                    <MetaCard label="Job Title" value={submission.jobTitle} />
                    <MetaCard label="Started" value={formatDate(submission.createdAt)} />
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#E7E2D8] bg-[#FAFAF8] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                      {submission.messages.length} user message
                      {submission.messages.length === 1 ? "" : "s"}
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Last activity: {formatDate(submission.lastMessageAt)}
                    </span>
                  </div>

                  {submission.messages.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#D6CEBF] bg-[#FAFAF8] px-4 py-5 text-sm text-[#64748B]">
                      Session created, but no chat message was sent after the form was submitted.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submission.messages.map((message) => (
                        <article
                          key={message.id}
                          className="rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] px-4 py-4"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                              {message.sender}
                            </span>
                            <span className="text-xs text-[#94A3B8]">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                          <p className="whitespace-pre-line text-sm leading-6 text-[#0F172A]">
                            {message.messageText}
                          </p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="flex flex-col items-center justify-between gap-3 rounded-[28px] border border-[#E7E2D8] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:flex-row"
          >
            <p className="text-xs text-[#64748B]">
              Page <span className="font-bold text-[#0F172A]">{page}</span> of{" "}
              <span className="font-bold text-[#0F172A]">{totalPages}</span>
              {" \u00B7 "}
              {rangeStart}\u2013{rangeEnd} of {total}
            </p>
            <div className="flex items-center gap-2">
              <PagerButton
                disabled={page <= 1 || loading}
                label="Previous"
                onClick={() => loadPage(page - 1)}
              />
              <PagerButton
                disabled={page >= totalPages || loading}
                label="Next"
                onClick={() => loadPage(page + 1)}
              />
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] px-4 py-3">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </div>
      <div className="mt-1 text-2xl font-black text-[#0F172A]">{value}</div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl border border-[#E7E2D8] bg-white px-4 py-3">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-[#0F172A]">
        {value && value.trim().length > 0 ? value : "\u2014"}
      </div>
    </div>
  );
}

function PagerButton({
  disabled,
  label,
  onClick,
}: {
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  const classes =
    "inline-flex h-10 items-center justify-center rounded-2xl border px-4 text-sm font-bold transition-all";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${classes} border-[#E7E2D8] bg-[#FAFAF8] text-[#CBD5E1]`}
      >
        {label}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${classes} border-[#0F172A] bg-[#0F172A] text-white hover:-translate-y-0.5 hover:bg-[#1A2538]`}
    >
      {label}
    </button>
  );
}
