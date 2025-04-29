import React from 'react';

export const dynamic = 'force-static';

const TermsOfServicePage = () => {
    return (
        <div className="flex flex-col gap-4 w-full justify-center p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p>Last updated: April 29, 2025</p>

            <p>
                These Terms of Service Terms govern your use of LearnWithArticles the Service
                provided by us we, our, or us. By using the Service, you agree to these Terms. If
                you do not agree, please do not use the Service.
            </p>

            <h3 className="text-xl font-semibold">1. Use of the Service</h3>
            <p>
                You agree to use the Service only for lawful purposes and in accordance with these Terms.
                You must not use the Service to distribute harmful, offensive, or illegal content.
            </p>

            <h3 className="text-xl font-semibold">2. Accounts</h3>
            <p>
                To access certain features, you may be required to create an account. You are responsible
                for maintaining the confidentiality of your account information and for all activities that
                occur under your account.
            </p>

            <h3 className="text-xl font-semibold">3. Subscriptions and Payments</h3>
            <p>
                Some features may require a paid subscription (e.g., Premium or Premium Plus). Payments are
                handled through our third-party providers. We do not store your payment information.
            </p>

            <h3 className="text-xl font-semibold">4. AI-Generated Content</h3>
            <p>
                Our app uses AI to generate content based on your input. This content is generated
                automatically and may not always be accurate, complete, or appropriate. You are responsible
                for how you use this content.
            </p>

            <h3 className="text-xl font-semibold">5. Intellectual Property</h3>
            <p>
                The Service and its original content, features, and functionality are and will remain the
                exclusive property of LearnWithArticles. You may not copy, modify, or distribute our
                content without permission.
            </p>

            <h3 className="text-xl font-semibold">6. Termination</h3>
            <p>
                We may suspend or terminate your account if you violate these Terms or if we believe your
                actions may cause harm to the Service or other users.
            </p>

            <h3 className="text-xl font-semibold">7. Disclaimer of Warranties</h3>
            <p>
                The Service is provided on an as is and as available basis. We do not guarantee that it
                will be uninterrupted, error-free, or secure. Use the Service at your own risk.
            </p>

            <h3 className="text-xl font-semibold">8. Limitation of Liability</h3>
            <p>
                We shall not be held liable for any damages arising from your use of the Service, including
                but not limited to loss of data, revenue, or other damages, even if we were advised of the
                possibility.
            </p>

            <h3 className="text-xl font-semibold">9. Changes to These Terms</h3>
            <p>
                We may modify these Terms at any time. We will post the updated version on this page, and
                your continued use of the Service means you accept the changes.
            </p>

            <h3 className="text-xl font-semibold">10. Contact</h3>
            <p>
                If you have any questions about these Terms, please contact us at:{' '}
                <a href="mailto:support@learnwitharticles.com" className="text-blue-600 underline">
                    support@learnwitharticles.com
                </a>
            </p>
        </div>
    );
};

export default TermsOfServicePage;
