import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration?: string;
  level?: string;
  category: {
    _id: string;
    name: string;
  };
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollmentStatus, setEnrollmentStatus] = useState<{
    enrolled: boolean;
    status: string | null;
    progress: number;
  } | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('Course ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${id}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else if (response.status === 404) {
          setError('Course not found');
        } else {
          setError('Failed to load course details. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Check enrollment status when course and user are loaded
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!id || !user || !course) return;

      try {
        const response = await fetch(`/api/enrollments/courses/${id}/status`, {
          credentials: 'include',
        });

        if (response.ok) {
          const status = await response.json();
          setEnrollmentStatus(status);
        }
      } catch (err) {
        console.error('Error checking enrollment status:', err);
      }
    };

    checkEnrollmentStatus();
  }, [id, user, course]);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({ type: null, text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const dismissMessage = () => {
    setMessage({ type: null, text: '' });
  };

  const handleEnroll = async () => {
    if (!user || !course) return;

    // Check if user is a student
    if (user.role !== 'student') {
      setMessage({
        type: 'error',
        text: 'Only students can enroll in courses.'
      });
      return;
    }

    setEnrolling(true);
    setMessage({ type: null, text: '' });

    try {
      const response = await fetch(`/api/enrollments/courses/${course.id}/enroll`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentStatus({
          enrolled: true,
          status: 'active',
          progress: 0,
        });
        setMessage({
          type: 'success',
          text: 'Successfully enrolled in the course!'
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to enroll in course. Please try again.'
        });
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setMessage({
        type: 'error',
        text: 'Network error. Please try again later.'
      });
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!user || !course) return;

    setEnrolling(true);
    setMessage({ type: null, text: '' });

    try {
      const response = await fetch(`/api/enrollments/courses/${course.id}/enroll`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentStatus({
          enrolled: false,
          status: null,
          progress: 0,
        });
        setMessage({
          type: 'success',
          text: 'Successfully unenrolled from the course.'
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to unenroll from course. Please try again.'
        });
      }
    } catch (error) {
      console.error('Unenrollment error:', error);
      setMessage({
        type: 'error',
        text: 'Network error. Please try again later.'
      });
    } finally {
      setEnrolling(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg inline-block">
              <p className="text-lg mb-4">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/courses')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Back to Courses
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Course not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>
        </div>

        {/* Notification Messages */}
        {message.type && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <svg
                className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  message.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {message.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <p className="text-sm font-medium">{message.text}</p>
            </div>
            <button
              onClick={dismissMessage}
              className={`ml-4 p-1 rounded-full hover:bg-opacity-20 ${
                message.type === 'success' ? 'hover:bg-green-200' : 'hover:bg-red-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {course.category?.name || 'Uncategorized'}
                </span>
                {course.level && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)} Level
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Created on {formatDate(course.createdAt)}
                </span>
              </div>

              <div className="text-4xl font-bold text-gray-900 mb-6">
                {formatPrice(course.price)}
              </div>
            </div>

            <div className="lg:ml-8 lg:text-right">
              {user && user.role === 'student' ? (
                enrollmentStatus?.enrolled ? (
                  <div className="space-y-2">
                    <div className="text-sm text-green-600 font-medium">
                      {enrollmentStatus.status === 'completed' ? '✓ Completed' : 'Enrolled'}
                    </div>
                    {enrollmentStatus.status === 'active' && (
                      <div className="text-sm text-gray-600">
                        Progress: {enrollmentStatus.progress}%
                      </div>
                    )}
                    {enrollmentStatus.status === 'active' && (
                      <button
                        onClick={handleUnenroll}
                        disabled={enrolling}
                        className="w-full lg:w-auto inline-flex items-center justify-center px-8 py-3 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enrolling ? 'Processing...' : 'Unenroll'}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full lg:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )
              ) : user ? (
                <div className="text-sm text-gray-500">
                  {user.role === 'instructor' ? 'Instructors cannot enroll in courses' : 'Admin access'}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-full lg:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Login to Enroll
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {course.description || 'No description available for this course.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Details</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instructor</p>
                    <p className="text-sm text-gray-600">{course.instructor?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{course.instructor?.email || ''}</p>
                  </div>
                </div>

                {course.duration && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">{course.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Category</p>
                    <p className="text-sm text-gray-600">{course.category?.name || 'Uncategorized'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Price</p>
                    <p className="text-sm text-gray-600">{formatPrice(course.price)}</p>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              {user && user.role === 'admin' && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Admin Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Edit Course
                    </button>
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                      Delete Course
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;