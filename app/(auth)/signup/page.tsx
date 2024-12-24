'use client';

import { useForm, Controller } from 'react-hook-form';
import AuthForm from '@/components/auth/AuthForm';
import InputField from '@/components/inputs/InputField';
import React, { useState } from 'react';
import { useAuthActions } from '@/hooks/useAuthActions';
import { FormData } from '@/types/formData';
import SSO from '@/components/auth/SSO';
import Link from 'next/link';

export default function Page() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const {createUser} = useAuthActions();
  const [errorMessage , setErrorMessage] = useState<string | null>(null);
  const [loading , setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await createUser(data);

    if(response?.message) {
      setLoading(false);
      return setErrorMessage(response.message);
    }

    alert('User Created Successfully');
    setErrorMessage(null);
    setLoading(false);
  };

  const password = watch('password');

  return (
    <AuthForm
      header="Sign Up"
      desc="Sign Up to continue and explore this beautiful website"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 items-center justify-between w-full"
      >
        {errorMessage && <p className="text-red-500 text-base">{errorMessage}</p>}
        <div className="flex items-center gap-24 justify-between w-full">
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <InputField
                {...field}
                label="Name"
                id="name"
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <InputField
                {...field}
                label="Last Name"
                id="lastname"
                error={errors.lastname?.message}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          }}
          render={({ field }) => (
            <InputField
              {...field}
              label="Email"
              id="email"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <InputField
              {...field}
              label="Password"
              id="password"
              type="password"
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          name="passwordAgain"
          control={control}
          rules={{
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match',
          }}
          render={({ field }) => (
            <InputField
              {...field}
              label="Password Again"
              id="passwordAgain"
              type="password"
              error={errors.passwordAgain?.message}
            />
          )}
        />

        <div className="sso-section flex flex-col gap-6 justify-between items-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="secondary-button w-1/4 flex justify-center items-center !py-3 disabled:bg-gray-600"
          >
            Sign Up
          </button>

          <div>OR</div>

          <SSO />

          <Link href={'/login'} className='underline'>Already have account ?</Link>
        </div>
      </form>
    </AuthForm>
  );
}
