import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  ScanLine, LayoutDashboard, Gift, Factory, Link2, Scale, Camera, Check, X, AlertTriangle,
  QrCode, Flame, Leaf, TrendingUp, Truck, CircleCheck,
} from 'lucide-react'
import { num } from './ui'

const modules = [
  { id: 'pickup', icon: ScanLine, name: 'Pickup & QC Log', who: 'Petugas pickup', desc: 'Scan QR wadah, timbang, foto, checklist mutu, kurang dari 1 menit per wadah.' },
  { id: 'dashboard', icon: LayoutDashboard, name: 'Manager Dashboard', who: 'Pengelola kawasan', desc: 'Pantau volume per tenant, kontaminasi, poin, dan kapasitas PDU secara real-time.' },
  { id: 'reward', icon: Gift, name: 'Circular Reward', who: 'Tenant & Koperasi SWK', desc: 'Poin Sirkular ditukar menjadi e-voucher QR gas LPG 3 kg di Koperasi SWK.' },
  { id: 'operator', icon: Factory, name: 'Operator Portal', who: 'Operator PDU', desc: 'Terima batch murni, konfirmasi, dan catat keluaran biogas & bioslurry.' },
  { id: 'ledger', icon: Link2, name: 'Circular Impact Ledger', who: 'Pengelola & auditor', desc: 'Telusuri setiap batch ber-ID unik dari tenant hingga menjadi energi.' },
] as const

type ModId = (typeof modules)[number]['id']

export function FeatureDemo() {
  const [active, setActive] = useState<ModId>('pickup')
  const m = modules.find((x) => x.id === active)!
  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
        {modules.map((x) => {
          const on = x.id === active
          return (
            <button
              key={x.id}
              onClick={() => setActive(x.id)}
              className={`group relative min-w-[240px] rounded-2xl p-5 text-left transition lg:min-w-0 ${
                on ? 'bg-forest text-white shadow-xl shadow-forest/20' : 'bg-white text-ink ring-1 ring-forest/10 hover:ring-forest/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${on ? 'bg-mint text-forest' : 'bg-mint-50 text-forest-2'}`}>
                  <x.icon size={20} />
                </span>
                <div>
                  <div className="font-heading font-bold">{x.name}</div>
                  <div className={`text-xs ${on ? 'text-white/60' : 'text-ink/50'}`}>{x.who}</div>
                </div>
              </div>
              {on && <p className="mt-3 text-sm leading-relaxed text-white/75">{x.desc}</p>}
            </button>
          )
        })}
      </div>

      <div className="relative min-h-[540px] overflow-hidden rounded-[28px] bg-gradient-to-br from-forest to-forest-2 p-4 sm:p-8">
        <div className="mb-4 flex items-center justify-between text-xs text-white/60">
          <span>{m.name}</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1">Data simulasi</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            {active === 'pickup' && <PickupMock />}
            {active === 'dashboard' && <DashboardMock />}
            {active === 'reward' && <RewardMock />}
            {active === 'operator' && <OperatorMock />}
            {active === 'ledger' && <LedgerMock />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[38px] bg-ink p-2.5 shadow-2xl ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[30px] bg-cream">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <div className="px-4 pb-5 pt-10">{children}</div>
      </div>
    </div>
  )
}

const checks = [
  { k: 'anorganik', label: 'Ada plastik / kemasan', severe: true },
  { k: 'perusak', label: 'Tulang besar / material keras', severe: true },
  { k: 'cair', label: 'Kadar cairan berlebih', severe: false },
  { k: 'minyak', label: 'Minyak berlebih', severe: false },
]

