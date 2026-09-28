import {
  GUESTBOOK_SCRIPT_URL,
  MANTLE_BASE_URL,
  MANTLE_NAMESPACE,
  MESSAGE_MAX,
  NAME_MAX,
} from "@/lib/guestbook-config";

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

function useMantle(): boolean {
  return Boolean(MANTLE_NAMESPACE) && !GUESTBOOK_SCRIPT_URL;
}

export function isGuestbookConfigured(): boolean {
  return Boolean(GUESTBOOK_SCRIPT_URL) || useMantle() || isLocalDemo();
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

function isWish(value: unknown): value is Wish {
  if (!value || typeof value !== "object") return false;
  const wish = value as Wish;
  return Boolean(wish.name && wish.message);
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

async function mantleFetch(path: string, init?: RequestInit): Promise<Response> {
  const cleanPath = path.replace(/^\/+/, "");
  const url = `${MANTLE_BASE_URL}/${MANTLE_NAMESPACE}/${cleanPath}`;
  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });
}

async function withRetry<T>(task: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function mapLimited<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await task(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function readMantleWish(path: string): Promise<Wish | null> {
  try {
    return await withRetry(async () => {
      const response = await mantleFetch(path);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = (await response.json()) as unknown;
      return isWish(payload) ? payload : null;
    });
  } catch {
    return null;
  }
}

async function listMantleWishes(): Promise<Wish[]> {
  const listResponse = await withRetry(async () => {
    const response = await fetch(`${MANTLE_BASE_URL}/list/${MANTLE_NAMESPACE}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok && response.status !== 404) throw new Error(`HTTP ${response.status}`);
    return response;
  });

  if (listResponse.status === 404) {
    return [];
  }
  if (!listResponse.ok) {
    throw new Error("تعذّر تحميل سجل التهاني الآن.");
  }

  const listed = (await listResponse.json()) as {
    entries?: Array<{ path?: string }>;
  };
  const paths = (listed.entries ?? [])
    .map((entry) => entry.path || "")
    .filter((path) => path.startsWith("wishes/"));

  if (paths.length === 0) {
    return [];
  }

  const wishes = await mapLimited(paths, 6, readMantleWish);

  return sortNewest(wishes.filter((wish): wish is Wish => Boolean(wish)));
}

async function addMantleWish(name: string, message: string): Promise<Wish> {
  const wish: Wish = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: Date.now(),
  };

  const response = await mantleFetch(`wishes/${wish.id}`, {
    method: "POST",
    body: JSON.stringify(wish),
  });

  if (!response.ok) {
    throw new Error("تعذّر حفظ التهنئة. حاولوا مرة أخرى.");
  }

  return wish;
}

export async function listWishes(): Promise<Wish[]> {
  if (GUESTBOOK_SCRIPT_URL) {
    const payload = await requestGuestbook();
    const wishes = Array.isArray(payload.wishes) ? payload.wishes : [];
    return sortNewest(wishes.filter((wish) => wish && wish.name && wish.message));
  }

  if (useMantle()) {
    return listMantleWishes();
  }

  if (isLocalDemo()) {
    return readDemoWishes();
  }

  throw new Error("سجل التهاني غير مربوط بعد.");
}

export async function addWish(name: string, message: string): Promise<Wish> {
  const clean = sanitizeWishInput(name, message);
  if (!clean) {
    throw new Error("من فضلكم اكتبوا الاسم وكلمة التهنئة.");
  }

  if (GUESTBOOK_SCRIPT_URL) {
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
    } catch (error) {
      if (error instanceof Error && error.message.includes("اكتبوا")) {
        throw error;
      }
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

  if (useMantle()) {
    return addMantleWish(clean.name, clean.message);
  }

  if (isLocalDemo()) {
    const wish: Wish = {
      id: crypto.randomUUID(),
      name: clean.name,
      message: clean.message,
      createdAt: Date.now(),
    };
    writeDemoWishes([wish, ...readDemoWishes()]);
    return wish;
  }

  throw new Error("سجل التهاني غير مربوط بعد.");
}
