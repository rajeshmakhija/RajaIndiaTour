"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Connexion impossible.");
        return;
      }
      router.refresh();
    } catch {
      setError("Connexion impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center px-4 py-24">
      <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <Lock size={20} />
      </span>
      <h1 className="text-center font-display text-2xl font-bold text-ink">
        Administration du blog
      </h1>
      <p className="mt-2 text-center text-sm text-muted">
        Espace réservé à la relecture des articles générés.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          autoFocus
          className="w-full rounded-lg border border-cream-dark px-4 py-3 text-sm outline-none focus:border-brand-blue"
        />
        {error && <p className="text-sm font-medium text-brand-red">{error}</p>}
        <button
          type="submit"
          disabled={busy || password.length === 0}
          className="w-full rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
