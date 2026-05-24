export interface NPC {
  id: string
  name: string
  portrait: string
  bio: string
  personality: string
  values: string[]
}

export interface Message {
  role: 'npc' | 'player'
  content: string
  timestamp: number
}

export interface Quest {
  description: string
  objectives: string[]
  choices: Array<{
    text: string
    description: string
  }>
}

export interface Ending {
  type: 'good' | 'neutral' | 'bad' | 'secret'
  title: string
  narrative: string
  reward?: string
}

export interface GameState {
  currentNPC: NPC | null
  messages: Message[]
  quest: Quest | null
  ending: Ending | null
  isLoading: boolean
}
