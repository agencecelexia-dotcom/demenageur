import { NextResponse } from "next/server";
import { saveEvent } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ua = req.headers.get("user-agent") ?? undefined;
    const referrer = req.headers.get("referer") ?? undefined;

    await saveEvent({
      type: body.type,
      page: body.page ?? "/",
      label: body.label,
      ua,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
