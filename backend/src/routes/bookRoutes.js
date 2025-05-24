import express from 'express';
import { getBooks, createBook } from '../controllers/bookController.js';

const router = express.Router();

router.route('/').get(getBooks).post(createBook);

// If you had: module.exports = router;
export default router;