function PickupMock() {
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const [kg, setKg] = useState(6.4)
  const [saved, setSaved] = useState(false)
  const status = useMemo(() => {
    const on = checks.filter((c) => flags[c.k])
    if (on.some((c) => c.severe)) return 'Ditolak'
    if (on.length) return 'Pilah Ulang'
    return 'Murni'
  }, [flags])
  const tone = status === 'Murni' ? 'bg-leaf text-white' : status === 'Pilah Ulang' ? 'bg-sun text-ink' : 'bg-red-500 text-white'
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <Phone>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50">Kios #07 · SWK Contoh</div>
            <div className="font-heading text-base font-bold">Warung Bu Sri</div>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-mint"><QrCode size={18} /></span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-forest/10">
          <div className="flex items-center gap-2 text-xs text-ink/60"><Scale size={14} /> Berat dari timbangan</div>
          <div className="mt-1 flex items-end justify-between">
            <span className="font-heading text-3xl font-extrabold">{num(kg, 1)}<span className="text-base font-semibold text-ink/50"> kg</span></span>
            <button onClick={() => { setKg(+(3 + Math.random() * 6).toFixed(1)); setSaved(false) }} className="rounded-lg bg-mint-50 px-2.5 py-1.5 text-xs font-semibold text-forest-2">Timbang ulang</button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white p-3 text-xs ring-1 ring-forest/10">
          <Camera size={14} className="text-forest-2" /> Foto bukti tersimpan <Check size={14} className="ml-auto text-leaf" />
        </div>
        <div className="mt-3 space-y-2">
          {checks.map((c) => (
            <label key={c.k} className="flex cursor-pointer items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-xs ring-1 ring-forest/10">
              <input type="checkbox" className="h-4 w-4 accent-red-500" checked={!!flags[c.k]} onChange={(e) => { setFlags({ ...flags, [c.k]: e.target.checked }); setSaved(false) }} />
              {c.label}
            </label>
          ))}
        </div>
        <button onClick={() => setSaved(true)} className="mt-4 w-full rounded-xl bg-forest py-3 text-sm font-semibold text-white">Simpan batch</button>
      </Phone>
      <div className="text-white">
        <div className="text-sm text-white/60">Hasil quality gate otomatis</div>
        <motion.div key={status} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`mt-3 inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-heading text-2xl font-extrabold ${tone}`}>
          {status === 'Murni' ? <CircleCheck /> : status === 'Pilah Ulang' ? <AlertTriangle /> : <X />} {status}
        </motion.div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
          Coba centang kontaminan di ponsel. Plastik atau material keras langsung <b className="text-white">Ditolak</b> untuk melindungi biodigester; cairan/minyak berlebih menjadi <b className="text-white">Pilah Ulang</b>.
        </p>
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-2xl bg-white/10 p-4 text-sm ring-1 ring-white/15">
              <div className="font-mono text-mint">OCL-SWK01-20261010-007</div>
              <div className="mt-1 text-white/70">{num(kg, 1)} kg · {status} · tercatat dalam 42 detik</div>
              {status === 'Murni' && <div className="mt-2 text-sun">+{Math.round(kg * 2)} Poin Sirkular untuk tenant</div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const tenants = [
  { n: 'Warung Bu Sri', kg: 168, p: 96, s: 94 },
  { n: 'Depot Cak Mat', kg: 151, p: 91, s: 89 },
  { n: 'Soto Lamongan 88', kg: 142, p: 88, s: 86 },
  { n: 'Nasi Pecel Mbok Yah', kg: 133, p: 79, s: 77 },
  { n: 'Bakso Pak Kumis', kg: 120, p: 64, s: 62 },
]
const trend = [62, 70, 66, 74, 80, 78, 85, 83, 88, 90, 86, 92, 95, 91]

function DashboardMock() {
  return (
    <div className="rounded-2xl bg-cream p-4 shadow-2xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs text-ink/50">Oktober 2026 · SWK Contoh (25 tenant)</div>
          <div className="font-heading text-lg font-bold">Ringkasan Kawasan</div>
        </div>
        <button className="rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-white">Unduh Laporan Dampak</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { l: 'Terkumpul', v: '3.312 kg', i: Truck },
          { l: 'Batch murni', v: '86,4%', i: CircleCheck },
          { l: 'CO₂e dihindari', v: '2,5 t', i: Leaf },
          { l: 'Biogas', v: '331 m³', i: Flame },
        ].map((k) => (
          <div key={k.l} className="rounded-xl bg-white p-3 ring-1 ring-forest/10">
            <k.i size={16} className="text-leaf" />
            <div className="mt-2 font-heading text-xl font-extrabold">{k.v}</div>
            <div className="text-[11px] text-ink/50">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl bg-white p-4 ring-1 ring-forest/10">
          <div className="flex items-center gap-2 text-xs font-semibold"><TrendingUp size={14} className="text-leaf" /> Rasio murni 14 hari</div>
          <div className="mt-4 flex h-32 items-end gap-1.5">
            {trend.map((t, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${t}%` }} transition={{ delay: i * 0.04, duration: 0.5 }} className="flex-1 rounded-t-md bg-gradient-to-t from-forest-2 to-leaf" />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-forest/10">
          <div className="text-xs font-semibold">Green Performance Score</div>
          <div className="mt-3 space-y-2.5">
            {tenants.map((t) => (
              <div key={t.n}>
                <div className="flex justify-between text-[11px]"><span>{t.n}</span><span className="font-semibold">{t.s}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-mint-50"><motion.div initial={{ width: 0 }} animate={{ width: `${t.s}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${t.s > 80 ? 'bg-leaf' : 'bg-sun'}`} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RewardMock() {
  const [points, setPoints] = useState(1240)
  const [voucher, setVoucher] = useState<string | null>(null)
  const [redeemed, setRedeemed] = useState(false)
  const cost = 1000
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <Phone>
        <div className="rounded-2xl bg-gradient-to-br from-forest to-forest-2 p-4 text-white">
          <div className="text-xs text-white/60">Poin Sirkular · Warung Bu Sri</div>
          <div className="mt-1 font-heading text-3xl font-extrabold">{num(points)}</div>
          <div className="mt-3 h-2 rounded-full bg-white/15"><div className="h-full rounded-full bg-sun" style={{ width: `${Math.min(100, (points / cost) * 100)}%` }} /></div>
          <div className="mt-1.5 text-[11px] text-white/60">{points >= cost ? 'Siap ditukar 1 tabung LPG 3 kg' : `${cost - points} poin lagi menuju 1 tabung`}</div>
        </div>
        <div className="mt-3 rounded-2xl bg-white p-3 text-xs ring-1 ring-forest/10">
          <div className="font-semibold">Skor hijau 94</div>
          {[['Rasio murni', 50, 96], ['Kebersihan', 30, 92], ['Kepatuhan jadwal', 20, 90]].map(([l, w, v]) => (
            <div key={l as string} className="mt-2 flex items-center justify-between text-ink/60"><span>{l} ({w}%)</span><span className="font-semibold text-ink">{v}</span></div>
          ))}
        </div>
        {!voucher ? (
          <button disabled={points < cost} onClick={() => { setPoints(points - cost); setVoucher('LPG-7Q4K-2026'); setRedeemed(false) }} className="mt-4 w-full rounded-xl bg-sun py-3 text-sm font-bold text-ink disabled:opacity-40">Tukar 1.000 poin → LPG 3 kg</button>
        ) : (
          <div className="mt-4 rounded-2xl bg-white p-4 text-center ring-1 ring-forest/10">
            <QrPattern />
            <div className="mt-2 font-mono text-xs">{voucher}</div>
            <div className={`mt-1 text-[11px] font-semibold ${redeemed ? 'text-leaf' : 'text-ink/50'}`}>{redeemed ? '✓ Sudah ditukar di Koperasi SWK' : 'Tunjukkan ke Koperasi SWK'}</div>
          </div>
        )}
      </Phone>
      <div className="text-white">
        <div className="text-sm text-white/60">Sisi Koperasi SWK</div>
        <div className="mt-3 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
          {voucher ? (
            redeemed ? (
              <div className="flex items-center gap-2 text-mint"><CircleCheck /> Voucher tervalidasi, 1 tabung LPG 3 kg diserahkan.</div>
            ) : (
              <button onClick={() => setRedeemed(true)} className="w-full rounded-xl bg-mint py-3 font-semibold text-forest">Scan & validasi {voucher}</button>
            )
          ) : (
            <div className="text-sm text-white/70">Belum ada voucher. Tekan tombol tukar pada ponsel tenant.</div>
          )}
        </div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">Voucher hanya bisa dipakai sekali dan tercatat di ledger, subsidi LPG didanai dari penjualan bioslurry, bukan dari kantong pengelola.</p>
        {voucher && redeemed && <button onClick={() => { setVoucher(null); setPoints(points + 1000) }} className="mt-4 text-xs text-white/50 underline">Reset simulasi</button>}
      </div>
    </div>
  )
}

function QrPattern() {
  const cells = useMemo(() => Array.from({ length: 121 }, (_, i) => ((i * 7919) % 13) > 5), [])
  return (
    <div className="mx-auto grid w-28 grid-cols-11 gap-[2px]">
      {cells.map((c, i) => <div key={i} className={`aspect-square ${c ? 'bg-ink' : 'bg-transparent'}`} />)}
    </div>
  )
}

function OperatorMock() {
  const [rows, setRows] = useState([
    { id: 'OCL-SWK01-007', kg: 6.4, from: 'SWK Contoh', ok: false },
    { id: 'OCL-SWK01-008', kg: 5.1, from: 'SWK Contoh', ok: false },
    { id: 'OCL-KTN02-021', kg: 7.8, from: 'Kantin Kampus', ok: true },
    { id: 'OCL-KTN02-022', kg: 4.9, from: 'Kantin Kampus', ok: true },
  ])
  const total = rows.filter((r) => r.ok).reduce((a, r) => a + r.kg, 0)
  return (
    <div className="rounded-2xl bg-cream p-4 shadow-2xl sm:p-6">
      <div className="font-heading text-lg font-bold">Batch masuk hari ini, PDU Mitra</div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm ring-1 ring-forest/10">
            <span className="rounded-md bg-leaf/15 px-2 py-0.5 text-[11px] font-semibold text-forest-2">Murni</span>
            <span className="font-mono text-xs">{r.id}</span>
            <span className="hidden text-ink/50 sm:inline">{r.from}</span>
            <span className="ml-auto font-semibold">{num(r.kg, 1)} kg</span>
            <button onClick={() => setRows(rows.map((x, j) => (j === i ? { ...x, ok: !x.ok } : x)))} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${r.ok ? 'bg-forest text-white' : 'bg-mint-50 text-forest-2'}`}>
              {r.ok ? 'Diterima' : 'Terima'}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { l: 'Diterima', v: `${num(total, 1)} kg` },
          { l: 'Biogas', v: `${num(total * 0.1, 2)} m³` },
          { l: 'Bioslurry', v: `${num(total / 1.2, 1)} L` },
        ].map((k) => (
          <div key={k.l} className="rounded-xl bg-forest p-3 text-white">
            <div className="font-heading text-lg font-extrabold">{k.v}</div>
            <div className="text-[11px] text-white/60">{k.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const chain = [
  { t: '07.12', a: 'Tenant · Warung Bu Sri', d: 'Sisa makanan dipilah ke wadah QR #07' },
  { t: '09.40', a: 'Petugas · Rudi', d: 'Scan, timbang 6,4 kg, foto, checklist bersih' },
  { t: '09.41', a: 'Quality gate', d: 'Status otomatis: Murni' },
  { t: '11.05', a: 'PDU Mitra', d: 'Batch diterima, masuk biodigester' },
  { t: '+21 hari', a: 'Output', d: '0,64 m³ biogas · 5,3 L bioslurry' },
  { t: '+22 hari', a: 'Insentif', d: '13 Poin Sirkular masuk ke tenant' },
]

function LedgerMock() {
  const [step, setStep] = useState(chain.length)
  return (
    <div className="rounded-2xl bg-cream p-4 shadow-2xl sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-forest/10">
          <Link2 size={16} className="text-leaf" />
          <span className="font-mono text-sm">OCL-SWK01-20261010-007</span>
        </div>
        <button onClick={() => { setStep(0); chain.forEach((_, i) => setTimeout(() => setStep(i + 1), 350 * (i + 1))) }} className="rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white">Telusuri</button>
      </div>
      <ol className="relative mt-6 space-y-4 border-l-2 border-dashed border-forest/20 pl-6">
        {chain.map((c, i) => (
          <motion.li key={c.a} animate={{ opacity: i < step ? 1 : 0.15, x: i < step ? 0 : -6 }} className="relative">
            <span className={`absolute -left-[33px] top-0.5 grid h-5 w-5 place-items-center rounded-full ${i < step ? 'bg-leaf' : 'bg-forest/20'}`}><Check size={12} className="text-white" /></span>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-xs text-ink/50">{c.t}</span>
              <span className="font-heading font-bold">{c.a}</span>
            </div>
            <div className="text-sm text-ink/60">{c.d}</div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
