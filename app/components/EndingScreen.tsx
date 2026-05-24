'use client'

import React from 'react'
import { Ending } from '../types'

interface EndingScreenProps {
  ending: Ending
  onPlayAgain: () => void
  onBackToTavern: () => void
}

export default function EndingScreen({
  ending,
  onPlayAgain,
  onBackToTavern
}: EndingScreenProps) {
  const endingColors = {
    good: 'ending-good',
    neutral: 'ending-neutral',
    bad: 'ending-bad',
    secret: 'ending-secret'
  }

  const endingIcons = {
    good: '✓',
    neutral: '◆',
    bad: '✗',
    secret: '★'
  }

  return (
    <div className="min-h-screen bg-ui-near-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Ending Icon */}
        <div className={`w-24 h-24 rounded-full ${endingColors[ending.type]} flex items-center justify-center mx-auto mb-6`}>
          <span className="text-5xl">{endingIcons[ending.type]}</span>
        </div>

        {/* Ending Title */}
        <h1 className={`text-4xl font-cinzel font-bold mb-4 ${
          ending.type === 'good' ? 'text-ending-good' :
          ending.type === 'neutral' ? 'text-ending-neutral' :
          ending.type === 'bad' ? 'text-ending-bad' :
          'text-ending-secret'
        }`}>
          {ending.title}
        </h1>

        {/* Divider */}
        <div className="w-32 h-1 bg-tavern-gold mx-auto mb-6"></div>

        {/* Ending Narrative */}
        <div className="bg-ui-dark-grey border-2 border-tavern-chocolate rounded-lg p-8 mb-8">
          <p className="text-ui-beige text-lg leading-relaxed mb-4">
            {ending.narrative}
          </p>

          {ending.reward && (
            <div className="mt-6 pt-6 border-t border-tavern-chocolate">
              <p className="text-tavern-gold font-cinzel font-semibold mb-2">
                Reward:
              </p>
              <p className="text-ui-beige">
                {ending.reward}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="btn-primary"
          >
            Play Again
          </button>
          <button
            onClick={onBackToTavern}
            className="btn-secondary"
          >
            Back to Tavern
          </button>
        </div>
      </div>
    </div>
  )
}
