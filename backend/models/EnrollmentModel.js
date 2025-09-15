import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a student can only enroll in a course once
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

// Virtual for checking if enrollment is completed
enrollmentSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Virtual for enrollment duration in days
enrollmentSchema.virtual('enrollmentDuration').get(function() {
  if (!this.completedAt) return null;
  const duration = Math.ceil((this.completedAt - this.enrollmentDate) / (1000 * 60 * 60 * 24));
  return duration;
});

// Hide internal fields in JSON
enrollmentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Static method to get enrollment statistics
enrollmentSchema.statics.getEnrollmentStats = async function(courseId) {
  const stats = await this.aggregate([
    { $match: { course: mongoose.Types.ObjectId(courseId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgProgress: { $avg: '$progress' },
      },
    },
  ]);
  return stats;
};

export const Enrollment = model('Enrollment', enrollmentSchema);
export default Enrollment;