import { MiMoRequest, MiMoResponse } from '../types';

const MIMO_API_URL = process.env.MIMO_API_URL || process.env.NIMO_API_URL || 'https://token-plan-sgp.xiaomimomo.com/v1';
const MIMO_API_KEY = process.env.MIMO_API_KEY || process.env.NIMO_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function callMiMoAPI(request: MiMoRequest): Promise<MiMoResponse> {
  // Try MiMo first
  if (MIMO_API_KEY) {
    try {
      console.log('Calling MiMo API...');
      
      // Try multiple endpoint patterns
      const endpoints = [
        `${MIMO_API_URL}/generate`,
        `${MIMO_API_URL}/chat/completions`,
        `${MIMO_API_URL}/v1/chat/completions`,
      ];
      
      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          const response = await fetch(endpoint, {
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
            console.warn(`MiMo API error (${endpoint}): ${response.status} ${response.statusText}`);
            lastError = new Error(`MiMo API error: ${response.statusText}`);
            continue; // Try next endpoint
          }

          const data = await response.json();
          console.log(`MiMo API success (${endpoint})`);
          return {
            content: data.choices?.[0]?.message?.content || data.content || data.text || '',
            usage: data.usage,
          };
        } catch (endpointError) {
          console.warn(`Endpoint ${endpoint} failed:`, endpointError);
          lastError = endpointError;
        }
      }
      
      // All endpoints failed
      if (lastError) throw lastError;
      
    } catch (error) {
      console.error('All MiMo endpoints failed:', error);
      // Fall through to Groq
    }
  }

  // Try Groq fallback
  if (GROQ_API_KEY) {
    try {
      console.log('Calling Groq API (fallback)...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: request.prompt,
            },
          ],
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 150,
        }),
      });

      if (!response.ok) {
        console.warn(`Groq API error: ${response.status}`);
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Groq API success');
      return {
        content: data.choices?.[0]?.message?.content || '',
        usage: data.usage,
      };
    } catch (error) {
      console.error('Groq API failed:', error);
      // Fall through to mock
    }
  }

  // Fallback to mock
  console.log('Using mock response (no API keys configured)');
  return getMockResponse(request);
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
