# Design Document (DESIGN.md)
# MiMo NPC Tavern

**Version:** 1.0  
**Date:** 2026-05-24  
**Status:** MVP Design

---

## 1. Visual Design System

### 1.1 Color Palette
```
Primary (Tavern Warmth):
  - #8B4513 (Saddle Brown) — Wood, tavern walls
  - #D2691E (Chocolate) — Accents, NPC borders
  - #FFD700 (Gold) — Quest highlights, rewards
  - #8B0000 (Dark Red) — Danger, bad choices

Secondary (UI):
  - #2C2C2C (Dark Grey) — Chat background
  - #F5F5DC (Beige) — Text, chat bubbles
  - #1A1A1A (Near Black) — Borders, shadows

Accent (AI/Magic):
  - #00CED1 (Dark Turquoise) — AI responses, magic effects
  - #FF6347 (Tomato) — Warnings, moral dilemmas
```

### 1.2 Typography
```
Headings: "Cinzel" (serif, fantasy feel)
  - H1: 32px, bold
  - H2: 24px, bold
  - H3: 18px, semibold

Body: "Inter" (sans-serif, readable)
  - Chat text: 14px, regular
  - Buttons: 14px, semibold
  - Labels: 12px, regular

Monospace: "JetBrains Mono" (code, system messages)
```

### 1.3 Spacing & Layout
```
Grid: 8px base unit
  - Padding: 8px, 16px, 24px, 32px
  - Gaps: 8px (tight), 16px (normal), 24px (loose)
  - Border radius: 4px (sharp), 8px (rounded)

Breakpoints:
  - Mobile: 320px - 640px
  - Tablet: 641px - 1024px
  - Desktop: 1025px+
```

---

## 2. Screen Layouts

### 2.1 Tavern Screen (Landing)

**Layout:**
```
┌─────────────────────────────────────────┐
│  MiMo NPC Tavern                        │
├─────────────────────────────────────────┤
│                                         │
│         [Tavern Illustration]           │
│         (SVG or pixel art)              │
│                                         │
│    ┌──────┐  ┌──────┐  ┌──────┐       │
│    │ NPC1 │  │ NPC2 │  │ NPC3 │       │
│    │ Card │  │ Card │  │ Card │       │
│    └──────┘  └──────┘  └──────┘       │
│                                         │
│         [Start Game Button]             │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**
- **Header:** "MiMo NPC Tavern" (Cinzel, gold text)
- **Tavern Scene:** 
  - Background: Tavern interior (fireplace, tables, barrels)
  - Dimensions: Full width, 60vh height
  - Style: Pixel art (8-bit) or illustrated (hand-drawn)
  
- **NPC Cards (3x):**
  - Portrait (circular, 120px diameter)
  - Name (Cinzel, 18px)
  - Bio (Inter, 12px, 2 lines max)
  - Personality tags (small badges)
  - Hover effect: Scale 1.05, shadow glow
  - Click: Opens chat modal

- **Start Button:**
  - Text: "Enter Tavern" or "Choose Your Companion"
  - Style: Gold background, dark text, hover glow
  - Action: Scroll to NPC cards or highlight first NPC

**Mobile Adaptation:**
- Stack NPC cards vertically
- Reduce tavern scene height to 40vh
- Full-width buttons

---

### 2.2 Chat Modal

**Layout:**
```
┌──────────────────────────────────────┐
│ [NPC Name]              [Close ✕]    │
├──────────────────────────────────────┤
│                                      │
│  Chat History (scrollable)           │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ NPC: "Greetings, traveler..."  │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ You: "I seek adventure"        │ │
│  └────────────────────────────────┘ │
│                                      │
│  [Typing indicator...]               │
│                                      │
├──────────────────────────────────────┤
│ Choice Buttons:                      │
│ ┌──────────────┐  ┌──────────────┐  │
│ │ Choice 1     │  │ Choice 2     │  │
│ └──────────────┘  └──────────────┘  │
│ ┌──────────────┐  ┌──────────────┐  │
│ │ Choice 3     │  │ Choice 4     │  │
│ └──────────────┘  └──────────────┘  │
└──────────────────────────────────────┘
```

**Components:**
- **Header:**
  - NPC portrait (small, 48px)
  - NPC name (Cinzel, 20px)
  - Close button (✕, top-right)

- **Chat Area:**
  - Background: Dark grey (#2C2C2C)
  - Max height: 60vh, scrollable
  - Padding: 16px

- **Message Bubbles:**
  - **NPC:** Left-aligned, turquoise background (#00CED1), dark text
  - **Player:** Right-aligned, brown background (#8B4513), beige text
  - Border radius: 8px
  - Padding: 12px 16px
  - Max width: 80% of container

- **Typing Indicator:**
  - Animated dots: "..."
  - Color: Turquoise
  - Shows while AI generating response

- **Choice Buttons:**
  - Grid: 2 columns (desktop), 1 column (mobile)
  - Background: Dark brown (#8B4513)
  - Text: Beige (#F5F5DC)
  - Hover: Gold background (#FFD700), dark text
  - Disabled: Grey, opacity 0.5
  - Padding: 12px 16px
  - Border radius: 4px
  - Font: Inter, 14px, semibold

**Interaction:**
- Player clicks choice → Button disabled, message sent
- AI response appears in chat
- New choices appear after response
- After 3-5 exchanges → Quest button appears

---

### 2.3 Quest Screen

**Layout:**
```
┌──────────────────────────────────────┐
│ Quest: [Quest Title]                 │
├──────────────────────────────────────┤
│                                      │
│  [NPC Portrait]                      │
│                                      │
│  "Your quest is..."                  │
│  [Quest Description - 2-3 lines]     │
│                                      │
│  Objectives:                         │
│  • Objective 1                       │
│  • Objective 2                       │
│                                      │
├──────────────────────────────────────┤
│ How do you proceed?                  │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ ☐ Choice 1 (Description)         │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ ☐ Choice 2 (Description)         │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ ☐ Choice 3 (Description)         │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Components:**
- **Header:** "Quest: [Title]" (Cinzel, 24px, gold)
- **NPC Portrait:** Circular, 100px, centered
- **Quest Description:** Inter, 14px, 2-3 lines, beige text
- **Objectives:** Bullet list, 12px
- **Choice Buttons:**
  - Full width
  - Checkbox icon (☐) on left
  - Description text (12px, secondary color)
  - Hover: Highlight, cursor pointer
  - Click: Evaluate choice, show result

