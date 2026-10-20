import { atom } from '@reatom/core'
import { CardOrder } from '@/widgets/profileCard/lib/helpers'

// order of the card that is open in fullscreen, null when none
export const fullScreenCard = atom<CardOrder | null>(null)
