/**
 * Decorative branded artwork for insights categories — pure inline SVG, no
 * image assets. Gradient stops use raw hex values because SVG gradients
 * can't read Tailwind classes; they mirror the @theme tokens in
 * app/globals.css (navy-950 #071524, navy-800 #10304f, gold-500 #c6a15b,
 * gold-300 #e0c795). Compositions are abstract and balanced, so no RTL
 * mirroring is needed.
 */
export default function CategoryArt({
  variant,
  className,
}: {
  variant: "syria" | "ai";
  className?: string;
}) {
  const gradientId = `cat-art-${variant}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071524" />
          <stop offset="100%" stopColor="#10304f" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gradientId})`} />
      {variant === "syria" ? (
        <g fill="none" strokeLinecap="round">
          {/* Layered horizon arcs — terrain / market topography */}
          <path d="M-20 200 Q 100 150 200 180 T 420 160" stroke="#c6a15b" strokeWidth="2.5" opacity="0.9" />
          <path d="M-20 170 Q 120 120 220 150 T 420 125" stroke="#c6a15b" strokeWidth="1.5" opacity="0.55" />
          <path d="M-20 140 Q 140 95 240 120 T 420 95" stroke="#e0c795" strokeWidth="1.5" opacity="0.4" />
          <path d="M-20 110 Q 160 70 260 92 T 420 68" stroke="#e0c795" strokeWidth="1" opacity="0.28" />
          <path d="M-20 82 Q 180 48 280 66 T 420 45" stroke="#e0c795" strokeWidth="1" opacity="0.18" />
          <circle cx="308" cy="62" r="16" fill="#c6a15b" opacity="0.85" />
          <circle cx="308" cy="62" r="26" stroke="#e0c795" strokeWidth="1" opacity="0.35" />
        </g>
      ) : (
        <g>
          {/* Node-and-line lattice — applied AI network */}
          <g stroke="#c6a15b" strokeWidth="1" opacity="0.45" fill="none">
            <path d="M60 180 L140 60 L230 150 L320 55" />
            <path d="M60 180 L230 150 L340 190" />
            <path d="M140 60 L320 55" />
            <path d="M140 60 L340 190" />
            <path d="M60 180 L320 55" opacity="0.5" />
          </g>
          <g fill="#c6a15b">
            <circle cx="60" cy="180" r="7" />
            <circle cx="140" cy="60" r="9" />
            <circle cx="230" cy="150" r="6" />
            <circle cx="320" cy="55" r="8" />
            <circle cx="340" cy="190" r="5" />
          </g>
          <g fill="#e0c795" opacity="0.6">
            <circle cx="140" cy="60" r="16" opacity="0.25" />
            <circle cx="320" cy="55" r="15" opacity="0.2" />
            <circle cx="60" cy="180" r="13" opacity="0.2" />
          </g>
        </g>
      )}
    </svg>
  );
}
