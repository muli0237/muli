'use client'

import React from 'react'
import { soundFx } from '@/lib/sound-effects'

interface SciButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  sound?: boolean
  glow?: boolean
}

export function SciButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  sound = true,
  glow = true,
  className = '',
  onClick,
  ...props
}: SciButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sound) {
      soundFx.playClick()
    }
    if (onClick) {
      onClick(e)
    }
  }

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-semibold tracking-wider uppercase transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none sci-btn-cut'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-3',
  }

  const variantStyles = {
    primary:
      'bg-[#00f0ff] text-[#070a0f] hover:bg-[#5ff7ff] border border-[#00f0ff] ' +
      (glow ? 'hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]' : ''),
    secondary:
      'bg-[#00ff66] text-[#070a0f] hover:bg-[#5fff9e] border border-[#00ff66] ' +
      (glow ? 'hover:shadow-[0_0_20px_rgba(0,255,102,0.6)]' : ''),
    outline:
      'bg-[#0a0e17]/80 text-[#00f0ff] border border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] ' +
      (glow ? 'hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]' : ''),
    danger:
      'bg-[#ff003c] text-white hover:bg-[#ff3366] border border-[#ff003c] ' +
      (glow ? 'hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]' : ''),
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Corner bracket ticks */}
      <span className="absolute top-0.5 left-1 text-[8px] opacity-40 leading-none">┌</span>
      <span className="absolute top-0.5 right-1 text-[8px] opacity-40 leading-none">┐</span>
      <span className="absolute bottom-0.5 left-1 text-[8px] opacity-40 leading-none">└</span>
      <span className="absolute bottom-0.5 right-1 text-[8px] opacity-40 leading-none">┘</span>

      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
