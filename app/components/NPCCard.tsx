'use client'

import React from 'react'
import { NPC } from '../types'

interface NPCCardProps {
  npc: NPC
  onClick: () => void
  isSelected?: boolean
}

export default function NPCCard({ npc, onClick, isSelected }: NPCCardProps) {
  return (
    <div
      onClick={onClick}
      className={`npc-card ${isSelected ? 'ring-2 ring-tavern-gold' : ''}`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Portrait Placeholder */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-tavern-chocolate to-tavern-brown flex items-center justify-center border-4 border-tavern-gold">
          <span className="text-4xl">👤</span>
        </div>
        
        {/* NPC Info */}
        <div className="text-center">
          <h3 className="text-2xl font-cinzel font-bold text-tavern-gold mb-2">
            {npc.name}
          </h3>
          <p className="text-sm text-ui-beige mb-3">
            {npc.bio}
          </p>
          
          {/* Values Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {npc.values.map((value) => (
              <span
                key={value}
                className="px-3 py-1 bg-tavern-chocolate text-ui-beige text-xs rounded-full"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
