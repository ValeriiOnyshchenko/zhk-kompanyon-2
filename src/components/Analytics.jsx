import { total, byBuilding, bySection, money, fmt, pctText } from '../lib/data.js'

function Stack({ s }) {
  const w = (n) => `${(n / s.count) * 100}%`
  return (
    <div className="stack" title={`Повністю: ${s.full}, частково: ${s.partial}, ще ні: ${s.none}`}>
      <span className="stack__full" style={{ width: w(s.full) }} />
      <span className="stack__partial" style={{ width: w(s.partial) }} />
    </div>
  )
}

function Donut({ s, size = 150 }) {
  const r = 60
  const c = 2 * Math.PI * r
  const parts = [
    ['full', s.full],
    ['partial', s.partial],
    ['none', s.none],
  ]
  let offset = 0
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} className="donut" role="img" aria-label="Розподіл квартир за статусом внеску">
      {parts.map(([k, n]) => {
        const len = (n / s.count) * c
        const el = (
          <circle
            key={k}
            className={`donut__${k}`}
            cx="80"
            cy="80"
            r={r}
            fill="none"
            strokeWidth="16"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 80 80)"
          />
        )
        offset += len
        return el
      })}
      <text x="80" y="78" textAnchor="middle" className="donut__big">
        {Math.round(((s.full + s.partial) / s.count) * 100)}%
      </text>
      <text x="80" y="98" textAnchor="middle" className="donut__small">
        долучилися
      </text>
    </svg>
  )
}

export default function Analytics() {
  return (
    <section className="section" id="stats">
      <div className="container">
        <div className="section-head">
          <h2>Цифри збору</h2>
        </div>

        <div className="kpis">
          <div className="kpi">
            <span>Зібрано</span>
            <b>{money(total.paid)}</b>
            <small>{pctText(total.pct)} від цілі</small>
          </div>
          <div className="kpi">
            <span>Очікується ще</span>
            <b>{money(total.left)}</b>
            <small>сума залишків</small>
          </div>
          <div className="kpi kpi--full">
            <span>Сплатили повністю</span>
            <b>{total.full}</b>
            <small>з {total.count} квартир</small>
          </div>
          <div className="kpi kpi--partial">
            <span>Сплатили частково</span>
            <b>{total.partial}</b>
            <small>можна доплатити</small>
          </div>
          <div className="kpi kpi--none">
            <span>Ще не долучилися</span>
            <b>{total.none}</b>
            <small>з {total.count} квартир</small>
          </div>
        </div>

        <div className="stats-grid">
          <div className="card">
            <h3>По будинках</h3>
            <div className="bars">
              {byBuilding.map((b) => (
                <div key={b.b} className="bar-row">
                  <div className="bar-row__head">
                    <b>Будинок {b.addr}</b>
                    <span>
                      {money(b.paid)} <span className="muted">з {money(b.target)}</span>
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress__bar" style={{ width: `${Math.min(100, b.pct * 100)}%` }} />
                  </div>
                  <div className="bar-row__foot">
                    <span>{pctText(b.pct)}</span>
                    <span>
                      повністю {b.full} · частково {b.partial} · ще ні {b.none}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card--center">
            <h3>Статус квартир</h3>
            <Donut s={total} />
            <div className="legend legend--compact">
              <span>
                <i className="dot dot--full" /> повністю — {total.full}
              </span>
              <span>
                <i className="dot dot--partial" /> частково — {total.partial}
              </span>
              <span>
                <i className="dot dot--none" /> ще ні — {total.none}
              </span>
            </div>
          </div>

          <div className="card card--wide">
            <h3>По під’їздах</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Під’їзд</th>
                  <th>Статус</th>
                  <th className="num">Сплатили</th>
                  <th className="num">Зібрано, грн</th>
                  <th className="num">Залишок, грн</th>
                </tr>
              </thead>
              <tbody>
                {bySection.map((s) => (
                  <tr key={`${s.b}-${s.s}`}>
                    <td>
                      буд. {s.addr}
                      {s.b !== 2 && <>, п. {s.s}</>}
                    </td>
                    <td>
                      <Stack s={s} />
                    </td>
                    <td className="num">
                      {s.full} з {s.count}
                    </td>
                    <td className="num">{fmt(s.paid)}</td>
                    <td className="num muted">{fmt(s.left)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
