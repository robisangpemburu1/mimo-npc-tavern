import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tavern Warmth Palette
        'tavern-brown': '#8B4513',
        'tavern-chocolate': '#D2691E',
        'tavern-gold': '#FFD700',
        'tavern-dark-red': '#8B0000',
        
        // UI Palette
        'ui-dark-grey': '#2C2C2C',
        'ui-beige': '#F5F5DC',
        'ui-near-black': '#1A1A1A',
        
        // AI/Magic Accents
        'ai-turquoise': '#00CED1',
        'ai-tomato': '#FF6347',
        
        // Ending Types
        'ending-good': '#FFD700',
        'ending-neutral': '#C0C0C0',
        'ending-bad': '#FF6347',
        'ending-secret': '#9370DB',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
