import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HomePage: React.FC = () => {
  const handleGetStarted = () => {
    console.log('Get Started clicked');
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Project 01</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern web application built with React, TypeScript, and Tailwind
            CSS. Start building something amazing today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={handleGetStarted}
              className="w-full sm:w-auto"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLearnMore}
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="React + TypeScript" className="text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Built with React 18 and TypeScript for type safety and better
                developer experience.
              </p>
            </div>
          </Card>

          <Card title="Tailwind CSS" className="text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Utility-first CSS framework for rapid UI development with
                beautiful, responsive designs.
              </p>
            </div>
          </Card>

          <Card title="Vite Build Tool" className="text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Lightning-fast build tool with hot module replacement for
                instant development feedback.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers building amazing web applications with
          modern tools and frameworks.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleGetStarted}
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Start Building
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
