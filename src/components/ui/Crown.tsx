export function Crown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 44"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3dd9a" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8881f" />
        </linearGradient>
      </defs>
      <path
        d="M6 38h52l-3.6-22.5-12.2 9.3L32 8 21.8 24.8 9.6 15.5 6 38Z"
        fill="url(#crownGold)"
        stroke="#94661c"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect x="6" y="38" width="52" height="4.5" rx="2" fill="url(#crownGold)" />
      <circle cx="32" cy="6" r="3" fill="#fff4cf" stroke="#b8881f" />
      <circle cx="7" cy="14" r="2.4" fill="#fff4cf" stroke="#b8881f" />
      <circle cx="57" cy="14" r="2.4" fill="#fff4cf" stroke="#b8881f" />
      <circle cx="24" cy="34" r="1.6" fill="#fff4cf" />
      <circle cx="32" cy="34" r="1.6" fill="#fff4cf" />
      <circle cx="40" cy="34" r="1.6" fill="#fff4cf" />
    </svg>
  );
}