---

### 2.4 Ending Screen

**Layout:**
```
┌──────────────────────────────────────┐
│                                      │
│         [Ending Title]               │
│         (Cinzel, 32px, gold)         │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [Ending Illustration/Icon]     │ │
│  └────────────────────────────────┘ │
│                                      │
│  [Ending Narrative - 3-5 lines]      │
│  (AI-generated story conclusion)     │
│                                      │
│  Reward: [Item/XP/Unlock]            │
│                                      │
│  ┌──────────────┐  ┌──────────────┐ │
│  │ Play Again   │  │ Back to      │ │
│  │              │  │ Tavern       │ │
│  └──────────────┘  └──────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

**Components:**
- **Title:** Ending type (Good/Neutral/Bad/Secret)
  - Good: Gold text, uplifting icon
  - Neutral: Silver text, neutral icon
  - Bad: Red text, warning icon
  - Secret: Purple text, star icon

- **Narrative:** AI-generated conclusion (3-5 sentences)
- **Reward:** Item name, XP, or unlock description
- **Buttons:**
  - "Play Again" → Reset chat, same NPC
  - "Back to Tavern" → Return to NPC selection

---

## 3. Component Library

### 3.1 Reusable Components

```typescript
// Button
<Button 
  variant="primary" | "secondary" | "danger"
  size="sm" | "md" | "lg"
  disabled={boolean}
  onClick={handler}
>
  Label
</Button>

// Chat Bubble
<ChatBubble 
  role="npc" | "player"
  content={string}
  isTyping={boolean}
/>

// NPC Card
<NPCCard 
  npc={NPC}
  onClick={handler}
  isSelected={boolean}
/>

// Choice Button Grid
<ChoiceGrid 
  choices={string[]}
  onSelect={handler}
  disabled={boolean}
/>

// Modal
<Modal 
  isOpen={boolean}
  onClose={handler}
  title={string}
>
  {children}
