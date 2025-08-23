'use client';

import InputField from '@/components/inputs/InputField'
import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import React, { SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PolicyButton from './PolicyButton'
import SSO from '@/components/auth/SSO'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useToast } from '@/context/ToastContext'
import { FormData } from '@/types/formData';
import { TAB } from '../signup/page';
import AuthButton from './AuthButton';

interface SignUpFormProps {
    setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
}

export default function SignUpForm({ setErrorMessage }: SignUpFormProps) {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const { createUser } = useAuthActions();
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

            <InputField placeholder='*********' label='Password' id='password' type='password' icon={<LockIcon className="h-5 w-5 text-gray-400" />} error={errors.password?.message} />
            <PolicyButton />
            <AuthButton name='Create Account' loading={loading} />
            <SSO />
        </form>
    )
}
