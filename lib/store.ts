import { create } from 'zustand';
import { NPC, Message, Quest, DialogueContext } from './types';

interface TavernStore {
  // NPCs
  npcs: NPC[];
  selectedNPC: NPC | null;
  setSelectedNPC: (npc: NPC) => void;

  // Dialogue
  dialogueHistory: Message[];
  currentContext: DialogueContext | null;
  addMessage: (message: Message) => void;
  clearDialogue: () => void;

  // Quests
  quests: Quest[];
  activeQuests: Quest[];
  addQuest: (quest: Quest) => void;
  completeQuest: (questId: string) => void;

  // Player state
  playerMoralScore: number;
  updateMoralScore: (delta: number) => void;
}

export const useTavernStore = create<TavernStore>((set) => ({
  npcs: [
    {
      id: 'grizzled-veteran',
      name: 'Kael Ironforge',
      role: 'Grizzled Veteran',
      personality: 'Tough, experienced, tells war stories, values honor',
      avatar: '⚔️',
      greeting: 'Well, well... another adventurer walks through that door. Sit down, I\'ll buy you a drink.',
      backstory: 'Former knight commander, now runs the tavern. Seen too much war, seeks redemption.',
    },
    {
      id: 'mysterious-merchant',
      name: 'Lyra Shadowveil',
      role: 'Mysterious Merchant',
      personality: 'Enigmatic, deals in secrets, speaks in riddles, morally ambiguous',
      avatar: '🎭',
      greeting: 'Ah, a new face. I have something you might be interested in... if the price is right.',
      backstory: 'Trader of rare artifacts and forbidden knowledge. Her true allegiances remain unknown.',
    },
    {
      id: 'young-bard',
      name: 'Finn Songweaver',
      role: 'Young Bard',
      personality: 'Optimistic, curious, loves stories, idealistic but naive',
      avatar: '🎵',
      greeting: 'Hey there, friend! I\'m Finn. Want to hear a song? Or maybe you have a story to share?',
      backstory: 'Traveling musician searching for the greatest adventure to inspire his next ballad.',
    },
  ],
  selectedNPC: null,
  setSelectedNPC: (npc) => set({ selectedNPC: npc }),

  dialogueHistory: [],
  currentContext: null,
  addMessage: (message) =>
    set((state) => ({
      dialogueHistory: [...state.dialogueHistory, message],
    })),
  clearDialogue: () =>
    set({
      dialogueHistory: [],
      currentContext: null,
    }),

  quests: [],
  activeQuests: [],
  addQuest: (quest) =>
    set((state) => ({
      quests: [...state.quests, quest],
    })),
  completeQuest: (questId) =>
    set((state) => ({
      quests: state.quests.map((q) =>
        q.id === questId ? { ...q, status: 'completed' as const } : q
      ),
    })),

  playerMoralScore: 0,
  updateMoralScore: (delta) =>
    set((state) => ({
      playerMoralScore: Math.max(-100, Math.min(100, state.playerMoralScore + delta)),
    })),
}));
