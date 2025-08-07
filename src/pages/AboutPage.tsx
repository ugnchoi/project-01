import React from 'react';
import Card from '../components/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Project 01
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A modern web application built with cutting-edge technologies to provide 
          the best development experience and user interface.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-8">
        <Card title="Our Mission" className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            We believe in creating web applications that are not only functional but also 
            beautiful and accessible. Our mission is to provide developers with a solid 
            foundation that follows modern best practices and enables rapid development 
            of scalable applications.
          </p>
        </Card>
      </section>

      {/* Technology Stack */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="React 18" className="text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69a2.236 2.236 0 0 1 2.235 2.236 2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.236-2.236zm-5.477 0a2.236 2.236 0 0 1 2.235 2.236 2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.236-2.236z"/>
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Modern React with hooks and functional components
              </p>
            </div>
          </Card>

          <Card title="TypeScript" className="text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <p className="text-gray-600 text-sm">
                Type-safe development with enhanced IDE support
              </p>
            </div>
          </Card>

          <Card title="Tailwind CSS" className="text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Utility-first CSS framework for rapid development
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Development Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Frontend Developer" className="text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
              <h3 className="font-semibold text-gray-900">Senior Developer</h3>
              <p className="text-gray-600 text-sm">
                Expert in React, TypeScript, and modern web technologies
              </p>
            </div>
          </Card>

          <Card title="UI/UX Designer" className="text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
              <h3 className="font-semibold text-gray-900">Design Specialist</h3>
              <p className="text-gray-600 text-sm">
                Creating beautiful and accessible user interfaces
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 