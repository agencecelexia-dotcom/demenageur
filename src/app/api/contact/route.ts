import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", issues: result.error.issues },
        { status: 400 }
      );
    }

    // Here you would send the email via Resend, SendGrid, etc.
    // For now we just log and return success
    console.log("Contact form submission:", result.data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
