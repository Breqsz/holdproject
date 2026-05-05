import type { SVGProps } from 'react'
import type { SectorIconProps } from './ConsorcioIcon'

/**
 * Cruz médica em quadrado arredondado — cuidado integrado.
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
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}
