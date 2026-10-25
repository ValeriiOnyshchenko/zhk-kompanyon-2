import raw from '../data/units.json'

export const FULL = raw.fullAmount
export const AS_OF = raw.asOf
export const BY_INITIATIVE = raw.byInitiative

// building index in the source -> street number
export const ADDR = { 1: '31', 2: '33', 3: '35' }

export const units = raw.units.map((u) => ({
  ...u,
  id: `${u.b}-${u.t}-${u.n}`,
  addr: ADDR[u.b],
  pct: Math.max(0, Math.min(1, u.paid / FULL)),
  left: Math.max(0, FULL - u.paid),
  status: u.paid >= FULL ? 'full' : u.paid > 0 ? 'partial' : 'none',
}))

export function summarize(list) {
  const s = { count: list.length, paid: 0, target: list.length * FULL, left: 0, full: 0, partial: 0, none: 0 }
  for (const u of list) {
    s.paid += u.paid
    s.left += u.left
    s[u.status] += 1
  }
  s.pct = s.target ? s.paid / s.target : 0
  return s
}

export const total = summarize(units)

export const byBuilding = [1, 2, 3].map((b) => ({
  b,
  addr: ADDR[b],
  ...summarize(units.filter((u) => u.b === b)),
}))

export const sectionsOf = (b) => [...new Set(units.filter((u) => u.b === b).map((u) => u.s))].sort()

export const bySection = [1, 2, 3].flatMap((b) =>
  sectionsOf(b).map((s) => ({ b, s, addr: ADDR[b], ...summarize(units.filter((u) => u.b === b && u.s === s)) })),
)

export const fmt = (n) => new Intl.NumberFormat('uk-UA').format(Math.round(n))
export const money = (n) => `${fmt(n)} грн`
export const pctText = (x) => `${(x * 100).toFixed(1).replace('.', ',')}%`

export const asOfText = new Date(AS_OF + 'T12:00:00').toLocaleDateString('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const unitLabel = (u) => `кв. ${u.n}`
export const floorLabel = (f) => (f < 0 ? 'цокольний поверх' : `${f} поверх`)

// Finds a unit by street number + current number (as in the ownership document)
export function findUnit(addr, query) {
  const q = String(query).trim().toLowerCase().replace(/^(кв\.?|№)\s*/u, '').replace(/\s+/g, '')
  if (!q) return null
  const padded = /^п\d+$/.test(q) ? 'п' + q.slice(1).padStart(3, '0') : q
  return units.find((u) => u.addr === addr && [q, padded].includes(String(u.n).toLowerCase())) || null
}
