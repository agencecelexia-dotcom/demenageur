import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as fs from "fs";
import * as path from "path";

const CONFIG_FILE = path.join(process.cwd(), "src", "config", "client.config.ts");

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("adminAuth");
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json() as Record<string, string>;
    let content = fs.readFileSync(CONFIG_FILE, "utf-8");

    for (const [key, value] of Object.entries(body)) {
      if (/^[A-Z][A-Z0-9_]+$/.test(key)) {
        const escaped = value.replace(/"/g, '\\"');
        content = content.replace(
          new RegExp(`(${key}:\\s*)"[^"]*"`, "m"),
          `$1"${escaped}"`
        );
      }
    }

    fs.writeFileSync(CONFIG_FILE, content, "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
