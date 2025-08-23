import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import React from 'react'

export default function SignupFeatures() {
    return (
        <div className="flex flex-col space-y-3 mt-4">
            <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                    <UserIcon className="h-5 w-5 text-primaryPurple" />
                </div>
                <p className="text-gray-700">
                    Personalized learning experience
                </p>
            </div>
            <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                    <LockIcon className="h-5 w-5 text-primaryPurple" />
                </div>
                <p className="text-gray-700">Secure and private account</p>
            </div>
            <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                    <MailIcon className="h-5 w-5 text-primaryPurple" />
                </div>
                <p className="text-gray-700">Weekly progress reports</p>
            </div>
        </div>
    )
}
