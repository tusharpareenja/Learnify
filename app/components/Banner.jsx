"use client"
import React, { useState } from 'react';
import LoginPage from './Login'; // Import your Login component

function Banner() {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStartedClick = () => {
    setShowLogin(true);
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-purple-500">
            AI Course Generator
            <strong className="font-extrabold text-black sm:block">
              Custom Learning Paths Powered by AI
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Unlock personalized education with AI-Driven course creation. Tailor your learning journey to fit your unique goals and pace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded px-12 py-3 bg-purple-400 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the Login component */}
      {showLogin && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <LoginPage />
          </div>
        </div>
      )}
    </section>
  );
}

export default Banner;
