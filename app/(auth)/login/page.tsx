'use client';

import AuthForm from '@/components/auth/AuthForm'
import SSO from '@/components/auth/SSO'
import InputField from '@/components/inputs/InputField'
import { SignInResponse, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [authResults, setAuthResults] = useState<SignInResponse | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    setAuthResults(result);
    setLoading(false);

  }

  useEffect(() => {
    if (authResults && !authResults?.error) {
      router.push('/search');
    } else if (authResults?.error) {
      alert('Invalid Credentials!');
    }
  }, [authResults, router]);

  return (
    <AuthForm header='Login' desc='Login your account to continue'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 items-center justify-between w-full'>
        <InputField label='Email' onChange={(e) => setEmail(e.target.value)} />
        <InputField label='Password' type='password' onChange={(e) => setPassword(e.target.value)} />

        <button
          type="submit"
          disabled={loading}
          className="secondary-button w-full md:w-1/4 flex justify-center items-center !py-3 disabled:bg-gray-600"
        >
          Sign Up
        </button>

        <div>OR</div>

        <SSO />
        <Link className='underline' href={'/forgot-password'}>Forgot Your Password ?</Link>
        <Link href={'/signup'} className='underline'>No account yet ?</Link>
      </form>

    </AuthForm>
  )
}