const UserRepository = require('./user.repository');
const User = require('./user.model');
const Review = require('../reviews/review.model');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    const reviewCount = await Review.countDocuments({ user: user._id });
    return { user, reviewCount };
  }

  async updateUserProfile(userId, updateFields) {
    const user = await this.userRepository.updateById(userId, updateFields);
    if (!user) return null;
    const reviewCount = await Review.countDocuments({ user: user._id });
    return { user, reviewCount };
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    const reviewCount = await Review.countDocuments({ user: user._id });
    return { user, reviewCount };
  }
}

// Export a ready-to-use instance
const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
module.exports = userService;
