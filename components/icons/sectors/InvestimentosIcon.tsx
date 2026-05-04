import type { SVGProps } from 'react'
import type { SectorIconProps } from './ConsorcioIcon'

/**
 * Ascending arc terminating in a luminous dot — trajetória patrimonial.
 */
export default function InvestimentosIcon({
  size = 24,
  ...props
}: SectorIconProps & SVGProps<SVGSVGElement>) {
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
      {/* base axis */}
      <path d="M3.5 20 H20.5" opacity={0.45} />
      <path d="M4 20 V8" opacity={0.45} />
      {/* ascending arc */}
      <path d="M4.5 17.5 C8 17 11 13 13.5 9 S17.5 4.5 19.5 4.5" />
      {/* terminus glow ring */}
      <circle cx="19.5" cy="4.5" r="2.4" opacity={0.55} />
      <circle cx="19.5" cy="4.5" r="1.1" fill="currentColor" />
    </svg>
  )
}
