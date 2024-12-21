import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label : string;
}

export default function InputField({label , ...props} : InputFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-primaryText font-medium text-lg' htmlFor={label}>{label}</label>
      <input type="text" id={label} {...props} className='p-2 border border-gray-400 w-full rounded-md'/>
    </div>
  )
}
