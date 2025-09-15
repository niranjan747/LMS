import Enrollment from '../models/EnrollmentModel.js';
import Course from '../models/CourseModel.js';
import User from '../models/UserModel.js';

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({
        message: 'Only students can enroll in courses'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: { $in: ['active', 'completed'] }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: existingEnrollment.status === 'completed'
          ? 'You have already completed this course'
          : 'You are already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      status: 'active',
      progress: 0
    });

    // Populate the enrollment data
    await enrollment.populate([
      { path: 'student', select: 'name email' },
      { path: 'course', select: 'title description price duration level' }
    ]);

    res.status(201).json({
      message: 'Successfully enrolled in course',
      enrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      message: 'Error enrolling in course',
      error: error.message
    });
  }
};

// Unenroll from a course
export const unenrollFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    // Find and update enrollment status to cancelled
    const enrollment = await Enrollment.findOneAndUpdate(
      {
        student: studentId,
        course: courseId,
        status: 'active'
      },
      { status: 'cancelled' },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        message: 'Active enrollment not found'
      });
    }

    res.json({
      message: 'Successfully unenrolled from course',
      enrollment
    });
  } catch (error) {
    console.error('Unenrollment error:', error);
    res.status(500).json({
      message: 'Error unenrolling from course',
      error: error.message
    });
  }
};

// Get user's enrollments
export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;

    // Check if user can access this data
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: 'course',
        select: 'title description price duration level category instructor',
        populate: [
          { path: 'category', select: 'name' },
          { path: 'instructor', select: 'name email' }
        ]
      })
      .sort({ enrollmentDate: -1 });

    res.json(enrollments);
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

// Get course enrollments (for instructors and admins)
export const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the instructor or admin
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate({
        path: 'student',
        select: 'name email avatarUrl'
      })
      .sort({ enrollmentDate: -1 });

    res.json(enrollments);
  } catch (error) {
    console.error('Get course enrollments error:', error);
    res.status(500).json({
      message: 'Error fetching course enrollments',
      error: error.message
    });
  }
};

// Update enrollment progress
export const updateEnrollmentProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;
    const studentId = req.user.id;

    // Validate progress
    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        message: 'Progress must be between 0 and 100'
      });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { student: studentId, course: courseId, status: 'active' },
      {
        progress,
        ...(progress === 100 && {
          status: 'completed',
          completedAt: new Date()
        })
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        message: 'Active enrollment not found'
      });
    }

    res.json({
      message: progress === 100
        ? 'Course completed successfully!'
        : 'Progress updated successfully',
      enrollment
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      message: 'Error updating progress',
      error: error.message
    });
  }
};

// Check enrollment status
export const checkEnrollmentStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (!enrollment) {
      return res.json({
        enrolled: false,
        status: null,
        progress: 0
      });
    }

    res.json({
      enrolled: true,
      status: enrollment.status,
      progress: enrollment.progress,
      enrollmentDate: enrollment.enrollmentDate,
      completedAt: enrollment.completedAt
    });
  } catch (error) {
    console.error('Check enrollment status error:', error);
    res.status(500).json({
      message: 'Error checking enrollment status',
      error: error.message
    });
  }
};