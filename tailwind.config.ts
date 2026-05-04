import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          dark: '#07162a',
          base: '#0b1f3a',
          mid: '#142f54',
        },
        brand: {
          blue: '#020c30',
          red: '#ae251c',
        },
        invest: {
          graphite: '#1a1a2e',
          gold: '#c9a84c',
        },
      },
      animation: {
        ping: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
