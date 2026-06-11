import { useEffect } from 'react'

// Browsers don't play animations inside SVG favicons (except Firefox), so the
// favicon is redrawn on a canvas and swapped in as a data URL each frame.
export function useAnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    const originalHref = link.href

    let raf = 0
    let last = 0

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      // ~10fps is plenty for a favicon and keeps toDataURL cost negligible
      if (t - last < 100) return
      last = t

      ctx.clearRect(0, 0, 64, 64)

      // left half dark
      ctx.beginPath()
      ctx.arc(32, 32, 17, Math.PI / 2, (3 * Math.PI) / 2)
      ctx.closePath()
      ctx.fillStyle = '#101010'
      ctx.fill()

      // right half light
      ctx.beginPath()
      ctx.arc(32, 32, 17, -Math.PI / 2, Math.PI / 2)
      ctx.closePath()
      ctx.fillStyle = '#E1E0CC'
      ctx.fill()

      // rotating 270-degree arc, one revolution every 8s
      const rotation = ((t % 8000) / 8000) * Math.PI * 2
      const start = rotation - Math.PI / 2
      ctx.beginPath()
      ctx.arc(32, 32, 26, start, start + 1.5 * Math.PI)
      ctx.strokeStyle = '#E1E0CC'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.stroke()

      link!.href = canvas.toDataURL('image/png')
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      link!.href = originalHref
    }
  }, [])
}
