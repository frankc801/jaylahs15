"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-16 items-center justify-center rounded-2xl border border-gold-300/40 bg-emerald-950/40 shadow-luxe backdrop-blur-sm sm:h-24 sm:w-20">
        <span className="font-serif text-3xl font-bold tabular-nums text-foil sm:text-4xl">
          {display}
        </span>
        {/* glossy top highlight */}
        <span className="pointer-events-none absolute inset-x-1 top-1 h-1/3 rounded-t-xl bg-gradient-to-b from-white/10 to-transparent" />
      </div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-200/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetLocal }: { targetLocal: string }) {
  // Compute the target timestamp once on the client to avoid hydration drift.
  const [target, setTarget] = useState<number | null>(null);
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const t = new Date(targetLocal).getTime();
    setTarget(t);
    setLeft(diff(t));
    const id = setInterval(() => setLeft(diff(t)), 1000);
    return () => clearInterval(id);
  }, [targetLocal]);

  const isHere = target !== null && Date.now() >= target;

  if (isHere) {
    return (
      <p className="text-center font-serif text-2xl text-foil">
        The celebration has begun! 🎉
      </p>
    );
  }

  return (
    <div
      className="flex items-end justify-center gap-2.5 sm:gap-4"
      role="timer"
      aria-live="off"
      suppressHydrationWarning
    >
      <Unit value={left?.days ?? 0} label="Days" />
      <span className="pb-7 font-serif text-3xl text-gold-300/50">:</span>
      <Unit value={left?.hours ?? 0} label="Hours" />
      <span className="pb-7 font-serif text-3xl text-gold-300/50">:</span>
      <Unit value={left?.minutes ?? 0} label="Min" />
      <span className="pb-7 font-serif text-3xl text-gold-300/50">:</span>
      <Unit value={left?.seconds ?? 0} label="Sec" />
    </div>
  );
}
