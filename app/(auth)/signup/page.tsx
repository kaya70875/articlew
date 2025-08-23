'use client';

import { useForm, Controller } from 'react-hook-form';
import InputField from '@/components/inputs/InputField';
import React, { useState } from 'react';
import { useAuthActions } from '@/hooks/useAuthActions';
import { FormData } from '@/types/formData';
import { useToast } from '@/context/ToastContext';
import { CircleAlert, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import AuthHero from '../components/AuthHero';
import PolicyButton from '../components/PolicyButton';

export default function Page() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const { createUser } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await createUser(data);

    if (response?.message) {
      setLoading(false);
      return setErrorMessage(response.message);
    }

    showToast('User Created Successfully', 'success');
    setErrorMessage(null);
    setLoading(false);
  };

  return (
    <section id="auth" className="w-full py-12 md:py-24 bg-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <AuthHero />
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center space-x-4 mb-8">
              <button className="px-6 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium">
                Sign Up
              </button>
              <button className="px-6 py-2 text-gray-500 hover:text-indigo-600 transition-colors">
                Log In
              </button>
            </div>
            {errorMessage && (
              <div className='p-2 w-full bg-red-100 rounded-md flex items-center gap-2'>
                <CircleAlert className='text-red-500 w-5 h-5' />
                <p className='text-red-500'>{errorMessage}</p>
              </div>
            )}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <InputField {...field} id='name' placeholder='John Doe' label='Name' icon={<UserIcon className="h-5 w-5 text-gray-400" />} error={errors.name?.message} />
                )}

              />

              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email is required', pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <InputField {...field} id='email' placeholder='your@email.com' label='Email Address' icon={<MailIcon className="h-5 w-5 text-gray-400" />} error={errors.email?.message} />
                )}
              />

              <InputField placeholder='*********' label='Password' type='password' icon={<LockIcon className="h-5 w-5 text-gray-400" />} error={errors.password?.message} />
              <PolicyButton />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-80"
              >
                Create Account
              </button>
            </form>
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a
                  href="#"
                  className="font-medium text-primaryPurple hover:text-indigo-500"
                >
                  Log in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
