"use client";

import { authApi } from "@/features/auth/api/authApi";
import { adminSession } from "@/features/auth/model/session";
import { ComicButton } from "@/shared/comic";
import { useState } from "react";

const INPUT_CLASS =
  "bg-white px-2.5 py-1.5 border-3 border-ink focus:outline-none focus:ring-3 focus:ring-comic-yellow w-full min-h-11 font-mono";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await authApi.login(login, password);
      adminSession.set("admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white shadow-[8px_8px_0_var(--color-ink)] p-6 border-5 border-ink w-full max-w-sm"
    >
      <h1 className="font-bangers text-4xl leading-none">SECRET LAIR</h1>
      <label className="flex flex-col gap-1 font-bold text-xs uppercase">
        Login
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="username"
          required
          className={INPUT_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1 font-bold text-xs uppercase">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className={INPUT_CLASS}
        />
      </label>
      {error && (
        <p role="alert" className="font-bold text-comic-red text-sm">
          {error}
        </p>
      )}
      <ComicButton type="submit" disabled={isPending}>
        {isPending ? "CHECKING…" : "ENTER ►"}
      </ComicButton>
    </form>
  );
};
