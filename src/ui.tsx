import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
        dark ? 'bg-white/10 text-mint ring-1 ring-white/15' : 'bg-forest/5 text-forest-2 ring-1 ring-forest/10'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-mint' : 'bg-leaf'}`} />
      {children}
    </span>
  )
}

export function SectionHead({ title, desc, dark = false, center = true }: { eyebrow?: string; title: ReactNode; desc?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <h2 className={`text-3xl font-extrabold leading-[1.1] sm:text-5xl ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {desc && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-ink/65'}`}>{desc}</p>}
    </Reveal>
  )
}

export function Counter({ to, decimals = 0, prefix = '', suffix = '' }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setVal(v) })
    return () => c.stop()
  }, [inView, to, mv])
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export const rp = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID')
export const num = (n: number, d = 0) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d })
