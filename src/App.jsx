import Hero from './components/Hero.jsx'
import Complex from './components/Complex.jsx'
import Analytics from './components/Analytics.jsx'
import Done from './components/Done.jsx'
import Requisites from './components/Requisites.jsx'
import Team from './components/Team.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Complex />
        <Analytics />
        <Done />
        <Requisites />
        <Team />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
