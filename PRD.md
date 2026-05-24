# Product Requirements Document (PRD)
# MiMo NPC Tavern

**Version:** 1.0  
**Date:** 2026-05-24  
**Status:** MVP Planning

---

## 1. Overview

**MiMo NPC Tavern** adalah fantasy tavern chat game di mana player memilih NPC, berbincang, menerima quest, dan membuat pilihan moral yang menghasilkan ending berbeda. Semua dialogue, quest, dan penilaian jawaban digerakkan oleh **MiMo AI V2.5 Pro**.

**Target Audience:** Gamers yang suka interactive fiction, RPG, dan AI-driven storytelling.

**Core Value Proposition:** Setiap percakapan unik, quest dinamis, dan ending yang berubah berdasarkan pilihan player — powered by AI.

---

## 2. Goals & Success Metrics

### Goals
- Deliver engaging AI-driven NPC interactions
- Showcase MiMo AI V2.5 Pro capabilities (personality, branching story, moral judgment)
- Create replayable experience dengan multiple endings

### Success Metrics
- Player menyelesaikan minimal 1 quest per session
- 3+ unique endings per NPC
- AI response time < 3 detik
- Player replay rate > 40%

---

## 3. Features (MVP Scope)

### 3.1 Tavern Screen
- **Visual:** Single tavern interior scene (pixel art / illustrated)
- **Elements:**
  - 3 NPC characters (clickable)
  - Ambient tavern background (fireplace, tables, barrels)
  - Background music (optional, looping tavern ambience)

### 3.2 NPC Selection
- **3 NPCs dengan personality berbeda:**
  1. **Grizzled Veteran** — Serious, tactical, values honor
  2. **Mysterious Merchant** — Cunning, morally grey, values profit
  3. **Young Bard** — Optimistic, curious, values kindness

- **NPC Info Card:**
  - Name
  - Portrait
  - Short bio (1-2 kalimat)
  - Personality traits (untuk AI context)

### 3.3 Chat System (Multiple Choice)
- **Dialogue Flow:**
  - Player klik NPC → chat window terbuka
  - AI generates opening dialogue (sesuai personality)
  - Player diberi 2-4 pilihan jawaban (multiple choice)
  - AI merespons berdasarkan pilihan
  - Setelah 3-5 exchange → NPC memberikan quest

- **UI Requirements:**
  - Chat bubble untuk NPC dialogue
  - Button grid untuk player choices
  - Typing indicator saat AI generating response
  - Chat history (scrollable)

### 3.4 Quest System
- **Quest Generation (AI-driven):**
  - AI creates quest berdasarkan conversation context
  - Quest types: moral dilemma, fetch task, decision-making
  - Quest description (2-3 kalimat)

- **Quest Execution:**
  - Player diberi situasi quest
  - 2-4 pilihan aksi (multiple choice)
  - AI menilai pilihan berdasarkan:
    - Alignment dengan NPC values
    - Moral weight
    - Story consistency

### 3.5 Branching Story & Endings
- **Ending Types:**
  - **Good Ending** — Player aligned dengan NPC values
  - **Neutral Ending** — Mixed choices
  - **Bad Ending** — Player bertentangan dengan NPC values
  - **Secret Ending** — Unlock via specific choice combination (optional)

- **Ending Screen:**
  - Ending title
  - Narrative summary (AI-generated)
  - Reward/consequence description
  - "Play Again" button

### 3.6 AI Integration (MiMo AI V2.5 Pro)
- **NPC Personality Prompting:**
  - System prompt per NPC (personality, speech style, values)
  - Context injection (conversation history, player choices)

- **Dialogue Tree Generation:**
  - AI generates contextual responses
  - Maintains conversation coherence
  - Adapts tone based on player choices

- **Quest Generator:**
  - AI creates quest based on conversation
  - Ensures quest fits NPC personality
  - Generates 2-4 meaningful choices

- **Moral Choice Evaluation:**
  - AI scores player choices (alignment, morality, creativity)
  - Determines ending based on cumulative score
  - Provides narrative justification for ending

---

## 4. User Flow

