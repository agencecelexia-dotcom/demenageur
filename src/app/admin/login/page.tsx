"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Mot de passe incorrect.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="w-full max-w-sm px-4">
        {/* Logo / titre */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl mb-5 shadow-lg shadow-accent-500/20">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Administration</h1>
          <p className="mt-1 text-sm text-neutral-500">Transports Boulocher</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
            required
            className="w-full bg-neutral-800/70 border border-neutral-700 text-white px-4 py-3 text-sm rounded-xl placeholder:text-neutral-600 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-200"
          />

          {error && (
            <p className="mt-3 text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold text-sm py-3 rounded-xl hover:from-accent-600 hover:to-accent-700 hover:shadow-lg hover:shadow-accent-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
