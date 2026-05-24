import { NextRequest, NextResponse } from 'next/server';
import { generateQuest } from '@/lib/api/mimo';

export async function POST(request: NextRequest) {
  try {
    const { npcId, playerLevel } = await request.json();

    if (!npcId) {
      return NextResponse.json(
        { error: 'Missing npcId' },
        { status: 400 }
      );
    }

    const questData = await generateQuest(npcId, playerLevel || 1);

    return NextResponse.json({
      npcId,
      quest: questData,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Quest API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quest' },
      { status: 500 }
    );
  }
}
