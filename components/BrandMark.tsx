export default function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill="#0a1e33" />
      <path
        d="M13 30c0 12 8.5 19 19 19s19-7 19-19"
        stroke="#c6a15b"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="19" r="3.2" fill="#c6a15b" />
      <circle cx="36" cy="19" r="3.2" fill="#c6a15b" />
    </svg>
  );
}
