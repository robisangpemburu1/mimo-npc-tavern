import { NextRequest, NextResponse } from 'next/server'
import { getNPCById } from '@/app/data/npcs'

export async function POST(request: NextRequest) {
  try {
    const { npcId, quest, choice, conversationHistory } = await request.json()

    const npc = getNPCById(npcId)
    if (!npc) {
      return NextResponse.json(
        { error: 'NPC not found' },
        { status: 404 }
      )
    }

    // Mock AI evaluation (replace with MiMo API call later)
    const evaluateChoice = (npcId: string, choice: string) => {
      const choiceLower = choice.toLowerCase()
      
      // Determine ending type based on NPC values and choice
      if (npcId === 'veteran') {
        if (choiceLower.includes('honor') || choiceLower.includes('direct') || choiceLower.includes('combat')) {
          return 'good'
        } else if (choiceLower.includes('cunning') || choiceLower.includes('stealth') || choiceLower.includes('infiltrate')) {
          return 'neutral'
        } else {
          return 'bad'
        }
      } else if (npcId === 'merchant') {
        if (choiceLower.includes('cunning') || choiceLower.includes('deception') || choiceLower.includes('steal')) {
          return 'good'
        } else if (choiceLower.includes('buy') || choiceLower.includes('legitimate') || choiceLower.includes('price')) {
          return 'neutral'
        } else {
          return 'bad'
        }
      } else if (npcId === 'bard') {
        if (choiceLower.includes('kindness') || choiceLower.includes('home') || choiceLower.includes('family')) {
          return 'good'
        } else if (choiceLower.includes('empower') || choiceLower.includes('path') || choiceLower.includes('destiny')) {
          return 'neutral'
        } else {
          return 'bad'
        }
      }
      
      return 'neutral'
    }

    const endingType = evaluateChoice(npcId, choice)

    // Generate ending based on type and NPC
    const endings = {
      veteran: {
        good: {
          title: 'Honor Restored',
          narrative: 'You faced the raiders with courage and honor, defeating them in fair combat. The villages are safe once more, and your name is spoken with respect. You have proven yourself worthy of the veteran\'s trust.',
          reward: 'The veteran\'s personal sword as a token of respect'
        },
        neutral: {
          title: 'Cunning Victory',
          narrative: 'You used cunning and stealth to gather evidence against the raiders, exposing their operation to the authorities. While effective, the veteran notes that true honor comes from facing challenges directly.',
          reward: 'A share of the raiders\' confiscated goods'
        },
        bad: {
          title: 'Broken Trust',
          narrative: 'Your choice to negotiate with the raiders was seen as weakness. They took advantage of your mercy and continued their attacks. The veteran is disappointed, believing you lacked the resolve needed for true leadership.',
          reward: 'A lesson in the harsh realities of conflict'
        }
      },
      merchant: {
        good: {
          title: 'Masterful Acquisition',
          narrative: 'Your clever deception secured the artifact without detection. The merchant is impressed with your cunning, and the two of you become wealthy partners. You have proven that profit favors the bold and clever.',
          reward: 'A substantial share of the artifact\'s value'
        },
        neutral: {
          title: 'Legitimate Success',
          narrative: 'You acquired the artifact through legitimate means, paying the asking price. While profitable, the merchant notes that true wealth comes from finding opportunities where others see none.',
          reward: 'A modest profit from the sale'
        },
        bad: {
          title: 'Missed Opportunity',
          narrative: 'Your decision to expose the black market operation angered many powerful figures. The merchant sees this as a failure to recognize opportunity, and your partnership ends. Sometimes, discretion is the better part of valor.',
          reward: 'A clear conscience, but empty pockets'
        }
      },
      bard: {
        good: {
          title: 'Heart of Gold',
          narrative: 'Your unconditional kindness gave the orphan a new home and family. The bard is moved to tears by your compassion, composing a song about your generosity that spreads throughout the land.',
          reward: 'The orphan\'s eternal gratitude and a beautiful song in your honor'
        },
        neutral: {
          title: 'Guiding Light',
          narrative: 'You helped the orphan find their own path, empowering them to choose their destiny. The bard appreciates your wisdom, noting that true help comes from teaching others to help themselves.',
          reward: 'The orphan\'s friendship and a story of your guidance'
        },
        bad: {
          title: 'Missed Connection',
          narrative: 'Your attempt to teach the orphan a skill failed to address their deeper need for emotional support. The bard is disappointed, believing you missed the chance to truly change a life through genuine connection.',
          reward: 'A reminder that sometimes the heart needs more than practical skills'
        }
      }
    }

    const npcEndings = endings[npc.id as keyof typeof endings] || endings.veteran
    const ending = npcEndings[endingType as keyof typeof npcEndings] || npcEndings.good

    // Add secret ending chance (5%)
    if (Math.random() < 0.05) {
      const secretEndings = {
        veteran: {
          title: 'Legendary Warrior',
          narrative: 'Your actions have become the stuff of legends. The veteran sees in you the makings of a true hero, and together you forge a bond that will be remembered for generations.',
          reward: 'The veteran becomes your lifelong mentor and companion'
        },
        merchant: {
          title: 'Shadow Kingpin',
          narrative: 'Your cunning has created an empire in the shadows. The merchant recognizes your genius, and together you build a network of influence that spans continents.',
          reward: 'A partnership that controls the underworld'
        },
        bard: {
          title: 'Eternal Muse',
          narrative: 'Your kindness has inspired the bard to create their greatest masterpiece. Your story becomes immortalized in song, and your name is whispered with reverence by all who hear it.',
          reward: 'Immortality through art and song'
        }
      }

      const secretEnding = secretEndings[npc.id as keyof typeof secretEndings] || secretEndings.veteran
      return NextResponse.json({
        ending: {
          type: 'secret',
          ...secretEnding
        }
      })
    }

    return NextResponse.json({
      ending: {
        type: endingType,
        ...ending
      }
    })
  } catch (error) {
    console.error('Evaluate API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
