import type { SVGProps } from 'react'

export interface SectorIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

/**
 * 3 ascending rectangles linked by a hairline — planejamento → contemplação → conquista.
 */
export default function ConsorcioIcon({ size = 24, ...props }: SectorIconProps) {
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
      {/* base rail */}
      <path d="M3 20h18" opacity={0.45} />
      {/* three ascending blocks */}
      <rect x="4" y="14" width="4" height="6" rx="0.6" />
      <rect x="10" y="10" width="4" height="10" rx="0.6" />
      <rect x="16" y="6" width="4" height="14" rx="0.6" />
      {/* connecting trajectory */}
      <path d="M6 14 L12 10 L18 6" opacity={0.65} />
      {/* apex marker */}
      <circle cx="18" cy="6" r="0.9" fill="currentColor" />
    </svg>
  )
}
