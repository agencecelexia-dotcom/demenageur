import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

const DIR = process.env.STORAGE_PATH ?? path.join(process.cwd(), "storage");
const SUBMISSIONS_FILE = path.join(DIR, "submissions.json");
const ANALYTICS_FILE = path.join(DIR, "analytics.json");

async function ensureFile(filePath: string) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

// ─── Generic CRUD (sync) ────────────────────────────────────────────────────

export function readData<T>(filename: string, defaultData: T): T {
  const filepath = path.join(DIR, filename);
  try {
    if (fsSync.existsSync(filepath)) {
      return JSON.parse(fsSync.readFileSync(filepath, "utf-8"));
    }
  } catch {
    // fallback to default
  }
  return defaultData;
}

export function writeData<T>(filename: string, data: T): void {
  if (!fsSync.existsSync(DIR)) {
    fsSync.mkdirSync(DIR, { recursive: true });
  }
  fsSync.writeFileSync(
    path.join(DIR, filename),
    JSON.stringify(data, null, 2)
  );
}

// ─── Submissions ────────────────────────────────────────────────────────────

export interface Submission {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  moveVolume: string;
  projectDescription: string;
  read: boolean;
}

export async function readSubmissions(): Promise<Submission[]> {
  await ensureFile(SUBMISSIONS_FILE);
  const raw = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
  return JSON.parse(raw) as Submission[];
}

export async function saveSubmission(
  data: Omit<Submission, "id" | "createdAt" | "read">
): Promise<void> {
  const all = await readSubmissions();
  all.unshift({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  });
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(all, null, 2), "utf-8");
}

// ─── Analytics ──────────────────────────────────────────────────────────────

export interface AnalyticsEvent {
  id: string;
  createdAt: string;
  type: "page_view" | "cta_click" | "form_start" | "form_submit";
  page: string;
  label?: string;
  referrer?: string;
  ua?: string;
}

export async function readAnalytics(): Promise<AnalyticsEvent[]> {
  await ensureFile(ANALYTICS_FILE);
  const raw = await fs.readFile(ANALYTICS_FILE, "utf-8");
  return JSON.parse(raw) as AnalyticsEvent[];
}

export async function saveEvent(
  data: Omit<AnalyticsEvent, "id" | "createdAt">
): Promise<void> {
  const all = await readAnalytics();
  all.unshift({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  // Keep max 10 000 events
  if (all.length > 10000) all.splice(10000);
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(all, null, 2), "utf-8");
}
