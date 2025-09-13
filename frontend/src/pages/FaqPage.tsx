import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Register" button in the navigation bar. Fill in your personal information including name, email, and password. You\'ll receive a confirmation email to verify your account before you can start using the platform.'
    },
    {
      question: 'How do I enroll in a course?',
      answer: 'Once you\'re logged in, browse our course catalog or use the search feature to find courses that interest you. Click on any course to view its details, then click the "Enroll Now" button. You\'ll have immediate access to the course materials.'
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works seamlessly on smartphones and tablets. You can also download our mobile app from the App Store or Google Play Store for an enhanced mobile learning experience.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked as you complete lessons, quizzes, and assignments. You can view your progress in the "My Courses" section of your dashboard, which shows completion percentages and time spent on each course.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all courses. If you\'re not satisfied with your purchase, contact our support team within 30 days for a full refund. Some restrictions may apply to certain promotional courses.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on the "Login" button and then select "Forgot Password." Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      question: 'Do you offer certificates upon completion?',
      answer: 'Yes! Upon successful completion of a course, you\'ll receive a digital certificate that you can download and share on your professional profiles like LinkedIn. Certificates include your name, course title, and completion date.'
    },
    {
      question: 'Can I access course materials offline?',
      answer: 'Some course materials can be downloaded for offline viewing, including PDFs, presentations, and reading materials. Video content requires an internet connection. Check each course\'s download options in the course materials section.'
    },
    {
      question: 'How do I contact instructors?',
      answer: 'You can contact instructors through the course discussion forums or by sending direct messages within each course. Instructors typically respond within 24-48 hours during business days.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Find quick answers to the most common questions about our Learning Management System.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you with any additional questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Contact Support
              </button>
              <button 
                onClick={() => navigate('/help')}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Visit Help Center
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">&lt; 2hrs</div>
            <div className="text-gray-600">Average Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;