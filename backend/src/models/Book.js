import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  // ...your schema fields here...
});

// If you had: module.exports = mongoose.model('Book', bookSchema);
export default mongoose.model('Book', bookSchema);