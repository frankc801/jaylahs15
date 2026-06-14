"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/admin/auth-actions";
import { Crown } from "@/components/ui/Crown";

const initialState: LoginState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full">
      {pending ? "Verifying…" : label}
    </button>
  );
}

export function LoginForm({
  title = "Admin Access",
  subtitle = "Enter the password to continue.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-emerald-radial px-5">
      <div className="w-full max-w-sm rounded-3xl border border-gold-300/30 bg-emerald-950/40 p-8 text-center shadow-luxe backdrop-blur-sm">
        <Crown className="mx-auto mb-5 h-10 w-16" />
        <h1 className="font-serif text-2xl text-cream">{title}</h1>
        <p className="mt-2 text-sm text-gold-100/70">{subtitle}</p>

        <form action={formAction} className="mt-7 space-y-4 text-left">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-gold-100">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-gold-300/30 bg-emerald-950/50 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
              placeholder="••••••••"
            />
          </div>

          {state.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {state.error}
            </p>
          )}

          <SubmitButton label="Enter" />
        </form>
      </div>
    </div>
  );
}
