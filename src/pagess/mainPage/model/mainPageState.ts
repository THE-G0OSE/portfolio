import { atom } from '@reatom/core'

// id of the stack category picked in the power switch, null = first one
export const stackCategory = atom<number | null>(null)
