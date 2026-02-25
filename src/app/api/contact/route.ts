import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { saveSubmission } from "@/lib/storage";

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

    const { firstName, lastName, email, phone, serviceType, moveVolume, projectDescription } =
      result.data;

    // Persist submission to storage
    await saveSubmission({ firstName, lastName, email, phone, serviceType, moveVolume, projectDescription });

    // TODO: send email via Resend
    // await sendEmail({ to: clientConfig.EMAIL, ... })

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
