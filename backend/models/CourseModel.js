import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0, min: 0 },
    duration: { type: String, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

courseSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Virtual for enrollment count
courseSchema.virtual('enrollmentCount', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'course',
  count: true,
});

// Method to check if a user is enrolled
courseSchema.methods.isEnrolled = async function(userId) {
  const Enrollment = mongoose.model('Enrollment');
  const enrollment = await Enrollment.findOne({
    student: userId,
    course: this._id,
    status: 'active'
  });
  return !!enrollment;
};

// Method to get enrollment statistics
courseSchema.methods.getEnrollmentStats = async function() {
  const Enrollment = mongoose.model('Enrollment');
  const stats = await Enrollment.aggregate([
    { $match: { course: this._id } },
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

export const Course = model('Course', courseSchema);
export default Course;
