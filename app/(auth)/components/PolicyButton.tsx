import React from 'react'

export default function PolicyButton() {
    return (
        <div className="flex items-center">
            <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primaryPurple focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
            >
                I agree to the{' '}
                <a href="#" className="text-primaryPurple hover:text-indigo-500">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primaryPurple hover:text-indigo-500">
                    Privacy Policy
                </a>
            </label>
        </div>
    )
}
