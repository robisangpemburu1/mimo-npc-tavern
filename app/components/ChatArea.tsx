'use client'

import React, { useRef, useEffect } from 'react'
import { Message } from '../types'
import ChatBubble from './ChatBubble'

interface ChatAreaProps {
  messages: Message[]
  isLoading?: boolean
}

export default function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-ui-dark-grey p-4 space-y-4 max-h-96"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-ui-beige opacity-50">
          <p>Start a conversation...</p>
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              role={msg.role}
              content={msg.content}
            />
          ))}
          {isLoading && <ChatBubble role="npc" content="" isTyping={true} />}
        </>
      )}
    </div>
  )
}
