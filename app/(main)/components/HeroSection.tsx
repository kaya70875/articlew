import React from 'react'
import { BookOpenIcon, CheckCircleIcon, SparklesIcon } from 'lucide-react'
import GoogleAuthButton from '@/components/auth/buttons/GoogleAuthButton'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="w-full py-4 md:py-8 lg:py-16  bg-gradient-to-b from-main to-indigo-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-start text-left">
                        <div className="inline-flex items-center rounded-lg bg-indigo-100 px-3 py-1 text-sm text-primaryPurple mb-4">
                            <SparklesIcon className="mr-1 h-4 w-4" />
                            <span>AI-Powered Language Learning</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 mb-4">
                            Master English,{' '}
                            <span className="text-primaryPurple">One Word at a Time</span>
                        </h1>
                        <p className="max-w-[600px] text-lg text-gray-600 mb-6">
                            Learn English naturally through articles you love. Our AI analyzes
                            words in context, helps you fix sentences, and adapts to your
                            skill level.
                        </p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-primaryPurple mr-2" />
                                <span className="text-gray-700">
                                    Learn from real-world content you enjoy
                                </span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-primaryPurple mr-2" />
                                <span className="text-gray-700">
                                    AI-powered analysis and feedback
                                </span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-primaryPurple mr-2" />
                                <span className="text-gray-700">
                                    Practice writing with instant corrections
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={'/signup'} className="inline-flex h-12 items-center justify-center rounded-md bg-primaryPurple px-8 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryPurple">
                                Start Learning Now
                            </Link>
                            <GoogleAuthButton />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-start lg:justify-center">
                        <div className="absolute -z-10 h-72 w-72 bg-indigo-100 rounded-full blur-3xl opacity-70"></div>
                        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full max-w-md">
                            <div className="bg-primaryPurple rounded-lg p-3 flex items-center mb-3">
                                <BookOpenIcon className="h-6 w-6 text-white mr-2" />
                                <span className="text-white font-medium">
                                    learnwitharticles
                                </span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-3">
                                <p className="text-gray-800 mb-2">
                                    The{' '}
                                    <span className="font-medium text-primaryPurple">
                                        unprecedented
                                    </span>{' '}
                                    growth of technology has transformed how we learn languages.
                                </p>
                                <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                        unprecedented
                                    </p>
                                    <p className="text-xs text-gray-600 mb-2">
                                        adjective | /ʌnˈpresɪdentɪd/
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Never having happened or existed before; completely new
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between p-2">
                                <button className="text-xs bg-indigo-50 text-primaryPurple px-3 py-1 rounded-md">
                                    Save
                                </button>
                                <button className="text-xs bg-primaryPurple text-white px-3 py-1 rounded-md">
                                    Practice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}