'use client'

import React from 'react'
import { Quest } from '../types'

interface QuestScreenProps {
  quest: Quest
  onSelectChoice: (choice: string) => void
  isLoading?: boolean
}

export default function QuestScreen({ quest, onSelectChoice, isLoading }: QuestScreenProps) {
  return (
    <div className="min-h-screen bg-ui-near-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-ui-dark-grey border-2 border-tavern-gold rounded-lg p-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-cinzel font-bold text-tavern-gold mb-2">
            Quest Received
          </h1>
          <div className="w-24 h-1 bg-tavern-gold mx-auto"></div>
        </div>

        {/* Quest Description */}
        <div className="mb-6">
          <p className="text-ui-beige text-lg leading-relaxed mb-4">
            {quest.description}
          </p>
          
          {/* Objectives */}
          {quest.objectives && quest.objectives.length > 0 && (
            <div className="bg-ui-near-black p-4 rounded-lg">
              <h3 className="text-tavern-gold font-cinzel font-semibold mb-2">
                Objectives:
              </h3>
              <ul className="space-y-2">
                {quest.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-ui-beige">
                    <span className="text-tavern-gold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <h3 className="text-tavern-gold font-cinzel font-semibold mb-3">
            How do you proceed?
          </h3>
          
          {quest.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => onSelectChoice(choice.text)}
              disabled={isLoading}
              className="w-full bg-tavern-brown text-ui-beige p-4 rounded-lg border-2 border-tavern-chocolate hover:bg-tavern-gold hover:text-ui-near-black transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed animate-slide-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-tavern-gold text-xl">☐</span>
                <div>
                  <p className="font-semibold mb-1">{choice.text}</p>
                  {choice.description && (
                    <p className="text-sm opacity-75">{choice.description}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-ai-turquoise">
              <div className="typing-dot"></div>
              <div className="typing-dot" style={{ animationDelay: '200ms' }}></div>
              <div className="typing-dot" style={{ animationDelay: '400ms' }}></div>
              <span className="ml-2">Evaluating your choice...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
