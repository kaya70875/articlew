import React from 'react'
import IconGit from '@/components/svg/landing/IconGit';
import IconMail from '@/components/svg/landing/IconMail';
import IconLinkedin from '@/components/svg/landing/IconLinkedin';
import Link from 'next/link';
import Logo from '@/components/reusables/Logo';

export default function Footer() {

    const socials = [
        {
            name: 'github',
            icon: (<IconGit />),
            direct: 'https://github.com/kaya70875',
        },
        {
            name: 'gmail',
            icon: (<IconMail />),
            direct: 'mailto:kaya70875@gmail.com',
        },
        {
            name: 'linkedin',
            icon: (<IconLinkedin />),
            direct: 'https://www.linkedin.com/in/kaya70875/',
        },
    ]

    const explore = ['Premium', 'Blog', 'FAQs'];
    const features = ['Search', 'Rewrite', 'Sentence Fix', 'Paraphrase', 'Compare']

    return (
        <div className='w-full bg-primaryText p-4 md:p-8 flex flex-col gap-6 md:gap-0 items-center md:items-stretch md:flex-row justify-around'>
            <section className="main flex flex-col gap-4">
                <Logo textColor='text-whitef' className='flex items-center justify-center md:justify-start w-full' />
                <div className="socials flex items-center justify-center md:justify-start gap-4">
                    {socials.map((social, i) => (
                        <Link href={social.direct} className='text-whitef cursor-pointer hover:opacity-50 transition-all duration-150 ease-in' key={i}>{social.icon}</Link>
                    ))}
                </div>
                <p className='text-xs text-whitef'>© 2025 learnwitharticles. All rights reserved.</p>

                <div className="policy flex flex-col md:flex-row items-center gap-2 text-whitef underline text-sm">
                    <Link href='/privacy-policy'>Privacy Policy</Link>
                    <Link href='/terms'>Term Of Use</Link>
                </div>
            </section>
            <section className="middle flex justify-center md:justify-between w-1/6 gap-4">
                <div className="explore flex flex-col gap-4">
                    <p className='text-whitef font-semibold'>Explore</p>
                    <ul className='flex flex-col gap-2 text-whitef'>
                        {explore.map((item, i) => (
                            <li className='cursor-pointer hover:opacity-80 transition-all duration-150 ease-in' key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="features flex flex-col gap-4">
                    <p className='text-whitef font-semibold'>Features</p>
                    <ul className='flex flex-col gap-2 text-whitef'>
                        {features.map((item, i) => (
                            <li className='cursor-pointer hover:opacity-80 transition-all duration-150 ease-in' key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="news flex flex-col gap-4">
                <p className='text-whitef font-semibold'>Get Latest News</p>
                <div className="mail-input flex">
                    <input type="text" className='py-2 outline-none px-4 rounded-xl rounded-r-none' />
                    <button className='text-whitef bg-primaryBlue p-2 px-4 rounded-tl-none rounded-bl-none rounded-xl'>OK</button>
                </div>
            </section>
        </div>
    )
}
