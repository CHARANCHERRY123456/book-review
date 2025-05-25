// BookService handles business logic for books
class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async getAllBooks(filter = {}) {
        return this.bookRepository.findAll(filter);
    }

    async getBookById(id) {
        return this.bookRepository.findById(id);
    }

    async createBook(bookData) {
        return this.bookRepository.create(bookData);
    }

    async updateBook(id, updateData) {
        return this.bookRepository.updateById(id, updateData);
    }

    async deleteBook(id) {
        return this.bookRepository.deleteById(id);
    }
}

module.exports = BookService;
