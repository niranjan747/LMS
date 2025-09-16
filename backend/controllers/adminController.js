import User from '../models/UserModel.js';
import Course from '../models/CourseModel.js';
import Enrollment from '../models/EnrollmentModel.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students with their enrolled courses
export const getStudentsWithEnrollments = async (req, res) => {
  try {
    const students = await User.aggregate([
      // Match only students
      { $match: { role: 'student' } },

      // Lookup enrollments for this student
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'student',
          as: 'enrollments'
        }
      },

      // Lookup courses from enrollments
      {
        $lookup: {
          from: 'courses',
          localField: 'enrollments.course',
          foreignField: '_id',
          as: 'enrolledCourses',
          pipeline: [
            {
              $project: {
                title: 1,
                category: 1,
                createdAt: 1
              }
            }
          ]
        }
      },

      // Project fields (exclude password and internal fields)
      {
        $project: {
          passwordHash: 0,
          __v: 0
        }
      },

      // Sort by createdAt descending
      { $sort: { createdAt: -1 } }
    ]);

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all instructors with their courses and student counts
export const getInstructorsWithStats = async (req, res) => {
  try {
    const instructors = await User.aggregate([
      // Match only instructors
      { $match: { role: 'instructor' } },

      // Lookup courses taught by this instructor with enrollment counts
      {
        $lookup: {
          from: 'courses',
          let: { instructorId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$instructor', '$$instructorId'] } } },
            {
              $lookup: {
                from: 'enrollments',
                localField: '_id',
                foreignField: 'course',
                as: 'enrollments'
              }
            },
            {
              $addFields: {
                enrolledStudentsCount: { $size: '$enrollments' }
              }
            },
            {
              $project: {
                title: 1,
                category: 1,
                createdAt: 1,
                enrolledStudentsCount: 1
              }
            }
          ],
          as: 'createdCourses'
        }
      },

      // Calculate total students across all courses
      {
        $addFields: {
          totalStudents: {
            $sum: '$createdCourses.enrolledStudentsCount'
          }
        }
      },

      // Project fields (exclude password and internal fields)
      {
        $project: {
          passwordHash: 0,
          __v: 0
        }
      },

      // Sort by createdAt descending
      { $sort: { createdAt: -1 } }
    ]);

    res.json(instructors);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all courses with populated data
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      // Lookup instructor details
      {
        $lookup: {
          from: 'users',
          localField: 'instructor',
          foreignField: '_id',
          as: 'instructor',
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1
              }
            }
          ]
        }
      },

      // Convert instructor array to object (since it should be a single instructor)
      {
        $addFields: {
          instructor: { $arrayElemAt: ['$instructor', 0] }
        }
      },

      // Lookup category details
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [
            {
              $project: {
                name: 1
              }
            }
          ]
        }
      },

      // Convert category array to object (since it should be a single category)
      {
        $addFields: {
          category: { $arrayElemAt: ['$category', 0] }
        }
      },

      // Lookup enrollments to get enrolled students
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course',
          as: 'enrollments'
        }
      },

      // Extract enrolled students from enrollments
      {
        $addFields: {
          enrolledStudents: {
            $map: {
              input: '$enrollments',
              as: 'enrollment',
              in: '$$enrollment.student'
            }
          }
        }
      },

      // Project final fields including course _id
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          price: 1,
          duration: 1,
          level: 1,
          instructor: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
          enrolledStudents: 1
        }
      },

      // Sort by createdAt descending
      { $sort: { createdAt: -1 } }
    ]);

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};