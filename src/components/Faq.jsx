import { useState } from 'react'
import { ADMIN, BACKUP, tgLink, TEAM } from '../config.js'
import Icon from './Icon.jsx'

const barrierContact = TEAM.find((p) => p.tg === 'godmode_0n')

const tg = (handle, text) => (
  <a href={tgLink(handle)} target="_blank" rel="noreferrer">
    {text || '@' + handle}
  </a>
)

const ITEMS = [
  {
    q: 'Як отримати доступ до шлагбаумів?',
    a: (
      <>
        Шлагбауми відкриваються за номером телефону. Напишіть Юрію Хляну
        {barrierContact && <> ({tg(barrierContact.tg)})</>}: вкажіть будинок, квартиру й номер телефону, і його додадуть
        до бази.
      </>
    ),
  },
  {
    q: 'Як зробити додатковий ключ від під’їзду?',
    a: (
      <>
        Зверніться до компанії <b>«Техно Захід»</b>, яка обслуговує домофони. Вони зроблять і запрограмують новий ключ.
      </>
    ),
  },
  {
    q: 'Як отримати ключ від сміттєвого майданчика?',
    a: (
      <>
        Зверніться до адміністратора об’єкта {ADMIN.name} ({tg(ADMIN.tg)}), представника УК «Ріел Лівінг».
      </>
    ),
  },
  {
    q: 'Що працює від резервного живлення і на скільки його вистачає?',
    a: (
      <>
        Перелік систем — у блоці «Що працює під час відключень» вище.{' '}
        {BACKUP.backupHours
          ? `Повного заряду орієнтовно вистачає на ${BACKUP.backupHours}.`
          : 'Скільки вистачає заряду, залежить від навантаження: найбільше енергії споживають котельня взимку та ліфти.'}
      </>
    ),
  },
  {
    q: 'Що буде з моїм внеском після створення ОСББ?',
    a: (
      <>
        Проєкт рішення установчих зборів пропонує зарахувати добровільні внески, сплачені до створення ОСББ, у рахунок
        цільового внеску з коефіцієнтом 1,5. Остаточне рішення ухвалять співвласники на установчих зборах.
      </>
    ),
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="section-head">
          <h2>Часті питання</h2>
        </div>
        <div className="faq__list">
          {ITEMS.map((it, i) => (
            <div key={it.q} className={`faq__item ${open === i ? 'faq__item--open' : ''}`}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <Icon name="chevron" size={22} />
              </button>
              <div className="faq__a">
                <div>
                  <p>{it.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
