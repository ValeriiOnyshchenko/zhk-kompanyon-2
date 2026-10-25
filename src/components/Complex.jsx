import { useEffect, useMemo, useRef, useState } from 'react'
import { units, summarize, money, asOfText, floorLabel, findUnit, ADDR } from '../lib/data.js'
import Icon from './Icon.jsx'

// Unfolded П-shape, left → right: 31 (section 1 at the end of the wing, section 2 next to 33), 33, 35 (2, 1)
const LAYOUT = [
  { b: 1, s: 1, side: 'left' },
  { b: 1, s: 2, side: 'left' },
  { b: 2, s: 1, side: 'base' },
  { b: 3, s: 2, side: 'right' },
  { b: 3, s: 1, side: 'right' },
]

// every section has the same width, measured in windows
const SECTION_COLS = 8

// what stands on the roofs: boiler house is on building 35 (9th floor), solar panels elsewhere
const ROOF = {
  '1-1': { top: 'antenna', ledge: 3 },
  '1-2': { top: 'solar', ledge: 2 },
  '2-1': { top: 'solar' },
  '3-2': { top: 'boiler', ledge: 2 },
  '3-1': { top: 'antenna', ledge: 3 },
}

// wall-mounted CCTV cameras: section key -> sides of the 1st floor where a camera hangs
const CAMERAS = { '1-1': ['left'], '2-1': ['left', 'right'], '3-1': ['right'], '3-2': ['left'] }

const CURTAINS = ['', '', '', '', '', 'sides', 'left', 'top', 'tied', 'cafe']

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}

const numKey = (n) => {
  const m = String(n).match(/\d+/)
  return m ? parseInt(m[0], 10) : 0
}

const rowWidth = (n) => `calc(${n} * var(--win-w) + ${n - 1} * var(--win-gap) + 2 * var(--wall-pad))`

