import { NextRequest, NextResponse } from 'next/server';
import { generateDialogue } from '@/lib/api/mimo';

export async function POST(request: NextRequest) {
  try {
    const { npcId, playerInput, context } = await request.json();

    if (!npcId || !playerInput) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await generateDialogue(npcId, playerInput, context || '');

    return NextResponse.json({
      npcId,
      response,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Dialogue API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate dialogue' },
      { status: 500 }
    );
  }
}
