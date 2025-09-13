import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const helpTopics = [
    {
      title: 'Getting Started',
      icon: '🚀',
      description: 'Learn the basics of using our Learning Management System',
      topics: [
        'Creating your account',
        'Navigating the dashboard',
        'Enrolling in courses',
        'Setting up your profile'
      ]
    },
    {
      title: 'Course Management',
      icon: '📚',
      description: 'Everything you need to know about managing your courses',
      topics: [
        'Accessing course materials',
        'Submitting assignments',
        'Tracking your progress',
        'Viewing grades and feedback'
      ]
    },
    {
      title: 'Technical Support',
      icon: '🛠️',
      description: 'Technical issues and troubleshooting guides',
      topics: [
        'Browser compatibility',
        'Video playback issues',
        'Download problems',
        'Mobile app support'
      ]
    },
    {
      title: 'Account & Billing',
      icon: '💳',
      description: 'Manage your account settings and billing information',
      topics: [
        'Updating payment methods',
        'Viewing billing history',
        'Managing subscriptions',
        'Account security settings'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find answers to your questions and get the support you need to succeed in your learning journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Search for Help</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for topics, articles, or questions..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{topic.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{topic.description}</p>
                <ul className="space-y-2">
                  {topic.topics.map((subTopic, subIndex) => (
                    <li key={subIndex} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {subTopic}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Explore {topic.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Contact Support
              </button>
              <button 
                onClick={() => navigate('/faq')}
                className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;