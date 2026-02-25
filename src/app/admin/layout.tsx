import type { Metadata } from "next";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: `Admin — ${clientConfig.NOM_ENTREPRISE}`,
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 font-body">
      {children}
    </div>
  );
}
