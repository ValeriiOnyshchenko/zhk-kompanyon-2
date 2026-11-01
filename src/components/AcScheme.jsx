// Draft scheme of outdoor AC basket positions, drawn from the marked-up facade drawings and floor plans.
// Side (elevation) view: one column = one window (or a basket stack), one row = one floor.
// Buildings 31 and 35 step down 9 → 8 → 7 floors towards the end of the wing.

const W = 20 // window width
const H = 24 // floor height
const GAP = 5
const BASE = 16 // ground (цоколь) strip
const SIZES = { w: W, l: W, s: 12, ac: 11, '|': 3 }

// helpers to describe a facade: seg('w ac w', 7) -> columns of height 7
const seg = (tokens, h) => tokens.split(' ').map((t) => ({ t, h }))

// building 31: section 1 (end of the wing, 7 floors + 8th over part of it), section 2 (8 floors + 9th next to 33)
// outer facade = flats 25–28 / 72–75 on the 4th-floor plan, courtyard = flats 24, 23, 22 / 71, 70, 69, 76 + stairs
const B31_OUTER = [
  ...seg('w w w ac w w ac w w', 7),
  ...seg('w ac w', 8),
  ...seg('|', 8),
  ...seg('s ac w w w ac w w', 8),
  ...seg('w ac w w w ac w', 9),
]
const B31_INNER = [
  ...seg('w ac w w ac w w ac w', 7),
  ...seg('w s w', 8),
  ...seg('|', 8),
  ...seg('ac w w w ac w w w', 8),
  ...seg('w s w ac w w w', 9),
]

// building 33: 9 floors, one entrance
const B33_INNER = seg('l l ac w w s w w ac l l', 9)
const B33_OUTER = seg('w w ac w s w ac w w', 9)

// building 35 mirrors 31 (section 2 next to 33 on the left)
const mirror = (cols) => [...cols].reverse()

const BUILDINGS = [
  {
    title: 'Будинок 31',
    facades: [
      { title: 'Фасад у двір', cols: B31_INNER, doors: true },
      { title: 'Зовнішній фасад', cols: B31_OUTER },
    ],
  },
  {
    title: 'Будинок 33',
    facades: [
      { title: 'Фасад у двір', cols: B33_INNER, doors: true },
      { title: 'Зовнішній фасад', cols: B33_OUTER },
    ],
  },
  {
    title: 'Будинок 35',
    note: 'Показано дзеркально до будинку 31.',
    facades: [
      { title: 'Фасад у двір', cols: mirror(B31_INNER), doors: true },
      { title: 'Зовнішній фасад', cols: mirror(B31_OUTER) },
    ],
  },
]

function Facade({ title, cols, doors }) {
  const maxH = Math.max(...cols.map((c) => c.h))
  const width = cols.reduce((s, c) => s + SIZES[c.t] + GAP, GAP)
  const height = maxH * H + BASE + 6
  const groundY = height - BASE
  let x = GAP
  const placed = cols.map((c, i) => {
    const prev = cols[i - 1]
    const next = cols[i + 1]
    const item = { ...c, x, w: SIZES[c.t], prevH: prev?.h, nextH: next?.h }
    x += SIZES[c.t] + GAP
    return item
  })

  return (
    <figure className="ac-fig">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={title}>
        {/* walls: one rect per column so the roof steps follow the floor count */}
        {placed.map((c, i) => (
          <rect
            key={`wall-${i}`}
            x={i === 0 ? 0 : c.x - GAP / 2}
            y={groundY - c.h * H - 4}
            width={c.w + GAP + (i === 0 ? GAP / 2 : 0) + (i === placed.length - 1 ? GAP / 2 : 0)}
            height={c.h * H + 4}
            className="ac-wall"
          />
        ))}
        {placed.map((c, i) =>
          Array.from({ length: c.h }, (_, f) => {
            const y = groundY - (f + 1) * H
            const key = `${i}-${f}`
            if (c.t === '|') return <rect key={key} x={c.x} y={y} width={c.w} height={H} className="ac-joint" />
            if (c.t === 'ac')
              return (
                <g key={key} className="ac-unit">
                  <rect x={c.x} y={y + 10} width={c.w} height={9} rx="1.5" />
                  <circle cx={c.x + c.w / 2} cy={y + 14.5} r="2.6" />
                </g>
              )
            if (c.t === 's') return <rect key={key} x={c.x} y={y + 7} width={c.w} height={7} rx="1" className="ac-win ac-win--stair" />
            return <rect key={key} x={c.x} y={y + 3} width={c.w} height={16} rx="1.5" className={`ac-win ${c.t === 'l' ? 'ac-win--loggia' : ''}`} />
          }),
        )}
        <rect x="0" y={groundY} width={width} height={BASE} className="ac-base" />
        {doors &&
          placed
            .filter((c) => c.t === 's')
            .map((c, i) => <rect key={`door-${i}`} x={c.x - 3} y={groundY + 2} width={c.w + 6} height={BASE - 2} className="ac-door" />)}
      </svg>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default function AcScheme() {
  return (
    <div className="ac">
      {BUILDINGS.map((b) => (
        <div key={b.title} className="ac__building">
          <h4>{b.title}</h4>
          {b.note && <p className="ac__note">{b.note}</p>}
          <div className="ac__figs">
            {b.facades.map((f) => (
              <Facade key={f.title} {...f} />
            ))}
          </div>
        </div>
      ))}
      <div className="ac__legend">
        <span>
          <i className="ac-key ac-key--unit" /> місце для корзини кондиціонера
        </span>
        <span>
          <i className="ac-key ac-key--loggia" /> лоджія
        </span>
        <span>
          <i className="ac-key ac-key--door" /> вхід у під’їзд
        </span>
      </div>
    </div>
  )
}
