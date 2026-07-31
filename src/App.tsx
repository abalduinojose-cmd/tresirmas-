import { MotionConfig } from 'motion/react'
import { useLenis } from './hooks/useLenis'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Stats } from './components/sections/Stats'
import { Services } from './components/sections/Services'
import { Fleet } from './components/sections/Fleet'
import { Instagram } from './components/sections/Instagram'
import { Reviews } from './components/sections/Reviews'
import { Coverage } from './components/sections/Coverage'
import { FinalCTA } from './components/sections/FinalCTA'

export default function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Fleet />
        <Instagram />
        <Reviews />
        <Coverage />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
