import { NextResponse } from "next/server";
import { readSubmissions, saveSubmission } from "@/lib/storage";
import { cookies } from "next/headers";

const ADMIN_TOKEN = "bch-admin-session-v1";

async function isAuthed() {
  const store = await cookies();
  return store.get("admin_auth")?.value === ADMIN_TOKEN;
}

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await readSubmissions();
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const all = await readSubmissions();
  const submission = all.find((s) => s.id === id);
  if (submission) submission.read = true;
  const { default: fs } = await import("fs/promises");
  const { default: path } = await import("path");
  const file = path.join(process.env.STORAGE_PATH ?? path.join(process.cwd(), "storage"), "submissions.json");
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const all = await readSubmissions();
  const filtered = all.filter((s) => s.id !== id);
  const { default: fs } = await import("fs/promises");
  const { default: path } = await import("path");
  const file = path.join(process.env.STORAGE_PATH ?? path.join(process.cwd(), "storage"), "submissions.json");
  await fs.writeFile(file, JSON.stringify(filtered, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}

// expose saveSubmission for internal use
export { saveSubmission };
