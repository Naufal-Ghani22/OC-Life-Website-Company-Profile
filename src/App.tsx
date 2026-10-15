import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Menu, X, QrCode, ShieldCheck, Gift, Link2, Repeat, Building2, Store,
  Truck, Factory, Sprout, Leaf, Flame, Recycle, CircleCheck, Mail, MapPin, Send, Trash2, Wind, Coins, GraduationCap, Landmark, FlaskConical, Users, Utensils,
} from 'lucide-react'
import { Reveal, SectionHead, Counter, rp, num } from './ui'
import { FeatureDemo } from './demo'

const nav = [
  ['Masalah', '#masalah'],
  ['Cara Kerja', '#alur'],
  ['Fitur', '#fitur'],
  ['Subsidi Silang', '#sirkular'],
  ['Dampak', '#dampak'],
  ['Mitra', '#mitra'],
  ['Kontak', '#kontak'],
]

export default function App() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <Hero />
      <Marquee />
      <Journey />
      <Problem />
      <Flow />
      <Features />
      <Usp />
      <Circular />
      <Impact />
      <Business />
      <Partners />
      <Roadmap />
      <References />
      <Contact />
      <Footer />
    </div>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center" aria-label="OC-Life">
      <img src="/kv/logo-wide.webp" alt="OC-Life" className={`h-10 w-auto ${light ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,.35)]' : ''}`} />
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${scrolled ? 'bg-white/80 shadow-lg shadow-forest/5 ring-1 ring-forest/10 backdrop-blur-xl' : 'bg-transparent'}`}>
        <Logo light={!scrolled} />
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${scrolled ? 'text-ink/70 hover:bg-forest/5 hover:text-ink' : 'text-white/75 hover:text-white'}`}>{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#fitur" className="hidden rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest-2 sm:inline-flex">Coba Demo</a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${scrolled ? 'text-ink' : 'text-white'}`}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl bg-white p-3 shadow-xl lg:hidden">
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-mint-50">{l}</a>
          ))}
        </div>
      )}
    </header>
  )
}

