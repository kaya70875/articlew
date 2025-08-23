import SSO from '@/components/auth/SSO'
import InputField from '@/components/inputs/InputField'
import { LockIcon, UserIcon } from 'lucide-react'
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AuthButton from './AuthButton';

export default function LoginForm() {

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
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 items-center justify-between w-full'>
            <InputField icon={<UserIcon className="h-5 w-5 text-gray-400" />} label='Email' onChange={(e) => setEmail(e.target.value)} />
            <InputField icon={<LockIcon className="h-5 w-5 text-gray-400" />} label='Password' type='password' onChange={(e) => setPassword(e.target.value)} />

            <AuthButton name='Login' loading={loading} />

            <SSO />
        </form>
    )
}
