import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Filter from "../components/Filter";

interface Category {
  _id: string;
  name: string;
}

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

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const { user } = useAuth();

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const queryString = params.toString();
      const url = `/api/courses${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        setError("Failed to load courses. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters((prev) => {
      // Compare values to avoid unnecessary updates
      if (
        prev.search === newFilters.search &&
        prev.category === newFilters.category &&
        prev.minPrice === newFilters.minPrice &&
        prev.maxPrice === newFilters.maxPrice
      ) {
        return prev; // Return existing reference - no update/re-render
      }
      return newFilters; // New values - update
    });
  }, []);

  // Initial data fetch - only runs once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch categories only
        const categoriesResponse = await fetch("/api/categories", {
          credentials: "include",
        });

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array - only runs once on mount

  // Fetch courses when filters change (including initial mount)
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // No need for categories.length dep

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Courses
          </h1>
          <p className="text-xl text-gray-600">
            Discover and enroll in our comprehensive courses
          </p>
        </div>

        {/* Filter Component */}
        <Filter onFilterChange={handleFilterChange} categories={categories} />

        {/* Error, Loading, No Courses, or Courses List */}
        {error ? (
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Available Courses
                </h1>
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg inline-block">
                  <p className="text-lg">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Available Courses
                </h1>
                <p className="text-xl text-gray-600">Loading courses...</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses available
              </h3>
              <p className="text-gray-500 mb-4">
                Check back later for new courses.
              </p>
              {user && user.role === "admin" && (
                <Link
                  to="/create-course"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create First Course
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Link to={`/courses/${course.id}`}>
                        <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-2 line-clamp-2 cursor-pointer">
                          {course.title}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 text-center rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.category?.name || "Uncategorized"}
                        </span>
                        {course.level && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {course.level.charAt(0).toUpperCase() +
                              course.level.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description || "No description available."}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Instructor: {course.instructor?.name || "Unknown"}
                    </div>
                    {course.duration && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Duration: {course.duration}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Created: {formatDate(course.createdAt)}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-center text-gray-900">
                    {formatPrice(course.price)}
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="px-4 py-2 border border-transparent text-sm text-center font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action - Only show for admin users */}
        {user && user.role === "admin" && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Share Your Knowledge?
              </h2>
              <p className="text-gray-600 mb-6">
                Join our community of instructors and create engaging courses
                for students worldwide.
              </p>
              <Link
                to="/create-course"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Create a Course
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
