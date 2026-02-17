import { NextResponse } from "next/server";
import { readAnalytics } from "@/lib/storage";
import { cookies } from "next/headers";

const ADMIN_TOKEN = "bch-admin-session-v1";

export async function GET() {
  const store = await cookies();
  if (store.get("admin_auth")?.value !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await readAnalytics();
  return NextResponse.json(data);
}
