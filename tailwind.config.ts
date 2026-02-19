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
        'neon-blue': '#00f5ff',
        'neon-purple': '#a855f7',
        'dark-bg': '#0a0a0a',
        'card-bg': 'rgba(255,255,255,0.03)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 3s infinite',
        'glitch-2': 'glitch2 3s infinite',
        'pulse-neon-blue': 'pulse-neon-blue 2s ease-in-out infinite',
        'pulse-neon-purple': 'pulse-neon-purple 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '92%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-4px, 2px)', color: '#00f5ff' },
          '94%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(4px, -2px)', color: '#a855f7' },
          '96%': { clipPath: 'inset(70% 0 10% 0)', transform: 'translate(-2px, 1px)', color: '#00f5ff' },
          '98%': { clipPath: 'inset(40% 0 50% 0)', transform: 'translate(2px, -1px)', color: '#ffffff' },
        },
        glitch2: {
          '0%, 85%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '87%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(3px, -2px)', color: '#a855f7' },
          '89%': { clipPath: 'inset(30% 0 55% 0)', transform: 'translate(-3px, 2px)', color: '#00f5ff' },
          '91%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(1px, -3px)', color: '#ffffff' },
        },
        'pulse-neon-blue': {
          '0%, 100%': { boxShadow: '0 0 5px #00f5ff40, 0 0 10px #00f5ff20' },
          '50%': { boxShadow: '0 0 15px #00f5ff, 0 0 30px #00f5ff80, 0 0 60px #00f5ff40' },
        },
        'pulse-neon-purple': {
          '0%, 100%': { boxShadow: '0 0 5px #a855f740, 0 0 10px #a855f720' },
          '50%': { boxShadow: '0 0 15px #a855f7, 0 0 30px #a855f780, 0 0 60px #a855f740' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
