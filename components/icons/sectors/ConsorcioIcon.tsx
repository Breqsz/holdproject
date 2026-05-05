import type { SVGProps } from 'react'

export interface SectorIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

/**
 * Chave — referência à carta de crédito do consórcio.
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
      <circle cx="7.5" cy="12" r="3.8" />
      <path d="M11.3 12h9.2" />
      <path d="M17.5 12v2.8" />
      <path d="M20.5 12v2.8" />
      <circle cx="7.5" cy="12" r="1.3" fill="currentColor" opacity={0.7} />
    </svg>
  )
}
