import type { Config } from 'tailwindcss'
import radixPlugin from 'tailwindcss-radix'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [radixPlugin],
} satisfies Config
