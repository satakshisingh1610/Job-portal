import React, { useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const inputVariants = cva(
  'flex w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-500 bg-white text-gray-900 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Input = React.forwardRef(({ 
  className, 
  variant, 
  type, 
  label, 
  error, 
  success, 
  helperText, 
  floatingLabel = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  
  const inputType = type === 'password' && showPassword ? 'text' : type
  const isFloating = floatingLabel && (isFocused || hasValue || props?.value)
  
  const handleFocus = (e) => {
    setIsFocused(true)
    props?.onFocus?.(e)
  }
  
  const handleBlur = (e) => {
    setIsFocused(false)
    props?.onBlur?.(e)
  }
  
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0)
    props?.onChange?.(e)
  }

  return (
    <div className="relative">
      {label && !floatingLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            inputVariants({ variant: error ? 'error' : success ? 'success' : variant }),
            floatingLabel && 'pt-6',
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {floatingLabel && label && (
          <label
            className={cn(
              'absolute left-3 top-2 text-sm transition-all duration-200 pointer-events-none',
              isFloating 
                ? 'text-xs text-blue-600 -translate-y-1' 
                : 'text-gray-500 translate-y-2'
            )}
          >
            {label}
          </label>
        )}
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      {(error || success || helperText) && (
        <p className={cn(
          'mt-1 text-xs',
          error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-500'
        )}>
          {error || success || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input, inputVariants }
