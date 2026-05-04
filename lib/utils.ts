import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
