import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // ...define your schema here...
});

// If you had: module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);