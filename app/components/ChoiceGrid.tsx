'use client'

import React from 'react'

interface ChoiceGridProps {
  choices: string[]
  onSelect: (choice: string) => void
  disabled?: boolean
}

export default function ChoiceGrid({ choices, onSelect, disabled }: ChoiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className="choice-btn animate-slide-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}
