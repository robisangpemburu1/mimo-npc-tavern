import { NextRequest, NextResponse } from 'next/server';
import { analyzeMoralChoice } from '@/lib/api/mimo';

export async function POST(request: NextRequest) {
  try {
    const { choice, context } = await request.json();

    if (!choice) {
      return NextResponse.json(
        { error: 'Missing choice' },
        { status: 400 }
      );
    }

    const analysis = await analyzeMoralChoice(choice, context || '');

    return NextResponse.json({
      choice,
      analysis,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Moral analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze choice' },
      { status: 500 }
    );
  }
}
