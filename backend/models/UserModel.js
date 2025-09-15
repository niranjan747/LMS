import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // exclude by default
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Note: unique index is already enforced via the email field's `unique: true`.

// Hide internal fields in JSON
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Virtual for enrollments (courses the user is enrolled in)
userSchema.virtual('enrollments', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'student',
});

// Virtual for courses taught by instructor
userSchema.virtual('taughtCourses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'instructor',
});

// Method to check if user is enrolled in a specific course
userSchema.methods.isEnrolledIn = async function(courseId) {
  const Enrollment = mongoose.model('Enrollment');
  const enrollment = await Enrollment.findOne({
    student: this._id,
    course: courseId,
    status: 'active'
  });
  return !!enrollment;
};

// Method to get user's enrollment statistics
userSchema.methods.getEnrollmentStats = async function() {
  if (this.role !== 'student') return null;

  const Enrollment = mongoose.model('Enrollment');
  const stats = await Enrollment.aggregate([
    { $match: { student: this._id } },
    {
      $group: {
        _id: null,
        totalEnrollments: { $sum: 1 },
        activeEnrollments: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        completedEnrollments: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        avgProgress: { $avg: '$progress' },
      },
    },
  ]);
  return stats[0] || {
    totalEnrollments: 0,
    activeEnrollments: 0,
    completedEnrollments: 0,
    avgProgress: 0,
  };
};

// Method to get instructor statistics
userSchema.methods.getInstructorStats = async function() {
  if (this.role !== 'instructor') return null;

  const Course = mongoose.model('Course');
  const Enrollment = mongoose.model('Enrollment');

  const courses = await Course.find({ instructor: this._id });
  const courseIds = courses.map(course => course._id);

  const enrollmentStats = await Enrollment.aggregate([
    { $match: { course: { $in: courseIds } } },
    {
      $group: {
        _id: null,
        totalStudents: { $addToSet: '$student' },
        totalEnrollments: { $sum: 1 },
        avgProgress: { $avg: '$progress' },
      },
    },
  ]);

  const stats = enrollmentStats[0] || {
    totalStudents: [],
    totalEnrollments: 0,
    avgProgress: 0,
  };

  return {
    totalCourses: courses.length,
    totalStudents: stats.totalStudents.length,
    totalEnrollments: stats.totalEnrollments,
    avgProgress: stats.avgProgress || 0,
  };
};

export const User = model('User', userSchema);
export default User;
