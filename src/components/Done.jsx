import { DONE, BACKUP } from '../config.js'
import { BY_INITIATIVE, money } from '../lib/data.js'
import Icon from './Icon.jsx'

const STATUS = {
  done: 'Зроблено',
  progress: 'У процесі',
  plan: 'У планах',
}

export default function Done() {
  return (
    <section className="section section--alt" id="done">
      <div className="container">
        <div className="section-head">
          <h2>Що вже зроблено</h2>
        </div>

        <div className="done-grid">
          {DONE.map((d) => (
            <article key={d.title} className={`done done--${d.status}`}>
              <div className="done__top">
                <span className="done__icon">
                  <Icon name={d.icon} size={24} />
                </span>
                <span className="badge">{STATUS[d.status]}</span>
              </div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              {d.initiative && BY_INITIATIVE[d.initiative] > 0 && (
                <p className="done__sum">Зібрано {money(BY_INITIATIVE[d.initiative])}</p>
              )}
            </article>
          ))}
        </div>

        <div className="backup">
          <div className="backup__text">
            <h3>Що працює під час відключень</h3>
            <p>Від резервного живлення (інвертор і акумулятори) працюють інженерні системи будинків.</p>
            {BACKUP.backupHours && (
              <p className="backup__hours">
                Орієнтовно вистачає на <b>{BACKUP.backupHours}</b> роботи без мережі.
              </p>
            )}
          </div>
          <ul className="backup__list">
            {BACKUP.consumers.map((c) => (
              <li key={c.title}>
                <span className="backup__icon">
                  <Icon name={c.icon} size={24} />
                </span>
                <div>
                  <b>{c.title}</b>
                  <span>{c.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
