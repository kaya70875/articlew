import ModalComp from '@/components/ModalComp'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PurchaseSuccess() {

  const router = useRouter();

  return (
    <ModalComp onClose={() => router.replace('/account')} buttonTitle='Close' createNewCategory={() => router.replace('/account')} modalTitle='🎉 Welcome to Premium!'>
      <p className="mb-4 text-gray-700">
        Thank you for subscribing! You now have access to all premium features:
      </p>

      <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
        <li><strong>Unlimited sentence generation</strong> across all topics</li>
        <li><strong>Advanced article learning tools</strong> for deeper understanding</li>
        <li><strong>Search and save custom vocabulary</strong> for personalized practice</li>
        <li><strong>Writing suggestions</strong> to improve your English writing</li>
        <li><strong>Priority updates</strong> and early access to new features</li>
      </ul>

      <p className="mb-4 text-gray-700">
        Your subscription is active and will renew monthly. You can manage or cancel it anytime from your
        <a href="/account" className="text-blue-600 hover:underline"> Account Settings</a>.
      </p>

      <p className="text-gray-600">
        If you have any questions or feedback, feel free to reach out — we are here to help!
      </p>

      <div className="font-semibold mt-6 text-center text-xl text-primaryPurple">
        Enjoy your learning journey!
      </div>

    </ModalComp>
  )
}
