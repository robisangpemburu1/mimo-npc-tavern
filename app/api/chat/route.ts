import { NextRequest, NextResponse } from 'next/server'
import { getNPCById } from '@/app/data/npcs'

export async function POST(request: NextRequest) {
  try {
    const { npcId, messages, conversationCount, action } = await request.json()

    const npc = getNPCById(npcId)
    if (!npc) {
      return NextResponse.json(
        { error: 'NPC not found' },
        { status: 404 }
      )
    }

    // Build conversation context
    const conversationHistory = messages
      .map((msg: any) => `${msg.role === 'npc' ? 'NPC' : 'Player'}: ${msg.content}`)
      .join('\n')

    // Mock AI response (replace with MiMo API call later)
    const mockResponses = {
      veteran: [
        'A worthy question. Tell me, do you have the courage to face what lies ahead?',
        'I see determination in your eyes. That is good. Many lack such resolve.',
        'Your path is clear, but the journey will test you. Are you prepared?',
        'Honor demands sacrifice. Are you willing to pay the price?'
      ],
      merchant: [
        'Ah, an interesting proposition. Let us discuss terms, shall we?',
        'Every choice has a price. What are you willing to offer?',
        'I see potential in you. Perhaps we can find mutual benefit.',
        'The world rewards the clever and punishes the foolish. Which are you?'
      ],
      bard: [
        'What a wonderful spirit you have! I can see great things ahead for you.',
        'Your kindness shines through. The world needs more like you.',
        'Every choice you make writes a new verse in your story. Make it a good one!',
        'I believe in you. Trust your heart, and it will guide you true.'
      ]
    }

    const npcResponses = mockResponses[npc.id as keyof typeof mockResponses] || mockResponses.veteran
    const responseIndex = (conversationCount || 0) % npcResponses.length
    const message = npcResponses[responseIndex]

    // Generate choices based on NPC personality
    const choicesByNPC = {
      veteran: [
        'I am ready for any challenge',
        'Tell me more about your past',
        'What do you value most?',
        'I seek your wisdom'
      ],
      merchant: [
        'What kind of deal are you proposing?',
        'How can we both profit from this?',
        'What secrets do you know?',
        'I am interested in your offer'
      ],
      bard: [
        'Your optimism is inspiring',
        'Tell me a story',
        'How can I help others?',
        'I want to join your cause'
      ]
    }

    const choices = choicesByNPC[npc.id as keyof typeof choicesByNPC] || choicesByNPC.veteran

    // Determine if quest should be offered (after 3-5 exchanges)
    const offerQuest = (conversationCount || 0) >= 3 && Math.random() > 0.5

    if (offerQuest) {
      const quests = {
        veteran: {
          description: 'A band of raiders has been terrorizing the nearby villages. They must be stopped. Will you take up arms and defend the innocent?',
          objectives: [
            'Locate the raiders\' hideout',
            'Gather intelligence about their leader',
            'Decide their fate'
          ],
          choices: [
            {
              text: 'Confront them directly with honor',
              description: 'Face them in open combat'
            },
            {
              text: 'Infiltrate and gather evidence',
              description: 'Use cunning and stealth'
            },
            {
              text: 'Negotiate a peaceful resolution',
              description: 'Seek understanding'
            }
          ]
        },
        merchant: {
          description: 'A valuable artifact has surfaced in the black market. It could make us both wealthy beyond measure. But acquiring it will require... discretion. Are you interested?',
          objectives: [
            'Find the artifact\'s current owner',
            'Negotiate or acquire it',
            'Decide what to do with it'
          ],
          choices: [
            {
              text: 'Steal it through cunning',
              description: 'Use deception and wit'
            },
            {
              text: 'Buy it legitimately',
              description: 'Pay the asking price'
            },
            {
              text: 'Expose the black market operation',
              description: 'Report it to authorities'
            }
          ]
        },
        bard: {
          description: 'A young orphan has lost everything in a recent tragedy. They need help, hope, and a reason to believe in tomorrow. Will you help me restore their faith in humanity?',
          objectives: [
            'Learn the orphan\'s story',
            'Help them find purpose',
            'Give them hope for the future'
          ],
          choices: [
            {
              text: 'Offer them a home and family',
              description: 'Show them unconditional kindness'
            },
            {
              text: 'Help them find their own path',
              description: 'Empower them to choose their destiny'
            },
            {
              text: 'Teach them a valuable skill',
              description: 'Give them tools to succeed'
            }
          ]
        }
      }

      const quest = quests[npc.id as keyof typeof quests] || quests.veteran

      return NextResponse.json({
        offerQuest: true,
        quest: quest
      })
    }

    return NextResponse.json({
      message,
      choices,
      offerQuest: false
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
