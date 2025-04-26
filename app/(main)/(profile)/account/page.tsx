'use client';

import InputField from '@/components/inputs/InputField';
import Navbar from '@/components/Navbar'
import ProfileIcon from '@/components/reusables/ProfileIcon'
import { useToast } from '@/context/ToastContext';
import { useAuthActions } from '@/hooks/useAuthActions';
import { AccountThemes, UserType } from '@/types/userTypes';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import ModalTransitionContainer from '@/components/reusables/containers/ModalTransitionContainer';
import SubscriptionInfo from '../premium/components/SubscriptionInfo';
import PurchaseSuccess from '../premium/components/PurchaseSuccessModal';

export default function Page() {
    const { data: session, update } = useSession();

    const currentUser = session?.user;
    const { changePassword, updateProfile } = useAuthActions();
    const { showToast } = useToast();

    const params = useSearchParams();

    const param = params.get('success');
    const success = param === 'true';

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        passwordAgain: '',
    })

    const [profile, setProfile] = useState({
        name: currentUser?.name ?? '',
        lastname: currentUser?.lastname ?? '',
    })

    const handleChangePassword = async () => {
        if (password.newPassword !== password.passwordAgain) {
            return showToast('Passwords do not match!', 'error');
        }
        if (!password.currentPassword || !password.newPassword || !password.passwordAgain) {
            return showToast('Please fill all fields', 'error');
        }

        const res = await changePassword(password.currentPassword, password.newPassword);

        if (res?.message === 'Current password is wrong') {
            return showToast('Password is wrong', 'error');
        }

        showToast('Password changed successfully', 'success');
    }

    const handleUpdateProfile = async () => {
        const { name, lastname } = profile;
        if (!name && !lastname) return;

        await updateProfile(name, lastname && lastname);
        update({ ...session, name: profile.name, lastname: profile.lastname });
        showToast('Profile updated', 'success');
    }

    const accountTypeTheme: Record<UserType, AccountThemes> = {
        Free: {
            className: 'text-primaryBlue'
        },
        Basic: {
            className: 'text-primaryBlue font-medium'
        },
        Premium: {
            className: 'text-primaryPurple font-semibold'
        }
    } as const;

    return (
        <div className='flex justify-center w-full h-full'>
            <div className='w-full lg:w-1/2 mt-navbar-height flex flex-col gap-8 p-4'>
                <Navbar />

                <div className="account-profile flex flex-col gap-8 p-4">
                    <h4>Profile</h4>

                    <div className='flex gap-8 px-4'>
                        <ProfileIcon />
                        <div className='flex flex-col gap-2'>
                            <p>{currentUser?.name} {currentUser?.lastname}</p>
                            <p>{currentUser?.email}</p>
                            <p>Account Type: <span className={accountTypeTheme[currentUser?.userType ?? 'Free'].className}>{currentUser?.userType}</span></p>
                            <SubscriptionInfo />
                        </div>
                    </div>

                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <InputField type='text' onChange={(e) => setProfile({ ...profile, name: e.target.value })} defaultValue={currentUser?.name?.toString()} label='Name' />
                            <InputField type='text' onChange={(e) => setProfile({ ...profile, lastname: e.target.value })} defaultValue={currentUser?.lastname?.toString()} label='Lastname' />
                        </div>

                        <button onClick={handleUpdateProfile} className="primary-button w-44">Update Profile</button>
                    </div>

                    <h4>Security</h4>

                    <div className='w-full md:w-1/2 flex flex-col gap-4'>
                        <InputField type='password' label='Current Password' onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
                        <InputField type='password' label='New Password' onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                        <InputField type='password' label='Password Again' onChange={(e) => setPassword({ ...password, passwordAgain: e.target.value })} />
                    </div>

                    <ModalTransitionContainer modalOpen={success}>
                        <PurchaseSuccess />
                    </ModalTransitionContainer>

                    <button onClick={handleChangePassword} className="primary-button w-44">Change Password</button>
                </div>
            </div>
        </div>
    )
}
