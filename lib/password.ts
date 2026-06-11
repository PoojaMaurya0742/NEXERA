export type PasswordRule = {
  id: string
  label: string
  test: (value: string) => boolean
}

export const passwordRules: PasswordRule[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (v) => v.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter (A–Z)',
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter (a–z)',
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: 'number',
    label: 'One number (0–9)',
    test: (v) => /[0-9]/.test(v),
  },
  {
    id: 'special',
    label: 'One special character (!@#$…)',
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
]

export type StrengthLevel = {
  score: number // number of satisfied rules (0–5)
  label: 'Empty' | 'Weak' | 'Fair' | 'Good' | 'Strong'
  percent: number
}

export function evaluatePassword(value: string): {
  results: { id: string; passed: boolean }[]
  strength: StrengthLevel
  isValid: boolean
} {
  const results = passwordRules.map((rule) => ({
    id: rule.id,
    passed: rule.test(value),
  }))

  const score = results.filter((r) => r.passed).length
  const isValid = score === passwordRules.length

  let label: StrengthLevel['label'] = 'Empty'
  if (value.length === 0) label = 'Empty'
  else if (score <= 2) label = 'Weak'
  else if (score === 3) label = 'Fair'
  else if (score === 4) label = 'Good'
  else label = 'Strong'

  const percent =
    value.length === 0 ? 0 : Math.round((score / passwordRules.length) * 100)

  return { results, strength: { score, label, percent }, isValid }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
