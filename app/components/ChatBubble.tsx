'use client'

import React from 'react'

interface ChatBubbleProps {
  role: 'npc' | 'player'
  content: string
  isTyping?: boolean
}

export default function ChatBubble({ role, content, isTyping }: ChatBubbleProps) {
  if (isTyping) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <div className="chat-bubble-npc">
          <div className="typing-indicator">
            <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
            <div className="typing-dot" style={{ animationDelay: '200ms' }}></div>
            <div className="typing-dot" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${role === 'player' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`${role === 'npc' ? 'chat-bubble-npc' : 'chat-bubble-player'}`}>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
}
