import { atom } from '@reatom/core'

// unknown until the first /auth/me check
export type AdminSession = 'unknown' | 'guest' | 'admin'

export const adminSession = atom<AdminSession>('unknown')
