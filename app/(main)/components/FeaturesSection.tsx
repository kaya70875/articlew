import { BarChartIcon, BookOpenIcon, BrainCircuitIcon, FilterIcon, NotebookPenIcon, StarIcon, UsersIcon } from 'lucide-react'
import React from 'react'

export default function FeaturesSection() {

    const features = [
        {
            icon: <BookOpenIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'Learn from Articles',
            description:
                'Learn new words and phrases through real-world articles from various sources that interest you.',
        },
        {
            icon: <BrainCircuitIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'AI Word Analysis',
            description:
                'Get detailed AI-powered analysis of words and their usage in context to deepen understanding.',
        },
        {
            icon: <StarIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'Favorites',
            description:
                'Save your favorite words and phrases to revisit and practice later with personalized flashcards.',
        },
        {
            icon: <FilterIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'Difficulty Levels',
            description:
                'Filter articles and words based on difficulty level to match your learning progress.',
        },
        {
            icon: <BarChartIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'Progress Tracking',
            description:
                'Track your vocabulary growth and learning progress with detailed analytics and insights.',
        },
        {
            icon: <NotebookPenIcon className="h-8 w-8 text-primaryPurple" />,
            title: 'Vocabulary Building',
            description:
                'Build your vocabulary systematically with spaced repetition and personalized practice exercises.',
        }
    ]

    return (
        <section id="features" className="w-full py-12 md:py-24 bg-main">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primaryText">
                            Powerful Features
                        </h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                            Enhance your vocabulary through context-based learning with
                            articles you love
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="mb-4 p-3 bg-indigo-50 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-primaryText">
                                {feature.title}
                            </h3>
                            <p className="text-center text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