</Modal>
```

---

## 4. Interaction Patterns

### 4.1 Chat Flow
1. Player clicks NPC card
2. Chat modal opens with NPC greeting
3. Player selects choice from buttons
4. Choice button disables, message appears in chat
5. Typing indicator shows
6. AI response appears (1-2 seconds)
7. New choices appear
8. Repeat 3-5 times
9. Quest button appears
10. Player clicks "Accept Quest"

### 4.2 Quest Flow
1. Quest screen appears with description
2. Player reads objectives
3. Player selects action choice
4. Loading state (AI evaluating)
5. Ending screen appears
6. Player can replay or return to tavern

### 4.3 Animations
- **Fade In:** Chat modal, ending screen (300ms)
- **Slide In:** Choice buttons (200ms, staggered)
- **Pulse:** Typing indicator (infinite)
- **Glow:** NPC card hover (200ms)
- **Scale:** Button press (100ms)

---

## 5. Responsive Design

### 5.1 Mobile (320px - 640px)
- Single column layout
- Full-width modals
- Stacked choice buttons (1 column)
- Reduced font sizes (12px body, 20px headings)
- Tavern scene height: 40vh
- NPC cards: Stack vertically

### 5.2 Tablet (641px - 1024px)
- 2-column choice grid
- Moderate padding (16px)
- Tavern scene height: 50vh
- NPC cards: 2-3 per row

### 5.3 Desktop (1025px+)
- Full design as specified
- 2-4 column choice grid
- Tavern scene height: 60vh
- NPC cards: 3 per row

---

## 6. Accessibility (WCAG 2.1 AA)

- **Color Contrast:** All text meets 4.5:1 ratio
- **Focus States:** Visible focus ring on all interactive elements
- **Keyboard Navigation:** Tab through choices, Enter to select
- **ARIA Labels:** Buttons, modals, chat roles
- **Semantic HTML:** `<button>`, `<dialog>`, `<main>`, `<section>`
- **Alt Text:** NPC portraits, tavern scene
- **Font Size:** Minimum 14px for body text
- **Line Height:** 1.5 for readability

---

## 7. Dark Mode (Default)

All colors specified above are dark mode. Light mode is out of scope for MVP.

---

## 8. Performance Targets

- **First Paint:** < 1s
- **Chat Modal Open:** < 500ms
- **AI Response Display:** < 3s (with typing indicator)
- **Ending Screen Load:** < 1s
- **Mobile Lighthouse Score:** > 80

---

## 9. Asset Requirements

### 9.1 Illustrations
- **Tavern Scene:** 1200x600px (SVG or PNG)
  - Fireplace, tables, barrels, ambient lighting
  - Style: Pixel art (8-bit) or hand-drawn

- **NPC Portraits:** 3x (circular, 200x200px)
  - Grizzled Veteran: Scarred, armored, serious
  - Mysterious Merchant: Hooded, cunning smile, exotic
  - Young Bard: Cheerful, colorful clothes, lute

- **Ending Icons:** 4x (64x64px)
  - Good: ✓ (checkmark, gold)
  - Neutral: ◆ (diamond, silver)
  - Bad: ✗ (cross, red)
  - Secret: ★ (star, purple)

### 9.2 Audio (Optional)
- **Tavern Ambience:** 30-60s loop (fireplace crackle, distant chatter)
- **UI Sounds:** Click (50ms), success (200ms), error (100ms)

---

## 10. File Structure

```
src/
├── components/
│   ├── Tavern/
│   │   ├── TavernScreen.tsx
│   │   ├── NPCCard.tsx
│   │   └── NPCGrid.tsx
│   ├── Chat/
│   │   ├── ChatModal.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ChoiceGrid.tsx
│   │   └── TypingIndicator.tsx
│   ├── Quest/
│   │   ├── QuestScreen.tsx
│   │   └── QuestChoice.tsx
│   ├── Ending/
│   │   ├── EndingScreen.tsx
│   │   └── EndingCard.tsx
│   └── Common/
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
├── pages/
│   ├── index.tsx (Tavern)
│   ├── chat.tsx (Chat Modal)
│   ├── quest.tsx (Quest Screen)
│   └── ending.tsx (Ending Screen)
├── api/
│   ├── chat.ts (POST /api/chat)
│   ├── quest.ts (POST /api/quest)
│   └── evaluate.ts (POST /api/evaluate)
├── hooks/
│   ├── useChat.ts
│   ├── useQuest.ts
│   └── useMiMoAPI.ts
├── types/
│   └── index.ts (NPC, Message, Quest, Ending)
├── styles/
│   ├── globals.css
│   ├── tavern.module.css
│   └── chat.module.css
└── public/
    ├── images/
    │   ├── tavern.svg
    │   ├── npc-veteran.png
    │   ├── npc-merchant.png
    │   ├── npc-bard.png
    │   └── icons/
    └── audio/
        ├── tavern-ambience.mp3
        └── ui-sounds/
```

---

## 11. Development Checklist

- [ ] Set up Next.js 14 project with Tailwind CSS
- [ ] Create color palette in Tailwind config
- [ ] Build Tavern screen with NPC cards
- [ ] Implement Chat modal with choice buttons
- [ ] Integrate MiMo AI API for dialogue
- [ ] Build Quest screen and logic
- [ ] Implement Ending screen with AI evaluation
- [ ] Add animations and transitions
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse > 80)
- [ ] Create demo video (30-60s gameplay)
- [ ] Deploy to Netlify

---

**Prepared by:** alifa2 🔥  
**For:** MiMo AI Integration Project  
**Next Steps:** Approve design → Start component development → Integrate MiMo API
