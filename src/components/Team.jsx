import { TEAM, ADMIN, tgLink } from '../config.js'
import Icon from './Icon.jsx'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

function Person({ name, tg, role, admin }) {
  return (
    <div className={`person ${admin ? 'person--admin' : ''}`}>
      <span className="person__avatar" aria-hidden="true">
        {initials(name)}
      </span>
      <div className="person__body">
        <b>{name}</b>
        {role && <span className="person__role">{role}</span>}
        {tg && (
          <a href={tgLink(tg)} target="_blank" rel="noreferrer" className="person__tg">
            <Icon name="telegram" size={16} /> @{tg}
          </a>
        )}
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <section className="section section--alt" id="team">
      <div className="container">
        <div className="section-head">
          <h2>Ініціативна група</h2>
          <p className="section-head__lead">
            Координують спільні ініціативи та готують створення ОСББ «Компаньйон».
          </p>
        </div>
        <div className="team">
          <Person {...ADMIN} admin />
          {TEAM.map((p) => (
            <Person key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
