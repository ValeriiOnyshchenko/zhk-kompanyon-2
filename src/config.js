// Site configuration — edit these values as needed.
// Everything here is public. Do NOT put residents' surnames, phones or e-mails here
// unless the person explicitly agreed to it.

export const SITE = {
  name: 'ЖК «Компаньйон»',
  stage: '2 черга',
  address: 'с. Сокільники, вул. Героїв Майдану, 31 / 33 / 35',
  fullAmount: 8000, // повний внесок з однієї квартири, грн
}

// ⚠️ ТЕСТОВІ РЕКВІЗИТИ — замініть на справжні перед публікацією.
export const REQUISITES = {
  recipient: 'ТЕСТОВИЙ ОТРИМУВАЧ (НЕ ПЕРЕКАЗУВАТИ)',
  edrpou: '00000000',
  iban: 'UA00 0000 0000 0000 0000 0000 0000 0',
  bank: 'ТЕСТ-БАНК',
  jarUrl: 'https://example.com/test-jar', // посилання на банку (mono / privat)
  purpose: 'Добровільний внесок, буд. __, кв. __',
}

// Резервне живлення: що підключено. backupHours — орієнтовний час роботи (null = не показувати).
export const BACKUP = {
  backupHours: null,
  consumers: [
    { icon: 'flame', title: 'Дахова котельня', text: 'тепло в квартирах' },
    { icon: 'drop', title: 'Водяні насоси', text: 'вода на всіх поверхах' },
    { icon: 'lift', title: 'Ліфти', text: 'працюють і під час відключень' },
    { icon: 'bulb', title: 'Освітлення', text: 'у під’їздах і на території ЖК' },
  ],
}

export const DONE = [
  {
    icon: 'tiles',
    title: 'Плитка в місцях загального користування',
    text: 'Облицювали сходи плиткою.',
    status: 'done',
    initiative: 'stairs',
  },
  {
    icon: 'barrier',
    title: 'Шлагбауми на в’їзді',
    text: 'В’їзд у двір за номером телефону мешканця.',
    status: 'done',
    initiative: 'barriers',
  },
  {
    icon: 'battery',
    title: 'Резервне живлення',
    text: 'Інвертор і акумулятори живлять котельню, насоси, ліфти й освітлення під час відключень.',
    status: 'done',
    initiative: 'rest',
  },
  {
    icon: 'camera',
    title: 'Відеоспостереження',
    text: 'Камери на прибудинковій території.',
    status: 'done',
  },
  {
    icon: 'people',
    title: 'Створення ОСББ «Компаньйон»',
    text: 'Ініціативна група готує установчі збори, статут і кошторис.',
    status: 'progress',
  },
  {
    icon: 'sun',
    title: 'Сонячні станції на дахах',
    text: 'Для загальнобудинкових потреб і заряджання резервного живлення.',
    status: 'plan',
  },
  {
    icon: 'grill',
    title: 'Зона барбекю',
    text: 'Облаштування зони відпочинку позаду зовнішнього паркінгу.',
    status: 'plan',
  },
]

// Ініціативна група — лише ім’я, прізвище та телеграм (за згодою).
export const TEAM = [
  { name: 'Роман Ковалишин' },
  { name: 'Андрій Пашковський' },
  { name: 'Валерій Онищенко', tg: 'ValeriiOnyshchenko' },
  { name: 'Юрій Сисун' },
  { name: 'Василь Данилів' },
  { name: 'Василина Ємець' },
  { name: 'Михайло Ковалко' },
  { name: 'Наталія Підкова', tg: 'natali_pidkova' },
  { name: 'Ірина Коркішко' },
  { name: 'Юрій Хлян', tg: 'godmode_0n' },
]

export const ADMIN = {
  name: 'Андрій',
  role: 'Адміністратор об’єкта, представник УК «Ріел Лівінг»',
  tg: 'Rico_Lviv777',
}

export const tgLink = (handle) => `https://t.me/${handle}`
