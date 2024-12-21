import AuthForm from '@/components/auth/AuthForm'
import InputField from '@/components/inputs/InputField'
import React from 'react'

export default function page() {
  return <AuthForm header='Sign Up' desc='Sing Up For Continue And See This Beautiful Website'>
    <>
      <div className='flex flex-col gap-8 items-center justify-between w-full'>
        <div className='flex items-center gap-24 justify-between w-full'>
          <InputField label='Name' id='name' />
          <InputField label='Last Name' id='lastname' />
        </div>

        <InputField label='Email' id='email' />

        <InputField label='Password' id='password' />

        <InputField label='Password Again' id='passwordAgain' />

      </div>

      <div className='sso-section flex flex-col gap-6 justify-between items-center w-full'>
        <button className="secondary-button w-1/3 flex justify-center items-center !py-4">Sign Up</button>

        <div>OR</div>

        <div className='flex items-center gap-4'>
          <button className="primary-button !py-4">Continue With Google</button>
          <button className="primary-button !py-4">Continue With Twitter</button>
        </div>
      </div>
    </>
  </AuthForm>
}
