import { MiMoRequest, MiMoResponse } from '../types';

const MIMO_API_URL = process.env.MIMO_API_URL || process.env.NIMO_API_URL || 'https://token-plan-sgp.xiaomimomo.com/v1';
const MIMO_API_KEY = process.env.MIMO_API_KEY || process.env.NIMO_API_KEY;

export async function callMiMoAPI(request: MiMoRequest): Promise<MiMoResponse> {
  if (!MIMO_API_KEY) {
    console.log('MiMo API key not configured - using mock data');
    return getMockResponse(request);
  }

  try {
    const response = await fetch(`${MIMO_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MIMO_API_KEY}`,
      },
      body: JSON.stringify({
        ...request,
        model: 'mimo-v2.5-pro',
      }),
    });

    if (!response.ok) {
      throw new Error(`MiMo API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices?.[0]?.message?.content || data.content || '',
      usage: data.usage,
    };
  } catch (error) {
    console.error('MiMo API call failed:', error);
    return getMockResponse(request);
  }
}

// Mock responses for development
function getMockResponse(request: MiMoRequest): MiMoResponse {
  const { prompt } = request;
  
  // Mock responses based on prompt content
  if (prompt.includes('greeting')) {
    return {
      content: 'Welcome, traveler. The fire is warm, the ale is cold. What brings you to our humble tavern?',
    };
  }

  if (prompt.includes('quest')) {
    return {
      content: 'I have a task for you, if you\'re brave enough. The old ruins to the north are haunted by restless spirits. Bring me proof of their defeat, and I\'ll reward you handsomely.',
    };
  }

  if (prompt.includes('moral')) {
    return {
      content: 'Your choice shows courage and honor. The villagers will sing songs of your bravery for generations to come.',
    };
  }

  // Default response
  return {
    content: 'Hmm, interesting. Let me think about that for a moment...',
  };
}

// Dialogue generation
export async function generateDialogue(
  npcId: string,
  playerInput: string,
  context: string
): Promise<string> {
  const prompt = `NPC: ${npcId}
Player says: "${playerInput}"
Context: ${context}

Generate a natural, in-character response for the NPC. Keep it under 2 sentences.`;

  const response = await callMiMoAPI({
    prompt,
    temperature: 0.7,
    maxTokens: 100,
  });

  return response.content;
}

// Quest generation
export async function generateQuest(
  npcId: string,
  playerLevel: number
): Promise<string> {
  const prompt = `Generate a fantasy quest for a level ${playerLevel} adventurer.
NPC: ${npcId}
Include: title, description, difficulty, reward, and moral implications.`;

  const response = await callMiMoAPI({
    prompt,
    temperature: 0.8,
    maxTokens: 200,
  });

  return response.content;
}

// Moral analysis
export async function analyzeMoralChoice(
  choice: string,
  context: string
): Promise<string> {
  const prompt = `Analyze the moral implications of this choice:
Choice: "${choice}"
Context: ${context}

Provide: alignment (good/neutral/evil), reasoning, and potential consequences.`;

  const response = await callMiMoAPI({
    prompt,
    temperature: 0.5,
    maxTokens: 150,
  });

  return response.content;
}
