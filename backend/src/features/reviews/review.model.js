import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  content: {
    type: String,
    required: [true, 'Review content is required'],
    trim: true,
    minlength: [10, 'Review must be at least 10 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per book
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to get average rating and update book
ReviewSchema.statics.getAverageRating = async function(bookId) {
  const obj = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: '$book',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    // Update book with average rating and review count
    if (obj.length > 0) {
      await this.model('Book').findByIdAndUpdate(bookId, {
        averageRating: Math.round(obj[0].averageRating * 10) / 10, // Round to 1 decimal place
        reviewCount: obj[0].reviewCount,
      });
    } else {
      // If no reviews, set default values
      await this.model('Book').findByIdAndUpdate(bookId, {
        averageRating: 0,
        reviewCount: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', async function() {
  await this.constructor.getAverageRating(this.book);
});

// Call getAverageRating after remove
ReviewSchema.post('remove', async function() {
  await this.constructor.getAverageRating(this.book);
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;