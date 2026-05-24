'use client';

import { useState, useEffect } from 'react';
import { useTavernStore } from '@/lib/store';
import { Send, MessageCircle } from 'lucide-react';

export default function TavernPage() {
  const { selectedNPC, npcs, dialogueHistory, addMessage } = useTavernStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [npc, setNpc] = useState(selectedNPC || npcs[0]);

  useEffect(() => {
    if (!npc && npcs.length > 0) {
      setNpc(npcs[0]);
    }
  }, [npc, npcs]);

  const handleSendMessage = async () => {
    if (!input.trim() || !npc) return;

    // Add player message
    const playerMessage = {
      id: `msg-${Date.now()}`,
      npcId: npc.id,
      content: input,
      timestamp: Date.now(),
      isPlayer: true,
    };

    addMessage(playerMessage);
    setInput('');
    setLoading(true);

    try {
      // Call dialogue API
      const response = await fetch('/api/dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          npcId: npc.id,
          playerInput: input,
          context: `NPC: ${npc.name}, Role: ${npc.role}, Personality: ${npc.personality}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add NPC response
      const npcMessage = {
        id: `msg-${Date.now()}-npc`,
        npcId: npc.id,
        content: data.response,
        timestamp: Date.now(),
        isPlayer: false,
      };

      addMessage(npcMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        npcId: npc.id,
        content: 'The tavern grows quiet... (Connection error)',
        timestamp: Date.now(),
        isPlayer: false,
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!npc) {
    return <div className="text-center text-gray-400">Loading tavern...</div>;
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* NPC Selector */}
      <div className="md:col-span-1 space-y-4">
        <h3 className="text-lg font-bold text-tavern-gold">Tavern Folk</h3>
        <div className="space-y-2">
          {npcs.map((n) => (
            <button
              key={n.id}
              onClick={() => setNpc(n)}
              className={`w-full text-left p-3 rounded border-2 transition-all ${
                npc.id === n.id
                  ? 'border-tavern-gold bg-tavern-gold/20'
                  : 'border-tavern-gold/20 hover:border-tavern-gold/40'
              }`}
            >
              <div className="text-2xl">{n.avatar}</div>
              <div className="text-sm font-bold text-tavern-gold">{n.name}</div>
              <div className="text-xs text-gray-400">{n.role}</div>
            </button>
          ))}
        </div>

        {/* Quests Section */}
        <div className="mt-8 pt-8 border-t border-tavern-gold/20">
          <h3 className="text-lg font-bold text-tavern-gold mb-4">Quests</h3>
          <button className="w-full bg-tavern-gold/20 hover:bg-tavern-gold/30 border border-tavern-gold text-tavern-gold font-bold py-2 px-4 rounded transition-all">
            Request Quest
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="md:col-span-3 flex flex-col bg-tavern-wood/30 border-2 border-tavern-gold/20 rounded-lg overflow-hidden">
        {/* NPC Header */}
        <div className="bg-tavern-wood/70 border-b border-tavern-gold/20 p-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{npc.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold text-tavern-gold">{npc.name}</h2>
              <p className="text-sm text-gray-400">{npc.role}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {dialogueHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <MessageCircle className="w-16 h-16 text-tavern-gold/30" />
              <p className="text-gray-400">
                Start a conversation with {npc.name.split(' ')[0]}...
              </p>
            </div>
          ) : (
            dialogueHistory
              .filter((msg) => msg.npcId === npc.id)
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isPlayer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isPlayer
                        ? 'bg-tavern-gold/20 border border-tavern-gold text-tavern-gold'
                        : 'speech-bubble text-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="speech-bubble text-gray-400">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-tavern-gold/20 bg-tavern-wood/50 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="What do you say?"
              className="flex-1 bg-tavern-dark/50 border border-tavern-gold/30 rounded px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-tavern-gold"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-tavern-gold hover:bg-tavern-gold/80 disabled:bg-tavern-gold/30 text-tavern-dark font-bold py-2 px-4 rounded transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
