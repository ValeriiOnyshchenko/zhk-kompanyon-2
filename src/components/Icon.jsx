// Small inline outline icon set (24×24, stroke = currentColor)
const P = {
  flame: <path d="M12 2.5c.9 3.3 6 5.4 6 11a6 6 0 0 1-12 0c0-2.9 1.5-4.8 3.2-6.2.2 2 1 3.1 2.1 3.7.3-3.5-.3-5.7.7-8.5Z" />,
  drop: <path d="M12 3.5s-5.5 6-5.5 10a5.5 5.5 0 0 0 11 0c0-4-5.5-10-5.5-10Z" />,
  lift: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M12 3v18M8.5 9.5 10 8l1.5 1.5M12.5 14.5 14 16l1.5-1.5" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.3 1 2.2h5.2c0-.9.4-1.7 1-2.2A6 6 0 0 0 12 3Z" />
    </>
  ),
  tiles: (
    <>
      <path d="M3 20h4v-4h4v-4h4V8h4V4h2" />
      <path d="M3 20h18" />
    </>
  ),
  barrier: (
    <>
      <path d="M5 21V8" />
      <circle cx="5" cy="7" r="2" />
      <path d="M7 7h14v3H7z" />
      <path d="M11 7l-2 3M15 7l-2 3M19 7l-2 3" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="7" width="16" height="10" rx="2" />
      <path d="M21 10.5v3M11.5 9 9 12.5h3L9.5 15" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8h12l4-3v10l-4-3H3z" />
      <path d="M7 12v5M4 17h6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  grill: (
    <>
      <path d="M4 10h16a8 8 0 0 1-16 0Z" />
      <path d="M8 17l-2 4M16 17l2 4M9 6c0-1 1-1.5 1-2.5M13 6c0-1 1-1.5 1-2.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12 20 3M16 7l2 2M18 5l2 2" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  telegram: <path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15ZM9 13l8-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20Z" />,
}

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  )
}
