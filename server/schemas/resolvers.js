const { User, Book } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    books: async () => {
      return await Book.find({});
    },
  }
};

module.exports = resolvers;
