import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// Load environment variables
// dotenv.config();

const connectDB = async () => {
  try {
    console.log('mongo uri', process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;