import { REQUISITES as R } from '../config.js'

const ROWS = [
  ['Отримувач', R.recipient],
  ['Код ЄДРПОУ', R.edrpou],
  ['IBAN', R.iban],
  ['Банк', R.bank],
  ['Призначення', R.purpose],
]

export default function Requisites() {
  return (
    <section className="section" id="pay">
      <div className="container pay">
        <div className="pay__intro">
          <h2>Зробити внесок</h2>
          <p>
            Якщо ви вже сплатили частину, знайдіть свою квартиру на схемі вище — там видно залишок.
          </p>
          <p>
            У призначенні платежу вкажіть <b>номер будинку і квартири як у документі про право власності</b>. Так ваш
            внесок швидше з’явиться на схемі.
          </p>
          <a className="btn btn--primary btn--lg" href={R.jarUrl} target="_blank" rel="noreferrer">
            Поповнити банку
          </a>
        </div>
        <dl className="card pay__card">
          {ROWS.map(([label, value]) => (
            <div key={label} className="req">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
