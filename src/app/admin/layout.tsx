import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Transports Boulocher",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 font-body">
      {children}
    </div>
  );
}
