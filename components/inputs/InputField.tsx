import { LucideProps } from 'lucide-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactElement;
  type?: 'text' | 'password';
  error?: string;
}

export default function InputField({ label, icon, type = 'text', error, ...props }: InputFieldProps) {
  return (
    <div className='flex flex-col w-full'>
      <label className='text-sm font-medium text-gray-700 mb-1' htmlFor={label}>{label}</label>
      <div className='relative'>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input type={type} id={label} {...props} className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  )
}
