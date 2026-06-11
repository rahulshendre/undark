import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import WhyNow from './sections/WhyNow'
import Contact from './sections/Contact'
import { ScrollProgress } from './components/ScrollProgress'
import { useAnimatedFavicon } from './hooks/useAnimatedFavicon'

export default function App() {
  useAnimatedFavicon()

  return (
    <main className="bg-black min-h-screen">
      <ScrollProgress />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyNow />
      <Contact />
    </main>
  )
}
