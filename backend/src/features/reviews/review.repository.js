const CrudRepository = require('../../repositories/CrudRepository');

class ReviewRepository extends CrudRepository {
  constructor(model) {
    super(model);
    // Add review-specific data access methods here if needed
  }
}

module.exports = ReviewRepository;
