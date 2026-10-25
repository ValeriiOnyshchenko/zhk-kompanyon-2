import { SITE } from '../config.js'
import { total, money, fmt, pctText, FULL } from '../lib/data.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <p className="hero__place">
          <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#16223d" />
            <path d="M14 30 32 15l18 15v19H14z" fill="#2e3c5e" stroke="#eef2fb" strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="26" y="31" width="12" height="12" rx="1.5" fill="#ffc65c" />
          </svg>
          {SITE.name}, {SITE.stage} · {SITE.address}
        </p>
        <h1>Разом дбаємо про наш дім</h1>
        <p className="hero__lead">
          Мешканці спільно фінансують покращення для всього ЖК. Повний внесок з квартири становить {money(FULL)}.
        </p>

        <div className="hero__sum">
          <strong>{fmt(total.paid)}</strong>
          <span className="hero__unit">грн</span>
          <span className="hero__of">з {money(total.target)}</span>
        </div>

        <div className="progress progress--lg" role="progressbar" aria-valuenow={Math.round(total.pct * 100)} aria-valuemin="0" aria-valuemax="100">
          <div className="progress__bar" style={{ width: `${Math.min(100, total.pct * 100)}%` }} />
        </div>
        <div className="hero__meta">
          <span>
            Зібрано <b>{pctText(total.pct)}</b> · долучилися {total.full + total.partial} з {total.count} квартир
          </span>
          <span>
            Очікується ще <b>{money(total.left)}</b>
          </span>
        </div>

        <div className="hero__actions">
          <a href="#pay" className="btn btn--primary btn--lg">
            Зробити внесок
          </a>
        </div>
      </div>
    </section>
  )
}