```
[Start] → [Tavern Screen]
         ↓
    [Select NPC]
         ↓
    [Chat Opens]
         ↓
    [AI Greeting]
         ↓
    [Player Choice 1] → [AI Response 1]
         ↓
    [Player Choice 2] → [AI Response 2]
         ↓
    [Player Choice 3] → [AI Response 3]
         ↓
    [Quest Offered]
         ↓
    [Quest Description]
         ↓
    [Player Choice (Quest Action)]
         ↓
    [AI Evaluates Choice]
         ↓
    [Ending Screen]
         ↓
    [Play Again / Back to Tavern]
```

---

## 5. Technical Requirements

### 5.1 Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand
- **UI Components:**
  - Tavern scene (SVG / Canvas / Image)
  - Chat window (modal / overlay)
  - Multiple choice buttons
  - Ending screen

### 5.2 Backend / API
- **AI Provider:** MiMo AI V2.5 Pro
- **API Endpoints:**
  - `POST /api/chat` — Send player choice, get AI response
  - `POST /api/quest` — Generate quest based on conversation
  - `POST /api/evaluate` — Evaluate quest choice, return ending

- **Data Flow:**
  - Frontend → API → MiMo AI → Response → Frontend
  - Conversation history stored in session (localStorage / state)

### 5.3 AI Prompt Engineering
- **System Prompts per NPC:**
  - Grizzled Veteran: "You are a battle-hardened warrior who values honor and duty..."
  - Mysterious Merchant: "You are a cunning trader who sees opportunity in chaos..."
  - Young Bard: "You are an optimistic storyteller who believes in kindness..."

- **Prompt Structure:**
  ```
  System: [NPC Personality]
  Context: [Conversation History]
  User: [Player Choice]
  Task: [Generate response / quest / evaluation]
  ```

### 5.4 Data Models
```typescript
interface NPC {
  id: string;
  name: string;
  portrait: string;
  bio: string;
  personality: string; // AI system prompt
  values: string[]; // ["honor", "duty", "courage"]
}

interface Message {
  role: "npc" | "player";
  content: string;
  timestamp: number;
}

interface Quest {
  description: string;
  choices: string[];
}

interface Ending {
  type: "good" | "neutral" | "bad" | "secret";
  title: string;
  narrative: string;
  reward?: string;
}
```

---

## 6. Out of Scope (Post-MVP)

- Multiple taverns / locations
- Inventory system
- Combat mechanics
- Multiplayer / leaderboard
- Voice acting / TTS
- Save/load game state
- Achievement system
- NPC relationship tracking (affinity system)

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI response too slow (>5s) | Poor UX | Add loading state, optimize prompt length, use streaming |
| AI generates inconsistent dialogue | Breaks immersion | Strong system prompts, conversation history injection |
| Player exploits choice system | Unbalanced endings | AI evaluates intent, not just keyword matching |
| MiMo API rate limits | Game unplayable | Implement retry logic, fallback responses, caching |

---

## 8. Timeline (Estimated)

- **Day 1:** Setup repo, scaffold Next.js, design tavern UI
- **Day 2:** Implement NPC selection, chat UI, MiMo API integration
- **Day 3:** Build quest system, choice evaluation, ending logic
- **Day 4:** Polish UI, test all 3 NPCs, fix bugs
- **Day 5:** Deploy, create demo video, write README

---

## 9. Deployment

- **Platform:** Netlify (static export) or Vercel
- **Environment Variables:**
  - `MIMO_API_KEY`
  - `MIMO_API_URL`
- **Demo Requirements:**
  - Live URL
  - Screenshots (tavern, chat, quest, ending)
  - Demo video (30-60s gameplay loop)

---

## 10. Acceptance Criteria

- [ ] Player dapat memilih 1 dari 3 NPC
- [ ] Chat system berfungsi dengan 2-4 pilihan per turn
- [ ] AI generates contextual responses dalam <3 detik
- [ ] Quest muncul setelah 3-5 chat exchanges
- [ ] Player dapat menyelesaikan quest dan melihat ending
- [ ] Setiap NPC memiliki minimal 3 unique endings
- [ ] UI responsive (desktop + mobile)
- [ ] No critical bugs (crash, infinite loop, API error tanpa fallback)

---

**Prepared by:** alifa2 🔥  
**For:** MiMo AI Integration Project  
**Next Steps:** Review PRD → Create DESIGN.md → Start development
