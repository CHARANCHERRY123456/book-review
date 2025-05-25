const CrudRepository = require('../../repositories/CrudRepository');

class UserRepository extends CrudRepository {
  constructor(model) {
    super(model);
    // Add user-specific data access methods here if needed
  }
}

module.exports = UserRepository;
