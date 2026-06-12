import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import WhyNow from './sections/WhyNow'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { Cursor } from './components/Cursor'
import { useAnimatedFavicon } from './hooks/useAnimatedFavicon'

function Divider() {
  return (
    <div className="px-4 md:px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-6xl mx-auto" />
    </div>
  )
}

export default function App() {
  useAnimatedFavicon()

  return (
    <main className="bg-black min-h-screen [&_*]:cursor-none cursor-none">
      <Cursor />
      <ScrollProgress />
      <Hero />
      <Divider />
      <Problem />
      <Divider />
      <HowItWorks />
      <Divider />
      <WhyNow />
      <Divider />
      <Contact />
      <Footer />
    </main>
  )
}
