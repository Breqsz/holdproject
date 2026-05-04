import type { SVGProps } from 'react'
import type { SectorIconProps } from './ConsorcioIcon'

/**
 * Pentagonal layered shield — proteção em camadas.
 */
export default function SegurosIcon({ size = 24, ...props }: SectorIconProps & SVGProps<SVGSVGElement>) {
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
      {/* outer pentagonal shield */}
      <path d="M12 2.5 L20 6 L19 14.5 C19 17.5 16 19.5 12 21.5 C8 19.5 5 17.5 5 14.5 L4 6 Z" />
      {/* inner concentric layer */}
      <path d="M12 6 L17 8 L16.4 14 C16.4 16 14.5 17.4 12 18.6 C9.5 17.4 7.6 16 7.6 14 L7 8 Z" opacity={0.55} />
      {/* core mark */}
      <circle cx="12" cy="12" r="1.4" fill="currentColor" opacity={0.85} />
    </svg>
  )
}
