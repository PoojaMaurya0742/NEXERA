import { BadgeCheck, ShieldCheck, Zap } from 'lucide-react'
import { NexeraWordmark } from '@/components/nexera-logo'

const stats = [
  { value: '$0', label: 'Gas Cost' },
  { value: '~2s', label: 'Mint Time' },
  { value: 'ERC-721', label: 'Standard' },
  { value: '100%', label: 'On-Chain' },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Immutable On-Chain Records',
    desc: 'Credentials are permanently stored on Base Sepolia — impossible to forge.',
  },
  {
    icon: Zap,
    title: 'Gasless via UGF',
    desc: 'Mint and verify without ever touching ETH for gas fees.',
  },
  {
    icon: BadgeCheck,
    title: 'Verifiable by Anyone',
    desc: 'Anyone can verify credentials directly on public block explorers.',
  },
]

export function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 bg-background">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-brand-2/20 blur-3xl"
      />

      <NexeraWordmark className="relative z-10" />

      <div className="relative z-10 max-w-md">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          Live on Base Sepolia · Gasless via UGF
        </div>
        <h1 className="text-6xl font-bold tracking-tight leading-[1.05]">
          NFT Credentials
          <br />
          <span className="text-gradient-brand">
            Without Gas Fees
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/80">
          Mint and verify on-chain credentials with Web2 simplicity and Web3 ownership.
        </p>

        <ul className="mt-8 space-y-4">
          {features.map((f) => (
            <li key={f.title} className="flex gap-3.5">
              <span className="ring-gradient-brand flex size-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
                <f.icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold leading-tight text-foreground">{f.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card/50 px-3 py-3 text-center backdrop-blur"
          >
            <p className="font-heading text-lg font-bold text-brand">
              {s.value}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
