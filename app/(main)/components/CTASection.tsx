import React from 'react'
export default function CTASection() {
    return (
        <section className="w-full py-12 md:py-24 bg-primaryPurple">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-4">
                    Ready to Improve Your English?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-indigo-100 mb-8">
                    Join thousands of learners who are mastering English with
                    learnwitharticles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary text-primaryPurple shadow transition-colors hover:bg-indigo-50">
                        Start Learning Now
                    </button>
                    <button className="inline-flex h-12 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
