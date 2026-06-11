'use client'

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  User,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { evaluatePassword, isValidEmail } from '@/lib/password'
import { TextField } from './text-field'
import { PasswordInput } from './password-input'
import { PasswordStrength } from './password-strength'
import { SuccessModal } from './success-modal'
import { GlowButton } from "../nexera";
import { useWallet } from "@/components/context/WalletContext";


type Mode = 'signin' | 'signup' | 'forgot'

type FormState = {
  name: string
  email: string
  password: string
  confirm: string
  remember: boolean
  terms: boolean
}

const emptyState: FormState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  remember: true,
  terms: false,
}

export function AuthForm() {
  const { connectWallet } = useWallet();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin')
  const [form, setForm] = useState<FormState>(emptyState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [success, setSuccess] = useState(false)
  const [created, setCreated] = useState({ name: '', email: '' })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  function switchMode(next: Mode) {
    setMode(next)
    setErrors({})
    setSent(false)
  }

  function validate(): boolean {
    const next: Record<string, string> = {}

    if (mode === 'signup' && form.name.trim().length < 2) {
      next.name = 'Please enter your full name.'
    }
    if (!isValidEmail(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (mode !== 'forgot') {
      if (mode === 'signin') {
        if (form.password.length === 0) next.password = 'Password is required.'
      } else {
        const { isValid } = evaluatePassword(form.password)
        if (!isValid) {
          next.password = 'Password does not meet all requirements.'
        }
        if (form.confirm !== form.password) {
          next.confirm = 'Passwords do not match.'
        }
        if (!form.terms) {
          next.terms = 'You must accept the terms to continue.'
        }
      }
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulated request — wire this to your auth backend.
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)
    if (mode === 'forgot') {
    setSent(true)
    }
    else if (mode === 'signup') {
      setCreated({
      name: form.name.trim(),
      email: form.email.trim(),
      })

      setSuccess(true)
    }
    else if (mode === 'signin') {
    localStorage.setItem("userName", name);
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
}
  }


  async function handleWalletLogin() {
  try {
    await connectWallet();

    localStorage.setItem("isLoggedIn", "true");

    router.push("/");
  } catch (error) {
    console.error(error);
  }
  }

  function handleSuccessClose() {
    setSuccess(false)
    // After confirming, return them to the sign in screen with a clean form.
    setForm(emptyState)
    setErrors({})
    setMode('signin')
  }

  const titles: Record<Mode, { title: string; subtitle: string }> = {
    signin: {
      title: 'Welcome back',
      subtitle: 'Sign in to access your Nexera credentials.',
    },
    signup: {
      title: 'Create your account',
      subtitle: 'Start minting verifiable on-chain credentials.',
    },
    forgot: {
      title: 'Reset your password',
      subtitle: "Enter your email and we'll send you a reset link.",
    },
  }

  return (
    <div
      className="
      w-full
      max-w-md
      glass-card
      rounded-3xl
      p-8
      border
      border-white/10
      shadow-[0_0_50px_rgba(0,212,255,.08)]">

      <SuccessModal
        open={success}
        name={created.name}
        email={created.email}
        onClose={handleSuccessClose}
      />

      {/* Tabs (hidden in forgot mode) */}
      {mode !== 'forgot' ? (
        <div className="mb-7 grid grid-cols-2 gap-1 rounded-xl border border-border bg-secondary/50 p-1">
          {(['signin', 'signup'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={cn(
                'relative rounded-lg py-2.5 text-sm font-medium transition-colors',
                mode === m
                  ? 'bg-gradient-brand text-primary-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => switchMode('signin')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </button>
      )}

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-balance">
          {titles[mode].title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {titles[mode].subtitle}
        </p>
      </div>

      {/* Forgot password success */}
      {mode === 'forgot' && sent ? (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
          <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-6" />
          </span>
          <p className="font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a password reset link to{' '}
            <span className="font-medium text-foreground">{form.email}</span>.
          </p>
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="mt-5 text-sm font-medium text-brand hover:underline"
          >
            Return to sign in
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === 'signup' ? (
            <TextField
              label="Full name"
              name="name"
              autoComplete="name"
              placeholder="Satoshi Nakamoto"
              icon={<User className="size-[18px]" />}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              error={errors.name}
            />
          ) : null}

          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@nexera.io"
            icon={<Mail className="size-[18px]" />}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            error={errors.email}
            valid={isValidEmail(form.email)}
          />

          {mode !== 'forgot' ? (
            <div className="space-y-3">
              <PasswordInput
                label="Password"
                name="password"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                error={errors.password}
              />
              {mode === 'signup' ? (
                <PasswordStrength value={form.password} />
              ) : null}
            </div>
          ) : null}

          {mode === 'signup' ? (
            <PasswordInput
              label="Confirm password"
              name="confirm"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              error={errors.confirm}
            />
          ) : null}

          {mode === 'signin' ? (
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => update('remember', e.target.checked)}
                  className="size-4 rounded border-border accent-[oklch(0.78_0.14_210)]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => switchMode('forgot')}
                className="text-sm font-medium text-brand hover:underline"
              >
                Forgot password?
              </button>
            </div>
          ) : null}

          {mode === 'signup' ? (
            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => update('terms', e.target.checked)}
                  className="mt-0.5 size-4 rounded border-border accent-[oklch(0.78_0.14_210)]"
                />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-brand hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-brand hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.terms ? (
                <p className="mt-1 text-xs text-destructive">{errors.terms}</p>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-brand glow-brand flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold text-primary-foreground transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                {mode === 'signin'
                  ? 'Sign In'
                  : mode === 'signup'
                    ? 'Create Account'
                    : 'Send Reset Link'}
                <ArrowRight className="size-4" />
              </>
            )}
          </button>

          {mode !== 'forgot' ? (
            <>
              <div className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <GlowButton
                type="button"
                onClick={handleWalletLogin}
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-secondary/40 font-medium text-foreground transition-colors hover:border-brand/50 hover:bg-secondary/70"
              >
                <Wallet className="size-[18px] text-brand" />
                Continue with Wallet
              </GlowButton>
            </>
          ) : null}
        </form>
      )}

      {mode !== 'forgot' ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="font-medium text-brand hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="font-medium text-brand hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      ) : null}
    </div>
  )
}