function Window({ u, active, onEnter, onLeave, onClick, shop }) {
  const curtain = CURTAINS[hash(u.id) % CURTAINS.length]
  return (
    <button
      type="button"
      data-id={u.id}
      className={`win win--${u.status} ${curtain ? `cur cur--${curtain}` : ''} ${shop ? 'win--shop' : ''} ${active ? 'win--active' : ''}`}
      onMouseEnter={(e) => onEnter(u, e.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(e) => onEnter(u, e.currentTarget)}
      onBlur={onLeave}
      onClick={(e) => onClick(u, e.currentTarget)}
      aria-label={`Квартира ${u.n}, ${floorLabel(u.f)}: сплачено ${money(u.paid)}`}
    />
  )
}

function Balcony({ seed }) {
  const v = hash(seed) % 4 // 0 empty, 1 thuja, 2 pots, 3 thuja + pot
  return (
    <span className="balcony" aria-hidden="true">
      {(v === 1 || v === 3) && <i className="thuja" />}
      {(v === 2 || v === 3) && <i className="pot" />}
      {v === 2 && <i className="pot pot--2" />}
    </span>
  )
}

function Roof({ kind }) {
  if (kind === 'boiler')
    return (
      <div className="roof roof--boiler" aria-hidden="true" title="Дахова котельня">
        <span className="boiler">
          <span className="boiler__vent" />
        </span>
        <span className="chimney">
          <i className="smoke" />
          <i className="smoke smoke--2" />
          <i className="smoke smoke--3" />
        </span>
      </div>
    )
  if (kind === 'solar')
    return (
      <div className="roof" aria-hidden="true">
        <Solar n={4} />
      </div>
    )
  return (
    <div className="roof" aria-hidden="true">
      <span className="antenna" />
    </div>
  )
}

const Solar = ({ n }) => (
  <span className="solar">
    {Array.from({ length: n }, (_, i) => (
      <i key={i} />
    ))}
  </span>
)

function Door({ s }) {
  return (
    <span className="door" title={`Вхід у під’їзд ${s}`}>
      <i className="door__canopy" />
      <i className="door__lamp" />
      <i className="door__leaf" />
      <i className="door__leaf" />
    </span>
  )
}

const Parcel = () => (
  <span className="parcel" title="Поштомат">
    <i className="parcel__screen" />
  </span>
)

const Camera = ({ side, delay }) => (
  <span className={`cam cam--${side}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true" />
)

function Section({ b, s, side, activeId, handlers }) {
  const key = `${b}-${s}`
  const list = useMemo(() => units.filter((u) => u.b === b && u.s === s), [b, s])
  const floors = useMemo(() => {
    const map = new Map()
    for (const u of list) {
      if (!map.has(u.f)) map.set(u.f, [])
      map.get(u.f).push(u)
    }
    for (const arr of map.values()) arr.sort((a, c) => numKey(a.n) - numKey(c.n))
    return [...map.entries()].sort((a, c) => c[0] - a[0])
  }, [list])
  const upper = floors.filter(([f]) => f > 0)
  const ground = floors.find(([f]) => f < 0)?.[1] || []
  const cols = Math.max(...upper.map(([, arr]) => arr.length))
  const stats = summarize(list)
  const isBase = side === 'base'
  const half = Math.ceil(ground.length / 2)
  const roof = ROOF[key] || {}
  const win = (u, extra = {}) => <Window key={u.id} u={u} active={activeId === u.id} {...extra} {...handlers} />

  return (
    <div className="section-col">
      <div className={`tower tower--${side}`} style={{ width: rowWidth(SECTION_COLS) }}>
        {upper.map(([f, arr], i) => {
          const setback = arr.length < cols
          const underSetback = !setback && i > 0 && upper[i - 1][1].length < cols
          return (
            <div
              key={f}
              className={`floor ${setback ? 'floor--setback' : ''}`}
              style={setback ? { width: rowWidth(arr.length) } : undefined}
            >
              {i === 0 && <Roof kind={roof.top} />}
              {underSetback && roof.ledge && (
                <div className={`ledge ledge--${side}`} aria-hidden="true">
                  <Solar n={roof.ledge} />
                </div>
              )}
              <span className="floor__num">{f}</span>
              {isBase
                ? [
                    win(arr[0]),
                    <Balcony key="b1" seed={`${key}-${f}-1`} />,
                    win(arr[1]),
                    win(arr[2]),
                    <Balcony key="b2" seed={`${key}-${f}-2`} />,
                    win(arr[3]),
                  ]
                : arr.map((u) => win(u))}
              {f === 1 && (CAMERAS[key] || []).map((c, ci) => <Camera key={c} side={c} delay={(hash(key) % 5) + ci * 2} />)}
            </div>
          )
        })}
        <div className="floor floor--ground">
          {ground.slice(0, half).map((u) => win(u, { shop: true }))}
          <Door s={s} />
          {isBase && <Parcel />}
          {ground.slice(half).map((u) => win(u, { shop: true }))}
        </div>
      </div>
      <div className="section-col__label">
        <b>{isBase ? 'Під’їзд' : `Під’їзд ${s}`}</b>
        <span>
          {stats.full} з {stats.count} сплатили
        </span>
        <span className="muted">{money(stats.paid)}</span>
      </div>
    </div>
  )
}

// Road with a barrier gate; a car drives through when the arm goes up
function Gate({ side }) {
  return (
    <div className={`gate gate--${side}`} aria-hidden="true">
      <span className="car">
        <i className="car__cabin" />
        <i className="car__wheel" />
        <i className="car__wheel car__wheel--2" />
      </span>
      <span className="gate__post" />
      <span className="gate__arm" />
      <span className="road" />
    </div>
  )
}

const Gazebo = () => (
  <div className="yard" aria-hidden="true">
    <span className="gazebo">
      <i className="gazebo__roof" />
      <i className="gazebo__post" />
      <i className="gazebo__post gazebo__post--2" />
      <i className="gazebo__table" />
    </span>
    <span className="grill">
      <i className="smoke smoke--grill" />
      <i className="smoke smoke--grill smoke--2" />
      <i className="grill__fire" />
    </span>
    <span className="tree" />
  </div>
)

function Tooltip({ u, rect, pinned, onClose }) {
  if (!u || !rect) return null
  // position: fixed — viewport coordinates; clamp horizontally so it never leaves the screen
  const half = 120
  const left = Math.min(window.innerWidth - half - 8, Math.max(half + 8, rect.left + rect.width / 2))
  const placeBelow = rect.top < 190
  return (
    <div
      className={`tip ${placeBelow ? 'tip--below' : ''} ${pinned ? 'tip--pinned' : ''}`}
      style={{ top: placeBelow ? rect.top + rect.height + 10 : rect.top - 10, left }}
      role="status"
    >
      {pinned && (
        <button className="tip__close" onClick={onClose} aria-label="Закрити">
          ×
        </button>
      )}
      <div className="tip__title">
        Квартира <b>{u.n}</b>
      </div>
      <div className="tip__meta">
        Будинок {u.addr} · під’їзд {u.s} · {floorLabel(u.f)}
      </div>
      <div className="tip__row">
        <span>Сплачено</span>
        <b>{money(u.paid)}</b>
      </div>
      <div className="tip__row">
        <span>Залишок</span>
        <b className={u.left ? '' : 'ok'}>{u.left ? money(u.left) : 'немає'}</b>
      </div>
    </div>
  )
}

export default function Complex() {
  const [hover, setHover] = useState(null) // {u, rect}
  const [pinned, setPinned] = useState(null)
  const [addr, setAddr] = useState('31')
  const [query, setQuery] = useState('')
  const [err, setErr] = useState('')
  const sceneRef = useRef(null)

  const shown = pinned || hover
  const handlers = {
    onEnter: (u, el) => !pinned && setHover({ u, rect: el.getBoundingClientRect() }),
    onLeave: () => setHover(null),
    onClick: (u, el) => {
      const next = { u, rect: el.getBoundingClientRect() }
      setPinned((p) => (p && p.u.id === u.id ? null : next))
    },
  }

  useEffect(() => {
    if (!pinned) return
    const close = (e) => {
      if (!e.target.closest('.win') && !e.target.closest('.tip') && !e.target.closest('.finder')) setPinned(null)
    }
    const reflow = () => {
      const el = document.querySelector(`[data-id="${pinned.u.id}"]`)
      if (el) setPinned((p) => p && { ...p, rect: el.getBoundingClientRect() })
    }
    const sc = sceneRef.current
    document.addEventListener('pointerdown', close)
    window.addEventListener('resize', reflow)
    window.addEventListener('scroll', reflow, { passive: true })
    sc?.addEventListener('scroll', reflow, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', close)
      window.removeEventListener('resize', reflow)
      window.removeEventListener('scroll', reflow)
      sc?.removeEventListener('scroll', reflow)
    }
  }, [pinned?.u.id])

  useEffect(() => {
    const drop = () => setHover(null)
    window.addEventListener('scroll', drop, { passive: true })
    return () => window.removeEventListener('scroll', drop)
  }, [])

  const search = (e) => {
    e.preventDefault()
    const u = findUnit(addr, query)
    if (!u) {
      setErr('Такої квартири в цьому будинку немає.')
      return
    }
    setErr('')
    const el = document.querySelector(`[data-id="${u.id}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    setTimeout(() => setPinned({ u, rect: el.getBoundingClientRect() }), 450)
  }

  return (
    <section className="section complex" id="complex">
      <div className="container">
        <div className="section-head">
          <h2>Хто вже долучився</h2>
          <p className="section-head__lead">
            Кожне вікно — квартира. Яскраве світло означає, що внесок сплачено повністю, тьмяне — частково. Наведіть
            курсор або торкніться вікна, щоб побачити деталі.
          </p>
        </div>

        <div className="complex__tools">
          <form className="finder" onSubmit={search}>
            <Icon name="search" size={20} />
            <select value={addr} onChange={(e) => setAddr(e.target.value)} aria-label="Будинок">
              {Object.values(ADDR).map((a) => (
                <option key={a} value={a}>
                  буд. {a}
                </option>
              ))}
            </select>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setErr('')
              }}
              placeholder="№ квартири"
              aria-label="Номер квартири"
            />
            <button className="btn btn--primary btn--sm" type="submit">
              Знайти
            </button>
          </form>
          <p className="updated">
            <i /> Дані оновлено <b>{asOfText}</b>
          </p>
        </div>
        {err && <p className="finder__err">{err}</p>}
      </div>

      <div className="scene" ref={sceneRef}>
        <div className="skyline">
          <Gate side="left" />
          {[1, 2, 3].map((b) => (
            <div key={b} className={`building building--${b}`}>
              <div className="building__label">Будинок {ADDR[b]}</div>
              <div className="building__body">
                {LAYOUT.filter((l) => l.b === b).map((l) => (
                  <Section key={`${l.b}-${l.s}`} {...l} activeId={shown?.u.id} handlers={handlers} />
                ))}
              </div>
            </div>
          ))}
          <Gate side="right" />
          <Gazebo />
        </div>
      </div>

      <div className="container">
        <div className="legend">
          <span>
            <i className="lg lg--full" /> сплачено повністю
          </span>
          <span>
            <i className="lg lg--partial" /> сплачено частково
          </span>
          <span>
            <i className="lg lg--none" /> ще не сплачено
          </span>
        </div>
        <p className="privacy">
          На сайті показано лише суми, що надійшли від кожної квартири. Імена власників, телефони та інші персональні
          дані не публікуються.
        </p>
      </div>

      <Tooltip u={shown?.u} rect={shown?.rect} pinned={!!pinned} onClose={() => setPinned(null)} />
    </section>
  )
}
