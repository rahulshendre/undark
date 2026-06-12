import { AnimatedLogoLockup } from '../components/AnimatedLogo'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <a href="#" aria-label="Undark home">
          <AnimatedLogoLockup height={22} />
        </a>

        <p className="text-gray-600 text-[11px]">
          © {new Date().getFullYear()} Undark. All rights reserved.
        </p>

        <a
          href="mailto:hello@undark.in"
          className="text-gray-500 hover:text-primary/80 text-xs transition-colors duration-200"
        >
          hello@undark.in
        </a>
      </div>
    </footer>
  )
}
