'use client';

import { useTavernStore } from '@/lib/store';
import { Swords, Scroll, Heart } from 'lucide-react';

export default function HomePage() {
  const { npcs, setSelectedNPC } = useTavernStore();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-tavern-gold fire-flicker">
          🏰 Welcome to the Tavern
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Step into a world where AI-powered NPCs come alive. Chat with unique characters,
          embark on quests, and make choices that shape your moral journey.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-tavern-wood/50 border-2 border-tavern-gold/30 rounded-lg p-6 text-center space-y-3">
          <Swords className="w-12 h-12 mx-auto text-tavern-gold" />
          <h3 className="text-xl font-bold text-tavern-gold">Interactive NPCs</h3>
          <p className="text-gray-300">
            Chat with 3 unique characters, each with distinct personalities powered by MiMo AI
          </p>
        </div>

        <div className="bg-tavern-wood/50 border-2 border-tavern-gold/30 rounded-lg p-6 text-center space-y-3">
          <Scroll className="w-12 h-12 mx-auto text-tavern-gold" />
          <h3 className="text-xl font-bold text-tavern-gold">Quest Generation</h3>
          <p className="text-gray-300">
            Receive dynamically generated quests tailored to your level and choices
          </p>
        </div>

        <div className="bg-tavern-wood/50 border-2 border-tavern-gold/30 rounded-lg p-6 text-center space-y-3">
          <Heart className="w-12 h-12 mx-auto text-tavern-gold" />
          <h3 className="text-xl font-bold text-tavern-gold">Moral Evaluation</h3>
          <p className="text-gray-300">
            Your choices matter. AI analyzes your decisions and tracks your moral alignment
          </p>
        </div>
      </div>

      {/* NPCs */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-tavern-gold text-center mb-8">
          Meet the Tavern Folk
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {npcs.map((npc) => (
            <div
              key={npc.id}
              className="bg-tavern-wood/70 border-2 border-tavern-gold/40 rounded-lg p-6 space-y-4 hover:border-tavern-gold transition-all cursor-pointer"
              onClick={() => {
                setSelectedNPC(npc);
                window.location.href = '/tavern';
              }}
            >
              <div className="text-6xl text-center">{npc.avatar}</div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-tavern-gold">{npc.name}</h3>
                <p className="text-sm text-tavern-gold/70">{npc.role}</p>
              </div>
              <div className="speech-bubble">
                <p className="text-gray-200 italic text-sm">
                  &ldquo;{npc.greeting}&rdquo;
                </p>
              </div>
              <p className="text-gray-400 text-sm">{npc.backstory}</p>
              <button className="w-full bg-tavern-gold/20 hover:bg-tavern-gold/30 border border-tavern-gold text-tavern-gold font-bold py-2 px-4 rounded transition-all">
                Talk to {npc.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 space-y-4">
        <p className="text-gray-300">
          Choose an NPC to begin your adventure, or explore the tavern to discover quests and secrets.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/tavern'}
            className="bg-tavern-gold hover:bg-tavern-gold/80 text-tavern-dark font-bold py-3 px-8 rounded-lg transition-all"
          >
            Enter the Tavern
          </button>
        </div>
      </div>
    </div>
  );
}
