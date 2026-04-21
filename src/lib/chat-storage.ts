import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  updateDoc,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";

// ── Types ──

export type ChatSession = {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string | null;
  roleLabel: string | null;
  jobTitle: string | null;
  createdAt: Date;
  lastMessageAt: Date | null;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  messageText: string;
  createdAt: Date;
};

export type ChatSubmission = ChatSession & {
  messages: ChatMessage[];
};

type ChatSessionInput = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  jobTitle: string;
};

// ── Helpers ──

function normalizeOptionalValue(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  return null;
}

function sessionFromDoc(docSnap: QueryDocumentSnapshot<DocumentData>): ChatSession {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    fullName: d.fullName ?? "",
    workEmail: d.workEmail ?? "",
    companyName: d.companyName ?? null,
    roleLabel: d.roleLabel ?? null,
    jobTitle: d.jobTitle ?? null,
    createdAt: toDate(d.createdAt) ?? new Date(),
    lastMessageAt: toDate(d.lastMessageAt),
  };
}

// ── Write operations (called from ChatWidget) ──

export async function createChatSession(input: ChatSessionInput) {
  const sessionRef = doc(getDb(), "chat_sessions", input.id);
  await setDoc(sessionRef, {
    fullName: input.name.trim(),
    workEmail: input.email.trim().toLowerCase(),
    companyName: normalizeOptionalValue(input.company),
    roleLabel: normalizeOptionalValue(input.role),
    jobTitle: normalizeOptionalValue(input.jobTitle),
    createdAt: serverTimestamp(),
    lastMessageAt: null,
  });
}

export async function appendUserChatMessage(sessionId: string, message: string) {
  const sessionRef = doc(getDb(), "chat_sessions", sessionId);

  await updateDoc(sessionRef, {
    lastMessageAt: serverTimestamp(),
  });

  const messagesRef = collection(getDb(), "chat_sessions", sessionId, "messages");
  await addDoc(messagesRef, {
    sender: "user" as const,
    messageText: message.trim(),
    createdAt: serverTimestamp(),
  });
}

// ── Read operations (called from admin page) ──

export async function getChatSessionCount(): Promise<number> {
  const sessionsRef = collection(getDb(), "chat_sessions");
  const snapshot = await getCountFromServer(sessionsRef);
  return snapshot.data().count;
}

export async function getChatSubmissionsPage(options: {
  page: number;
  pageSize: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}): Promise<{
  submissions: ChatSubmission[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> {
  const pageSize = Math.max(1, Math.min(200, Math.trunc(options.pageSize)));
  const requestedPage = Math.max(1, Math.trunc(options.page));

  const total = await getChatSessionCount();
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize);
  const page = Math.min(requestedPage, totalPages);

  if (total === 0) {
    return { submissions: [], total: 0, page: 1, pageSize, totalPages: 1, lastDoc: null };
  }

  const sessionsRef = collection(getDb(), "chat_sessions");
  let q = query(sessionsRef, orderBy("createdAt", "desc"), limit(pageSize));

  if (options.lastDoc) {
    q = query(sessionsRef, orderBy("createdAt", "desc"), startAfter(options.lastDoc), limit(pageSize));
  }

  const sessionSnap = await getDocs(q);
  const lastVisible = sessionSnap.docs[sessionSnap.docs.length - 1] ?? null;

  const submissions: ChatSubmission[] = [];

  for (const sessionDoc of sessionSnap.docs) {
    const session = sessionFromDoc(sessionDoc);

    const messagesRef = collection(getDb(), "chat_sessions", sessionDoc.id, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));
    const messagesSnap = await getDocs(messagesQuery);

    const messages: ChatMessage[] = messagesSnap.docs.map((msgDoc) => {
      const m = msgDoc.data();
      return {
        id: msgDoc.id,
        sender: m.sender ?? "user",
        messageText: m.messageText ?? "",
        createdAt: toDate(m.createdAt) ?? new Date(),
      };
    });

    submissions.push({ ...session, messages });
  }

  return { submissions, total, page, pageSize, totalPages, lastDoc: lastVisible };
}

// ── CSV export (called from admin page) ──

export async function getAllSubmissionsForExport(): Promise<ChatSubmission[]> {
  const sessionsRef = collection(getDb(), "chat_sessions");
  const q = query(sessionsRef, orderBy("createdAt", "desc"));
  const sessionSnap = await getDocs(q);

  const submissions: ChatSubmission[] = [];

  for (const sessionDoc of sessionSnap.docs) {
    const session = sessionFromDoc(sessionDoc);

    const messagesRef = collection(getDb(), "chat_sessions", sessionDoc.id, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));
    const messagesSnap = await getDocs(messagesQuery);

    const messages: ChatMessage[] = messagesSnap.docs.map((msgDoc) => {
      const m = msgDoc.data();
      return {
        id: msgDoc.id,
        sender: m.sender ?? "user",
        messageText: m.messageText ?? "",
        createdAt: toDate(m.createdAt) ?? new Date(),
      };
    });

    submissions.push({ ...session, messages });
  }

  return submissions;
}
