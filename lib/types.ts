// NPC Types
export interface NPC {
  id: string;
  name: string;
  role: string;
  personality: string;
  avatar: string;
  greeting: string;
  backstory: string;
}

// Dialogue Types
export interface Message {
  id: string;
  npcId: string;
  content: string;
  timestamp: number;
  isPlayer: boolean;
}

export interface DialogueContext {
  npcId: string;
  history: Message[];
  currentMood: 'friendly' | 'neutral' | 'suspicious' | 'excited';
}

// Quest Types
export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
  moralAlignment: 'good' | 'neutral' | 'evil';
  status: 'available' | 'active' | 'completed';
}

// MiMo API Types
export interface MiMoRequest {
  prompt: string;
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface MiMoResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

// Analysis Types
export interface MoralAnalysis {
  alignment: 'good' | 'neutral' | 'evil';
  score: number;
  reasoning: string;
  consequences: string[];
}
