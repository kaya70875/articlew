import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label : string;
    type? : 'text' | 'password';
    error? : string;
}

export default function InputField({label , type = 'text' , error, ...props} : InputFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-primaryText font-medium text-lg' htmlFor={label}>{label}</label>
      <input type={type} id={label} {...props} className='p-2 border border-gray-400 w-full rounded-md hover:border-primaryBlue transition-all duration-300 focus:border-primaryBlue outline-none' />
      {error && <p className='text-red-500 text-base'>{error}</p>}
    </div>
  )
}
