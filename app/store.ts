import { create } from 'zustand'
import { GameState, NPC, Message, Quest, Ending } from './types'

interface GameStore extends GameState {
  setCurrentNPC: (npc: NPC) => void
  addMessage: (message: Message) => void
  setQuest: (quest: Quest) => void
  setEnding: (ending: Ending) => void
  setIsLoading: (loading: boolean) => void
  resetGame: () => void
}

const useGameStore = create<GameStore>((set) => ({
  currentNPC: null,
  messages: [],
  quest: null,
  ending: null,
  isLoading: false,
  
  setCurrentNPC: (npc) => set({ currentNPC: npc }),
  
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
  
  setQuest: (quest) => set({ quest }),
  
  setEnding: (ending) => set({ ending }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  resetGame: () => set({ 
    currentNPC: null, 
    messages: [], 
    quest: null, 
    ending: null,
    isLoading: false 
  }),
}))

export default useGameStore
