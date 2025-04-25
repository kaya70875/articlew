'use client';

import InputField from '@/components/inputs/InputField'
import { useToast } from '@/context/ToastContext';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

export default function Page() {

    const [password, setPassword] = useState({
        'newPassword': '',
        'confirmPassword': ''
    });

    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const { showToast } = useToast();
    const router = useRouter();

    const handlePasswordChange = async () => {
        if (!token) return console.error('Token cannot found!');

        try {
            if (!password.newPassword || !password.confirmPassword) {
                return showToast('Please fill in all fields', 'error');
            }

            if (password.newPassword !== password.confirmPassword) {
                return showToast('Passwords do not match', 'error');
            }

            setLoading(true);
            await axios.post("/api/account/resetPassword", { token: token, newPassword: password.newPassword })
            showToast('Password changed successfully', 'success');
            setLoading(false);
            router.push('/login');
        } catch (e) {
            showToast('Error while changing password', 'error');
            setLoading(false);
            console.error('Error while resetting password', e);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col gap-8 items-center justify-center'>
            <h3>Set Your New Password.</h3>

            <div className='flex flex-col gap-4 w-full max-w-2xl'>
                <InputField label='New Password' type='password' onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                <InputField label='Confirm Password' type='password' onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })} />
                <button className="primary-button" disabled={loading} onClick={handlePasswordChange}>Reset My Password</button>
            </div>
        </div>
    )
}
