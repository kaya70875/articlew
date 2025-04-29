import React from 'react';

export const dynamic = 'force-static';

const PrivacyPolicyPage = () => {
    return (
        <div className="flex flex-col gap-4 w-full justify-center p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p>Last updated: April 29, 2025</p>

            <p>
                Welcome to LearnWithArticles! Your privacy is important to us. This Privacy Policy
                explains how we collect, use, and protect your information.
            </p>

            <h3 className="text-xl font-semibold">Information We Collect</h3>
            <ul className="list-disc pl-6">
                <li>Personal information you provide to us (e.g., name, email address).</li>
                <li>Usage data such as pages visited, time spent, and interactions.</li>
                <li>Technical data like browser type, IP address, and device information.</li>
            </ul>

            <h3 className="text-xl font-semibold">How We Use Your Information</h3>
            <ul className="list-disc pl-6">
                <li>To provide, maintain, and improve our services.</li>
                <li>To communicate with you regarding updates, support, or promotions.</li>
                <li>To analyze user behavior and enhance user experience.</li>
            </ul>

            <h3 className="text-xl font-semibold">Cookies and Analytics</h3>
            <p>
                We use cookies and analytics tools (like Google Analytics) to track usage and improve the
                app. You can disable cookies through your browser settings.
            </p>

            <h3 className="text-xl font-semibold">AI Features and Third-Party APIs</h3>
            <p>
                Some features use third-party AI services (e.g., OpenAI) to generate content based on user
                input. These services may process text but we do not store or share this data ourselves.
            </p>

            <h3 className="text-xl font-semibold">Advertising and Tracking</h3>
            <p>
                We may use services like Google AdSense to display ads. These services may collect data for
                personalization and tracking. You can manage your ad preferences through your browser or
                Google account.
            </p>

            <h3 className="text-xl font-semibold">Sharing Your Information</h3>
            <p>
                We do not sell your personal information. We may share limited data with service providers
                (e.g., analytics, hosting) strictly to support app functionality.
            </p>

            <h3 className="text-xl font-semibold">Children`s Privacy</h3>
            <p>
                Our service is not intended for children under the age of 13. We do not knowingly collect
                data from children. If you believe we have done so, please contact us.
            </p>

            <h3 className="text-xl font-semibold">Your Rights</h3>
            <p>
                You have the right to access, update, or delete your personal information. Contact us at
                any time to make a request.
            </p>

            <h3 className="text-xl font-semibold">Security</h3>
            <p>
                We take reasonable measures to protect your data, but no internet transmission is ever 100%
                secure. Use our service at your own discretion.
            </p>

            <h3 className="text-xl font-semibold">Changes to This Policy</h3>
            <p>
                We may update this Privacy Policy as needed. Changes will be posted here, and your
                continued use of the service implies agreement.
            </p>

            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p>
                If you have questions about this Privacy Policy, contact us at:{' '}
                <a href="mailto:support@learnwitharticles.com" className="text-blue-600 underline">
                    support@learnwitharticles.com
                </a>
            </p>
        </div>
    );
};

export default PrivacyPolicyPage;
