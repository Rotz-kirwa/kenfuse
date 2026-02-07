import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white'
  }

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return spinner
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton rounded ${className}`}></div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  )
}