const heroSlides = [
  ['pickup.webp', 'Penjemputan di kantin kampus'],
  ['hub.webp', 'Hub operasional OC-Life'],
  ['pdu.webp', 'Batch terverifikasi di biodigester'],
  ['koperasi.webp', 'Tukar voucher QR di koperasi'],
  ['farm.webp', 'Bioslurry untuk lahan petani'],
]

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 80])
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCur((n) => (n + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [cur])
  return (
    <section id="top" className="relative overflow-hidden bg-forest pb-16 pt-36 sm:pt-40">
      <div className="absolute inset-0">
        {heroSlides.map(([f, a], n) => (
          <motion.img
            key={f}
            src={`/kv/${f}`}
            alt={a}
            initial={false}
            animate={{ opacity: n === cur ? 1 : 0, scale: n === cur ? 1.06 : 1 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0">
          <Reveal>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[4.2rem]">
              Sisa <span className="text-mint">Terukur</span>,<br />Nilai <span className="text-sun">Berputar</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              OC-Life adalah platform <i>SaaS</i> pelacakan dan koordinasi limbah organik kawasan pangan. Sisa makanan kantin dan SWK dicatat, dicek mutunya, lalu disalurkan sebagai bahan baku biogas. Tenant yang memilah mendapat gas LPG gratis.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
            <a href="#fitur" className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-semibold text-forest transition hover:bg-white">Coba Prototipe <ArrowRight size={18} className="transition group-hover:translate-x-1" /></a>
            <a href="#alur" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10">Cara Kerja</a>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ['39,63%', 'sampah nasional adalah sisa makanan'],
              ['<1 mnt', 'pencatatan per wadah'],
              ['1.868 t', 'target tersalurkan 3 tahun'],
            ].map(([a, b]) => (
              <div key={a}><div className="font-heading text-2xl font-extrabold text-white sm:text-3xl">{a}</div><div className="mt-1 text-xs leading-snug text-white/55">{b}</div></div>
            ))}
          </Reveal>
        </div>
        <motion.div style={{ y }} className="relative min-w-0">
          <Reveal delay={0.2}>
            <div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
              <div className="absolute inset-[12%] rounded-full bg-mint/25 blur-3xl" />
              <img src="/img/phone-qc.webp" alt="Aplikasi petugas: Pickup & QC Log" className="absolute left-[2%] top-0 h-full w-auto -rotate-6 drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]" />
              <img src="/img/phone-reward.webp" alt="Aplikasi tenant: Circular Reward" className="absolute right-[2%] top-[8%] h-full w-auto rotate-6 drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]" />
            </div>
          </Reveal>
          <FloatCard className="left-0 top-6 sm:-left-8" delay={0.6}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf text-white"><CircleCheck size={18} /></span>
            <div><div className="text-[11px] text-ink/50">Batch OCL-007</div><div className="text-sm font-bold">6,4 kg · Murni</div></div>
          </FloatCard>
          <FloatCard className="-bottom-6 right-0 sm:right-6" delay={0.8}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun text-ink"><Gift size={18} /></span>
            <div><div className="text-[11px] text-ink/50">Warung Bu Sri</div><div className="text-sm font-bold">+13 Poin Sirkular</div></div>
          </FloatCard>
        </motion.div>
      </div>
      <div className="relative mx-auto mt-20 flex max-w-6xl gap-3 px-4">
        {heroSlides.map(([f, a], n) => (
          <button key={f} onClick={() => setCur(n)} aria-label={a} className="group flex-1 text-left">
            <span className="block h-1 overflow-hidden rounded-full bg-white/15">
              <span className={`block h-full rounded-full bg-mint transition-all duration-500 ${n === cur ? 'w-full' : 'w-0'}`} />
            </span>
            <span className={`mt-2 hidden text-xs transition sm:block ${n === cur ? 'text-white' : 'text-white/45 group-hover:text-white/70'}`}>{a}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

const journey = [
  ['pickup.webp', '01', 'Dipilah & dijemput', 'Petugas mencatat setiap wadah langsung di kios.'],
  ['hub.webp', '02', 'Dicek mutunya', 'Quality gate memisahkan batch murni dari kontaminan.'],
  ['pdu.webp', '03', 'Menjadi biogas', 'Batch terverifikasi diterima biodigester PDU.'],
  ['koperasi.webp', '04', 'Tenant dapat LPG', 'Poin sirkular ditukar voucher QR di koperasi.'],
  ['farm.webp', '05', 'Kembali ke ladang', 'Bioslurry menyuburkan lahan petani mitra.'],
]

function Journey() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Dari kios ke ladang" title={<>Satu kilogram, <span className="text-leaf">lima perhentian</span>.</>} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map(([f, n, t, d], k) => (
            <Reveal key={f} delay={k * 0.08} className={k === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <figure className="group relative h-80 overflow-hidden rounded-3xl bg-forest">
                <img src={`/kv/${f}`} alt={t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="font-heading text-xs font-bold text-mint">{n}</div>
                  <div className="mt-1 font-heading text-lg font-bold leading-tight">{t}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">{d}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FloatCard({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-black/20 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function Marquee() {
  const items = ['Collector-assisted recording', 'Quality gate', 'Green performance score', 'Circular impact ledger', 'Subsidi silang LPG 3 kg', 'Bioslurry untuk petani', 'UI GreenMetric ready', 'Offline-first PWA']
  return (
    <div className="overflow-hidden border-y border-forest/10 bg-mint py-4">
      <div className="marquee flex w-max gap-10">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-sm font-bold uppercase tracking-wider text-forest">{t}<Recycle size={16} /></span>
        ))}
      </div>
    </div>
  )
}

const stats = [
  { v: 39.63, d: 2, s: '%', l: 'Sisa makanan dari komposisi sampah nasional', src: 'KLHK, 2024', icon: Trash2 },
  { v: 1805.7, d: 2, s: ' t/hari', l: 'Timbulan sampah Kota Surabaya 2024', src: 'KLHK, 2024', icon: MapPin },
  { v: 55.48, d: 2, s: '%', l: 'Porsi sisa makanan di Surabaya, sekitar 1.000 ton per hari', src: 'KLHK, 2024', icon: Store },
  { v: 551, d: 0, p: 'Rp213–', s: ' T', l: 'Kerugian ekonomi food loss & waste per tahun', src: 'Bappenas, 2021', icon: Coins },
]

const pains = [
  { who: 'Pengelola Kawasan', icon: Building2, items: ['Wajib memilah (UU 18/2008) tapi tidak punya data pembuktian.', 'Biaya angkut kebersihan terus naik.', 'Butuh laporan Waste UI GreenMetric / ESG yang kredibel.'] },
  { who: 'Tenant', icon: Store, items: ['Pencatatan mandiri merepotkan dan cepat ditinggalkan.', 'Tidak ada insentif nyata untuk memilah.', 'Bau dan tumpukan sisa makanan di area kios.'] },
  { who: 'Operator Biodigester', icon: Factory, items: ['Pasokan bahan baku tidak konsisten.', 'Plastik dan minyak merusak proses biologis.', 'Asal-usul bahan baku tidak tertelusur.'] },
]

function Problem() {
  return (
    <section id="masalah" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="" title={<>Sampah terbesar kita adalah <span className="text-leaf">energi yang terbuang</span>.</>} desc="Sisa makanan yang tercampur sampah lain berakhir di TPA dan melepaskan metana. Teknologi pengolahannya sudah ada. Yang belum ada adalah pasokan bahan baku yang terukur, bersih, dan bisa ditelusuri." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-forest/10">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-50 text-forest-2"><s.icon size={20} /></span>
                <div className="mt-6 font-heading text-4xl font-extrabold text-forest"><Counter to={s.v} decimals={s.d} prefix={s.p} suffix={s.s} /></div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.l}</p>
                <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-ink/35">{s.src}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.who} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-forest p-7 text-white">
                <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-mint"><p.icon size={20} /></span><h3 className="text-lg font-bold">{p.who}</h3></div>
                <ul className="mt-6 space-y-3.5">
                  {p.items.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/75"><X size={16} className="mt-0.5 shrink-0 text-red-300" />{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: Store, t: 'Pemilahan di sumber', d: 'Tenant memisahkan sisa makanan murni ke wadah organik ber-QR di setiap kios.' },
  { icon: QrCode, t: 'Scan & timbang', d: 'Petugas micro-logistics memindai QR, menimbang, memotret, dan mengisi checklist < 1 menit.' },
  { icon: ShieldCheck, t: 'Quality gate', d: 'Sistem menetapkan status batch: Murni, Pilah Ulang, atau Ditolak sesuai standar biodigester.' },
  { icon: Truck, t: 'Penyaluran ke PDU', d: 'Batch murni dihimpun dan diantar ke Pusat Daur Ulang sesuai kapasitas harian.' },
  { icon: Flame, t: 'Biogas & bioslurry', d: 'PDU mengolah menjadi biogas; bioslurry dijual ke KUD/Gapoktan sebagai sumber subsidi silang.' },
  { icon: Gift, t: 'Insentif & laporan', d: 'Tenant menukar Poin Sirkular menjadi LPG 3 kg; pengelola menerima laporan dampak bulanan.' },
]

function Flow() {
  const [a, setA] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setA((x) => (x + 1) % steps.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="alur" className="relative bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead dark eyebrow="Cara kerja" title={<>Setiap kilogram punya <span className="text-mint">jejak yang utuh</span>.</>} desc="Prinsip chain of custody dari logistik rantai dingin, diterapkan pada rantai pasok limbah organik, dari kios hingga menjadi energi." />
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-2">
            {steps.map((s, i) => (
              <button key={s.t} onClick={() => setA(i)} className={`relative flex w-full items-start gap-4 overflow-hidden rounded-2xl p-4 text-left transition ${a === i ? 'bg-white/10 ring-1 ring-white/15' : 'hover:bg-white/5'}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${a === i ? 'bg-mint text-forest' : 'bg-white/5 text-white/60'}`}><s.icon size={20} /></span>
                <div>
                  <div className="flex items-center gap-2"><span className="font-mono text-xs text-mint/70">{String(i + 1).padStart(2, '0')}</span><span className={`font-heading font-bold ${a === i ? 'text-white' : 'text-white/70'}`}>{s.t}</span></div>
                  {a === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-sm leading-relaxed text-white/65">{s.d}</motion.p>}
                </div>
                {a === i && <motion.span key={a} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3.5, ease: 'linear' }} className="absolute bottom-0 left-0 h-0.5 bg-mint" />}
              </button>
            ))}
          </div>
          <Reveal>
            <div className="sticky top-28 overflow-hidden rounded-[28px] bg-cream p-3 ring-1 ring-white/10">
              <img src="/img/oc-life-main-flow-infographic-16x9.png" alt="Alur operasional OC-Life" className="w-full rounded-2xl" />
              <div className="grid grid-cols-3 gap-2 p-3 pt-4 text-center text-xs">
                {[['Alur fisik', 'Tenant → PDU → Petani'], ['Alur data', 'QR → Ledger → Laporan'], ['Alur dana', 'Bioslurry → LPG tenant']].map(([h, d]) => (
                  <div key={h} className="rounded-xl bg-white p-3 ring-1 ring-forest/10"><div className="font-heading font-bold text-forest">{h}</div><div className="mt-1 text-ink/55">{d}</div></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="fitur" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Prototipe interaktif" title={<>Lima modul, <span className="text-leaf">satu basis data batch</span>.</>} desc="Dibangun sebagai progressive web app: tanpa instalasi, tetap mencatat saat sinyal lemah, dan hak akses berbasis peran. Klik setiap modul dan coba langsung." />
        <FeatureDemo />
      </div>
    </section>
  )
}

const usps = [
  { icon: QrCode, t: 'Collector-assisted recording', d: 'Akurasi data ditanggung satu alur kerja petugas, bukan kedisiplinan puluhan tenant.' },
  { icon: ShieldCheck, t: 'Quality gate terstandar', d: 'Kelayakan batch divalidasi di lapangan sehingga biodigester hanya menerima bahan murni.' },
  { icon: Link2, t: 'Circular impact ledger', d: 'Laporan ESG & UI GreenMetric dari rekaman operasional riil yang dapat diaudit.' },
  { icon: Gift, t: 'Insentif Poin Sirkular', d: 'E-voucher LPG 3 kg mengubah pemilahan dari kewajiban menjadi kebutuhan.' },
  { icon: Repeat, t: 'Ekosistem subsidi silang', d: 'Penjualan bioslurry ke petani mendanai subsidi LPG tenant, model yang mandiri.' },
]

function Usp() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead center={false} eyebrow="Keunikan" title={<>Sisa makanan bukan sampah anonim, melainkan <span className="text-leaf">komoditas energi</span>.</>} desc="Lima Unique Selling Proposition yang tidak dimiliki jasa angkut konvensional, pengolah maggot, gerakan penyelamatan pangan, maupun aplikasi bank sampah." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {usps.map((u, i) => (
              <Reveal key={u.t} delay={i * 0.06} className={i === 4 ? 'sm:col-span-2' : ''}>
                <div className={`group h-full rounded-3xl p-7 ring-1 transition hover:-translate-y-1 ${i === 4 ? 'bg-gradient-to-br from-forest to-forest-2 text-white ring-transparent' : 'bg-cream ring-forest/10 hover:shadow-xl hover:shadow-forest/10'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 4 ? 'bg-sun text-ink' : 'bg-forest text-mint'}`}><u.icon size={22} /></span>
                    <span className={`font-mono text-sm ${i === 4 ? 'text-white/40' : 'text-ink/25'}`}>0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{u.t}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${i === 4 ? 'text-white/70' : 'text-ink/60'}`}>{u.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-16 overflow-x-auto rounded-3xl ring-1 ring-forest/10">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-forest text-white">
              <tr>{['Atribut', 'OC-Life', 'Jasa angkut', 'Pengolah organik', 'Penyelamat pangan', 'Bank sampah'].map((h, i) => <th key={h} className={`px-5 py-4 text-left font-heading font-semibold ${i === 1 ? 'bg-leaf' : ''}`}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['Pencatatan per tenant berbasis QR', '✓', '◐', '–', '–', '◐'],
                ['Quality gate sebelum pengolahan', '✓', '–', '◐', '◐', '–'],
                ['Tanpa beban input tenant', '✓', '✓', '✓', '◐', '–'],
                ['Laporan ESG tertelusur per batch', '✓', '◐', '–', '◐', '–'],
                ['Insentif e-voucher LPG', '✓', '–', '–', '–', '◐'],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-forest/10 bg-white">
                  {r.map((c, i) => <td key={i} className={`px-5 py-3.5 ${i === 0 ? 'font-medium' : 'text-center text-base'} ${i === 1 ? 'bg-mint-50 font-bold text-leaf' : 'text-ink/50'}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-3 text-xs text-ink/40">✓ fokus utama · ◐ sebagian · – bukan fokus. Disusun dari informasi publik.</p>
      </div>
    </section>
  )
}

function Circular() {
  const [tenant, setTenant] = useState(25)
  const [kgDay, setKgDay] = useState(6)
  const [pure, setPure] = useState(85)
  const kg = tenant * kgDay * 26 * (pure / 100)
  const liter = kg / 1.2
  const revenue = liter * 2000
  const lpgBudget = 1_000_000 * (kg / 3315)
  const tabung = lpgBudget / 20000
  return (
    <section id="sirkular" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Inovasi penggerak" title={<>Petani membeli pupuk, <span className="text-leaf">tenant mendapat gas</span>.</>} desc="Skema subsidi silang OC-Life: hasil penjualan bioslurry kepada KUD/Gapoktan mendanai insentif LPG 3 kg bagi tenant. Geser parameter untuk melihat perputarannya per lokasi per bulan." />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-forest/10">
              <h3 className="font-bold">Asumsi per lokasi</h3>
              <Slider label="Jumlah tenant" value={tenant} min={10} max={60} onChange={setTenant} unit="tenant" />
              <Slider label="Sisa makanan / tenant / hari" value={kgDay} min={2} max={12} onChange={setKgDay} unit="kg" />
              <Slider label="Rasio batch murni" value={pure} min={50} max={100} onChange={setPure} unit="%" />
              <p className="mt-6 rounded-2xl bg-mint-50 p-4 text-xs leading-relaxed text-ink/60">Asumsi proposal: 25 tenant · 6 kg · 26 hari · 85% murni · 1 L bioslurry per 1,2 kg · Rp2.000/L · LPG 3 kg ±Rp20.000. Angka bersifat proyeksi dan menunggu validasi pilot.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-forest p-7 text-white">
              <div className="relative grid gap-3 sm:grid-cols-2">
                <Out icon={Recycle} label="Organik murni terkumpul" v={`${num(kg)} kg`} />
                <Out icon={Sprout} label="Bioslurry dihasilkan" v={`${num(liter)} L`} />
                <Out icon={Coins} label="Pendapatan bioslurry" v={rp(revenue)} hi />
                <Out icon={Flame} label="Tabung LPG 3 kg untuk tenant" v={`±${num(tabung)} tabung`} hi />
              </div>
              <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                {['Tenant memilah', 'Bioslurry', 'KUD / Petani', 'Kas OC-Life', 'Voucher LPG'].map((x, i, a) => (
                  <span key={x} className="flex items-center gap-2"><span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15">{x}</span>{i < a.length - 1 && <ArrowRight size={14} className="text-mint" />}</span>
                ))}
                <Repeat size={16} className="text-sun" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, value, min, max, onChange, unit }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; unit: string }) {
  return (
    <label className="mt-6 block">
      <div className="flex justify-between text-sm"><span className="text-ink/60">{label}</span><span className="font-heading font-bold">{value} {unit}</span></div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} className="mt-3 w-full accent-[#22b35e]" />
    </label>
  )
}

function Out({ icon: I, label, v, hi = false }: { icon: typeof Leaf; label: string; v: string; hi?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${hi ? 'bg-mint text-forest' : 'bg-white/10 ring-1 ring-white/10'}`}>
      <I size={20} className={hi ? 'text-forest' : 'text-mint'} />
      <div className="mt-4 font-heading text-2xl font-extrabold">{v}</div>
      <div className={`mt-1 text-xs ${hi ? 'text-forest/70' : 'text-white/60'}`}>{label}</div>
    </div>
  )
}

function Impact() {
  const rows = [
    { icon: Recycle, v: 1867.8, d: 1, s: ' ton', l: 'Sisa makanan layak tersalurkan' },
    { icon: Wind, v: 1419.5, d: 1, s: ' t CO₂e', l: 'Emisi gas rumah kaca dihindari' },
    { icon: Flame, v: 186780, d: 0, s: ' m³', l: 'Potensi biogas dihasilkan' },
    { icon: Gift, v: 28640, d: 0, s: '', l: 'Setara tabung LPG 3 kg' },
  ]
  return (
    <section id="dampak" className="relative overflow-hidden bg-gradient-to-br from-forest via-forest to-forest-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead dark eyebrow="Proyeksi dampak 3 tahun" title={<>Dari kantin ke <span className="text-sun">energi terbarukan</span>.</>} desc="Dihitung konservatif dari rasio volume batch layak pada 6 → 20 → 40 lokasi aktif." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((r) => (
            <div key={r.l} className="bg-forest p-8">
              <r.icon className="text-mint" />
              <div className="mt-8 font-heading text-4xl font-extrabold text-white"><Counter to={r.v} decimals={r.d} suffix={r.s} /></div>
              <div className="mt-2 text-sm text-white/60">{r.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[['7', 'Energi Bersih'], ['11', 'Kota Berkelanjutan'], ['12', 'Konsumsi Bertanggung Jawab'], ['13', 'Aksi Iklim']].map(([n, t]) => (
            <span key={n} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15"><b className="text-sun">SDG {n}</b> · {t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Business() {
  const stake = [
    { icon: Building2, t: 'Pengelola kawasan', d: 'Langganan Rp300.000/bulan, memangkas biaya angkut dan mendapat laporan dampak siap pakai.' },
    { icon: Store, t: 'Tenant', d: 'Gratis. Cukup memilah, dapat Poin Sirkular yang ditukar gas LPG 3 kg.' },
    { icon: Factory, t: 'Operator PDU', d: 'Pasokan bahan baku murni dan terjadwal untuk produksi biogas yang stabil.' },
    { icon: Sprout, t: 'KUD / Gapoktan', d: 'Bioslurry teruji mutu Rp2.000/liter, alternatif pupuk kimia yang terjangkau.' },
  ]
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Model bisnis" title={<>Satu ekosistem, <span className="text-leaf">empat pihak diuntungkan</span>.</>} />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stake.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-forest/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint-50 text-forest-2"><s.icon size={22} /></span>
                <h3 className="mt-6 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <div className="grid gap-6 rounded-3xl bg-sun/25 p-8 ring-1 ring-sun/40 md:grid-cols-[1.2fr_2fr] md:items-center">
            <div>
              <div className="text-sm font-semibold text-forest-2">Model masuk pasar</div>
              <div className="mt-1 font-heading text-2xl font-extrabold">Audit 14 hari → Pilot → Langganan</div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[['TAM', 'Rp4,67 T'], ['SAM', 'Rp129,4 M'], ['SOM', '40 lokasi']].map(([a, b]) => (
                <div key={a} className="rounded-2xl bg-white p-4"><div className="text-xs font-semibold text-ink/50">{a}</div><div className="mt-1 font-heading text-lg font-extrabold text-forest sm:text-xl">{b}</div></div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const partnerRows = [
  [
    { icon: GraduationCap, n: 'Kantin Perguruan Tinggi', r: 'Lokasi pilot' },
    { icon: Utensils, n: 'Sentra Wisata Kuliner', r: 'Pelanggan kawasan' },
    { icon: Store, n: 'Food Court & Pujasera', r: 'Pelanggan kawasan' },
    { icon: Users, n: 'Koperasi SWK', r: 'Titik tukar LPG' },
    { icon: Factory, n: 'Pusat Daur Ulang (PDU)', r: 'Pengolah biogas' },
  ],
  [
    { icon: Sprout, n: 'KUD & Gapoktan', r: 'Pembeli bioslurry' },
    { icon: FlaskConical, n: 'Lab Teknik Lingkungan', r: 'Uji mutu' },
    { icon: Landmark, n: 'Dinas Lingkungan Hidup', r: 'Data & regulasi' },
    { icon: Truck, n: 'Armada Micro-logistics', r: 'Penjemputan' },
    { icon: Flame, n: 'Biodigester Komunal', r: 'Pengolah alternatif' },
  ],
]

const partnerLogos = [
  ['pemkot-surabaya.png', 'Pemerintah Kota Surabaya'],
  ['dlh-surabaya.jpg', 'Dinas Lingkungan Hidup Kota Surabaya'],
  ['kel-jambangan.jpg', 'Kelurahan Jambangan'],
  ['upnvjt.jpg', 'UPN "Veteran" Jawa Timur'],
  ['tl-upnvjt.jpg', 'Teknik Lingkungan UPNVJT'],
  ['yre.jpg', 'Yayasan Rumah Energi'],
  ['biru.jpg', 'Program BIRU Biogas Rumah'],
  ['swk-rungkut-kidul.jpg', 'SWK Rungkut Kidul'],
  ['royal-plaza.png', 'Food Court Royal Plaza Surabaya'],
  ['trans-icon.png', 'Trans Icon Mall Surabaya'],
  ['kelompok-tani.jpg', 'Kelompok Tani'],
]

function Partners() {
  return (
    <section id="mitra" className="overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title={<>Bergerak bersama <span className="text-leaf">mitra ekosistem</span>.</>} desc="Dari kios hingga lahan pertanian, setiap pihak memegang peran dalam satu rantai sirkular." />
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {partnerLogos.map(([f, n]) => (
            <div key={f} title={n} className="grid aspect-[3/2] w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.6rem)] lg:w-[calc(16.666%-0.625rem)] place-items-center rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/5">
              <img src={`${import.meta.env.BASE_URL}mitra/${f}`} alt={n} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
      <div className="marquee-wrap fade-x mt-14 space-y-4">
        {partnerRows.map((row, r) => (
          <div key={r} className={`${r ? 'marquee-rev' : 'marquee'} flex w-max gap-4`}>
            {[...row, ...row, ...row, ...row].map((p, i) => (
              <div key={i} className="flex w-72 shrink-0 items-center gap-4 rounded-2xl bg-cream px-5 py-4 ring-1 ring-forest/10">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest text-mint"><p.icon size={22} /></span>
                <div className="min-w-0">
                  <div className="truncate font-heading font-bold">{p.n}</div>
                  <div className="text-xs text-ink/50">{p.r}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-center text-xs text-ink/40">Seluruh pihak berstatus calon mitra hingga tercapai kesepakatan tingkat layanan (SLA) tertulis.</p>
    </section>
  )
}

function Roadmap() {
  const phases = [
    { p: 'Bulan 1–3', t: 'Persiapan & MVP', d: 'Pengembangan PWA, pengadaan armada, audit 14 hari, SOP quality gate.', k: '1 PDU mitra siap' },
    { p: 'Bulan 4–6', t: 'Pilot', d: '3 lokasi Surabaya, uji skema subsidi LPG, laporan dampak pertama.', k: '≥80% batch murni · 2 LoI' },
    { p: 'Bulan 7–24', t: 'Komersialisasi', d: 'Konversi pilot ke langganan, ekspansi kantin kampus & SWK.', k: '20 lokasi aktif' },
    { p: 'Bulan 25–36', t: 'Skala', d: 'Penetrasi Surabaya Raya dan persiapan white-label logistik.', k: '40 lokasi · 1.221 t/tahun' },
  ]
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Peta jalan" title={<>Bertahap, terukur, <span className="text-leaf">siap diskalakan</span>.</>} />
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-leaf via-mint to-sun md:block" />
          {phases.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.1}>
              <div className="relative">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-forest font-heading font-bold text-mint ring-8 ring-white">{i + 1}</span>
                <div className="mt-5 font-mono text-xs text-leaf">{x.p}</div>
                <h3 className="mt-1 text-xl font-bold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{x.d}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1.5 text-xs font-semibold text-forest-2"><CircleCheck size={13} />{x.k}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function References() {
  const refs = [
    'Kementerian Lingkungan Hidup dan Kehutanan. (2024). Sistem Informasi Pengelolaan Sampah Nasional (SIPSN).',
    'Bappenas. (2021). Kajian Food Loss and Waste di Indonesia.',
    'International Energy Agency. (2020). Outlook for biogas and biomethane.',
    'Kementerian ESDM. (2021). Program Biogas Rumah (BIRU).',
    'U.S. Environmental Protection Agency. (2023). Quantifying methane emissions from landfilled food waste.',
    'UI GreenMetric. (2024). Guideline UI GreenMetric World University Rankings.',
    'Undang-Undang Republik Indonesia No. 18 Tahun 2008 tentang Pengelolaan Sampah.',
    'Otoritas Jasa Keuangan. (2017). POJK No. 51/POJK.03/2017 tentang Keuangan Berkelanjutan.',
  ]
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <details className="group rounded-3xl bg-white p-7 ring-1 ring-forest/10">
            <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-lg font-bold">Referensi data <ArrowUpRight className="transition group-open:rotate-90" /></summary>
            <ol className="mt-5 grid gap-2 text-sm text-ink/60 md:grid-cols-2">
              {refs.map((r) => <li key={r} className="rounded-xl bg-cream p-3">{r}</li>)}
            </ol>
          </details>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section id="kontak" className="pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative grid overflow-hidden rounded-[36px] bg-forest p-8 sm:p-14 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">Jadikan kawasan Anda lokasi <span className="text-mint">pilot</span> berikutnya.</h2>
            <p className="mt-5 text-white/65">Audit limbah 14 hari tanpa biaya: kami ukur volume, kontaminasi, dan potensi penghematan kawasan Anda.</p>
            <div className="mt-8 space-y-3 text-sm text-white/75">
              <div className="flex items-center gap-3"><Mail size={16} className="text-mint" /> halo@oc-life.id</div>
              <div className="flex items-center gap-3"><MapPin size={16} className="text-mint" /> Surabaya, Jawa Timur</div>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="relative mt-10 space-y-3 rounded-3xl bg-white p-6 lg:mt-0">
            {sent ? (
              <div className="grid min-h-[300px] place-items-center text-center">
                <div><CircleCheck size={44} className="mx-auto text-leaf" /><div className="mt-4 font-heading text-xl font-bold">Permintaan terkirim (simulasi)</div><p className="mt-2 text-sm text-ink/55">Ini tampilan demo, data tidak dikirim atau disimpan.</p><button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-leaf">Kirim lagi</button></div>
              </div>
            ) : (
              <>
                {['Nama pengelola', 'Nama kawasan (kantin / SWK / food court)', 'Email'].map((p) => (
                  <input key={p} required placeholder={p} className="w-full rounded-xl bg-cream px-4 py-3.5 text-sm outline-none ring-1 ring-forest/10 focus:ring-2 focus:ring-leaf" />
                ))}
                <select className="w-full rounded-xl bg-cream px-4 py-3.5 text-sm text-ink/70 outline-none ring-1 ring-forest/10"><option>Jumlah tenant: 15–25</option><option>26–40</option><option>&gt; 40</option></select>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 font-semibold text-white transition hover:bg-forest-2">Ajukan audit gratis <Send size={16} /></button>
                <p className="text-center text-[11px] text-ink/40">Tampilan demo, pesan tidak dikirim.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink/55"><b>Organic Circular to Life</b>, ekosistem pelacakan limbah organik kawasan pangan menuju ekonomi sirkular yang terverifikasi.</p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2.5"><div className="font-heading font-bold">Jelajahi</div>{nav.slice(0, 4).map(([l, h]) => <a key={h} href={h} className="block text-ink/55 hover:text-leaf">{l}</a>)}</div>
          <div className="space-y-2.5"><div className="font-heading font-bold">Kompetisi</div><div className="text-ink/55">BPC IDEANATION 2026</div><div className="text-ink/55">Tim [Nama Tim]</div><div className="text-ink/55">[Perguruan Tinggi]</div></div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 text-xs text-ink/40">© 2026 OC-Life. Prototipe untuk keperluan kompetisi, data pada mockup adalah simulasi.</div>
    </footer>
  )
}
