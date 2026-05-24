'use client'

import React from 'react'
import { X } from 'lucide-react'
import { NPC, Message } from '../types'
import ChatArea from './ChatArea'
import ChoiceGrid from './ChoiceGrid'

interface ChatModalProps {
  npc: NPC
  messages: Message[]
  choices: string[]
  onSelectChoice: (choice: string) => void
  onClose: () => void
  isLoading?: boolean
}

export default function ChatModal({
  npc,
  messages,
  choices,
  onSelectChoice,
  onClose,
  isLoading
}: ChatModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-tavern-chocolate">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tavern-chocolate to-tavern-brown flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-cinzel font-bold text-tavern-gold">
                {npc.name}
              </h2>
              <p className="text-sm text-ui-beige opacity-75">
                {npc.bio}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-ui-dark-grey rounded transition-colors"
          >
            <X className="w-6 h-6 text-ui-beige" />
          </button>
        </div>

        {/* Chat Area */}
        <ChatArea messages={messages} isLoading={isLoading} />

        {/* Choice Grid */}
        {choices.length > 0 && (
          <div className="border-t border-tavern-chocolate">
            <div className="p-3 bg-ui-near-black">
              <p className="text-sm text-ui-beige mb-2">Choose your response:</p>
            </div>
            <ChoiceGrid
              choices={choices}
              onSelect={onSelectChoice}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}
