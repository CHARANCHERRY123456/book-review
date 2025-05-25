const CrudRepository = require('../../repositories/CrudRepository');

// BookRepository handles all data access for books
class BookRepository extends CrudRepository {
    constructor(model) {
        super(model);
        // Add any book-specific methods here if needed
    }
}

module.exports = BookRepository;
