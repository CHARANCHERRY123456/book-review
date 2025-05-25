const BASE_PATH = '/api';

module.exports = {
  AUTH: {
    BASE: `${BASE_PATH}/auth`,
    REGISTER: `/register`,
    LOGIN: `/login`,
    LOGOUT: `/logout`,
  },
  USERS: {
    BASE: `${BASE_PATH}/users`,
    PROFILE: `/profile`,
    BY_ID: `/:id`,
  },
  BOOKS: {
    BASE: `${BASE_PATH}/books`,
    BY_ID: `/:id`,
    FEATURED: `/featured`,
    BULK: `/bulk`
  },
  REVIEWS: {
    BASE: `${BASE_PATH}/reviews`,
    BY_ID: `/:id`,
    BY_BOOK: `/book/:bookId`,
    BY_USER: `${BASE_PATH}/reviews`,
  },
};