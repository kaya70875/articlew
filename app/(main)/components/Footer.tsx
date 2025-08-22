import React from 'react'
import {
    BookOpenIcon,
    GithubIcon,
    TwitterIcon,
    InstagramIcon,
} from 'lucide-react'
export function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpenIcon className="h-6 w-6 text-primaryPurple" />
                            <span className="text-lg font-bold text-primaryText">
                                learnwitharticles
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            The smarter way to build your English vocabulary through
                            context-based learning.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primaryPurple">
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primaryPurple">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primaryPurple">
                                <GithubIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primaryText mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#features"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Premium
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Mobile App
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Browser Extension
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primaryText mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primaryText mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-primaryPurple"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-600 mb-4 md:mb-0">
                        © 2023 learnwitharticles. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-sm text-gray-600 hover:text-primaryPurple">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-primaryPurple">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-primaryPurple">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
