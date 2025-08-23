'use client';

import React, { useState } from 'react';
import AuthHero from '../components/AuthHero';
import AuthFormError from '../components/AuthFormError';
import SignUpForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

export type TAB = 'signup' | 'login';


export default function Page() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<TAB>('signup');

  const activeTabStyles = 'px-6 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium';
  const passiveTabStyles = 'px-6 py-2 text-gray-500 hover:text-indigo-600 transition-colors';

  return (
    <section id="auth" className="w-full py-12 md:py-24 bg-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {currentTab == 'signup' ? (
            <AuthHero title='Join Our Community of Learners' desc='Create an account to save your progress, sync across devices, and access personalized learning features.' featuresSection />
          ) : (
            <AuthHero title='Welcome Back Learner !' desc='Login to your account and continue to learn new words with ease.' />
          )}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center space-x-4 mb-8">
              <button className={`${currentTab == 'signup' ? activeTabStyles : passiveTabStyles}`} onClick={() => setCurrentTab('signup')}>
                Sign Up
              </button>
              <button className={`${currentTab == 'login' ? activeTabStyles : passiveTabStyles}`} onClick={() => setCurrentTab('login')}>
                Log In
              </button>
            </div>
            <AuthFormError errorMessage={errorMessage} />

            {currentTab == 'signup' ? (
              <SignUpForm setErrorMessage={setErrorMessage} />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </section >
  );
}
