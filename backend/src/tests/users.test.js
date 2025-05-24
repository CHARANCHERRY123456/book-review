// users.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../features/users/user.model.js';
import jwt from 'jsonwebtoken';

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin',
};

const regularUser = {
  name: 'Regular User',
  email: 'user@example.com',
  password: 'password123',
  role: 'user',
};

let adminToken;
let userToken;

beforeAll(async () => {
  // Connect to test database
  const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/booktest';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  // Seed users
  await User.deleteMany({});
  const admin = await User.create(adminUser);
  const user = await User.create(regularUser);

  // Generate tokens
  adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'testsecret');
  userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'testsecret');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/users (admin only)', () => {
  it('should allow admin to get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should forbid regular user from getting all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
  });
});
