const { User, Book } = require('../models');
const { create } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findById(userId)
        .select('-__v -password')
        .populate('savedBooks');
    }
  },
  Mutation: {
    login: async (parent, { username, email, password }) => {
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        return { token, user };
    },
    addUser: async (parent, { userData }) => {
        return await User.create(userData);
    },
    saveBook: async (parent, { userId, bookData }) => {
        return await User.findOneAndUpdate(
            { _id: userId },
            {
                $addToSet: { savedBooks: bookData },
            },
            {
                new: true,
                runValidators: true,
            }
        );
    },
    removeBook: async (parent, { userId, bookId }) => {
        return await User.findOneAndUpdate(
            { _id: userId },
            {
                $pull: {
                    savedBooks: {
                        bookId: bookId,
                    },
                },
            },
            { new: true }
        );
    }
  }
};

module.exports = resolvers;
