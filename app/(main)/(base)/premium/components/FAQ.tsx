import React, { useState } from 'react';

const faqs = [
    {
        question: "Which payments do you accept ?",
        answer: "For now we accept Paypal, Apple pay and Bancontact"
    },
    {
        question: "Do you offer refunds?",
        answer: "We do not offer refunds for any of our plans. However, you can cancel your subscription at any time before the next billing cycle.",
    },
    {
        question: 'How does the sentence generation work?',
        answer: 'Our platform uses AI and real-time content crawling to find and generate example sentences based on your input word. These are sourced from trusted article websites and filtered for quality.',
    },
    {
        question: 'What tools does the platform offer?',
        answer: 'We offer powerful AI tools including sentence paraphrasing, grammar fixing, and word comparison to help you write and understand English more effectively.',
    },
    {
        question: 'Is Articlew free to use?',
        answer: 'Yes! You can start using the core features for free. We also offer premium plans for advanced tools and more personalized learning.',
    },
    {
        question: 'Can I cancel my subscription?',
        answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will remain active until the end of your billing cycle.',
    },
];


export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-5xl p-5">
            <p className="text-2xl font-bold mb-5 text-center">Frequently Asked Questions</p>
            <ul className="space-y-4">
                {faqs.map((faq, index) => (
                    <li key={index} className="border-b pb-3">
                        <h3
                            className="text-lg font-bold flex justify-between items-center cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="ml-2 text-lg">{openIndex === index ? '-' : '+'}</span>
                        </h3>
                        {openIndex === index && (
                            <p className="mt-2 text-base leading-relaxed">{faq.answer}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
