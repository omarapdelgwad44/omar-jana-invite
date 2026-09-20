import { GUESTBOOK_SCRIPT_URL, MESSAGE_MAX, NAME_MAX } from "@/lib/guestbook-config";

export type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: number;
};

const DEMO_KEY = "oj-wishes-demo";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isLocalDemo(): boolean {
  if (!isBrowser()) return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function isGuestbookConfigured(): boolean {
  return Boolean(GUESTBOOK_SCRIPT_URL) || isLocalDemo();
}

export function sanitizeWishInput(name: string, message: string): { name: string; message: string } | null {
  const cleanName = name.replace(/\s+/g, " ").trim().slice(0, NAME_MAX);
  const cleanMessage = message.replace(/\s+\n/g, "\n").trim().slice(0, MESSAGE_MAX);
  if (!cleanName || !cleanMessage) return null;
  return { name: cleanName, message: cleanMessage };
}

function sortNewest(wishes: Wish[]): Wish[] {
  return [...wishes].sort((a, b) => b.createdAt - a.createdAt);
}

function readDemoWishes(): Wish[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(DEMO_KEY);
    const parsed = raw ? (JSON.parse(raw) as Wish[]) : [];
    return Array.isArray(parsed) ? sortNewest(parsed) : [];
  } catch {
    return [];
  }
}

function writeDemoWishes(wishes: Wish[]) {
  window.localStorage.setItem(DEMO_KEY, JSON.stringify(sortNewest(wishes)));
}

async function parsePayload(response: Response): Promise<{ wishes?: Wish[]; wish?: Wish; error?: string }> {
  const text = await response.text();
  try {
    return JSON.parse(text) as { wishes?: Wish[]; wish?: Wish; error?: string };
  } catch {
    throw new Error("تعذّر قراءة سجل التهاني.");
  }
}

async function requestGuestbook(init?: RequestInit & { query?: Record<string, string> }): Promise<{
  wishes?: Wish[];
  wish?: Wish;
  error?: string;
}> {
  if (!GUESTBOOK_SCRIPT_URL) {
    throw new Error("سجل التهاني غير مربوط بعد.");
  }

  const url = new URL(GUESTBOOK_SCRIPT_URL);
  if (init?.query) {
    for (const [key, value] of Object.entries(init.query)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url.toString(), {
    method: init?.method ?? "GET",
    body: init?.body,
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("تعذّر الوصول إلى سجل التهاني.");
  }

  return parsePayload(response);
}

export async function listWishes(): Promise<Wish[]> {
  if (!GUESTBOOK_SCRIPT_URL && isLocalDemo()) {
    return readDemoWishes();
  }

  const payload = await requestGuestbook();
  const wishes = Array.isArray(payload.wishes) ? payload.wishes : [];
  return sortNewest(
    wishes.filter((wish) => wish && wish.name && wish.message),
  );
}

export async function addWish(name: string, message: string): Promise<Wish> {
  const clean = sanitizeWishInput(name, message);
  if (!clean) {
    throw new Error("من فضلكم اكتبوا الاسم وكلمة التهنئة.");
  }

  if (!GUESTBOOK_SCRIPT_URL && isLocalDemo()) {
    const wish: Wish = {
      id: crypto.randomUUID(),
      name: clean.name,
      message: clean.message,
      createdAt: Date.now(),
    };
    writeDemoWishes([wish, ...readDemoWishes()]);
    return wish;
  }

  try {
    const payload = await requestGuestbook({
      method: "POST",
      body: JSON.stringify(clean),
    });
    if (payload.wish?.name && payload.wish.message) {
      return payload.wish;
    }
    if (payload.error === "empty") {
      throw new Error("من فضلكم اكتبوا الاسم وكلمة التهنئة.");
    }
  } catch {
    // Apps Script sometimes blocks POST CORS; GET with query still appends a row.
  }

  const payload = await requestGuestbook({
    query: { name: clean.name, message: clean.message },
  });
  if (payload.wish?.name && payload.wish.message) {
    return payload.wish;
  }
  throw new Error("تعذّر حفظ التهنئة. حاولوا مرة أخرى.");
}
