import type { SVGProps } from 'react'
import type { SectorIconProps } from './ConsorcioIcon'

/**
 * Pulse line transitioning into a half-leaf — cuidado integrado.
 */
export default function SaudeIcon({ size = 24, ...props }: SectorIconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* pulse line */}
      <path d="M2.5 13 H6 L8 9 L10 17 L12 11" />
      {/* leaf — half-stylized continuation */}
      <path d="M12 11 C14 8 17 7 21 7 C21 11 20 14 17.5 16 C15.5 17.5 13 17.5 11.5 16" />
      {/* leaf vein */}
      <path d="M13 15 C15 13.5 17 11.5 20 8.5" opacity={0.5} />
    </svg>
  )
}
