const {User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(context.user){
                const data = await User.findOne({
                    _id: context.user._id
                }).select('-__V-password').populate('books')
                return data;
            }
            throw new AuthenticationError('Not logged in!');
        },

        user: async (parent, {username}) => {
            return User.findOne({username}).select ('-__V -password')
        }
    
    },
    Mutation: {
        addUser: async (parent, args) => {
            const users = await User.create(args);
            const tokens = signToken(users);

            return {tokens, users};
        },

        login: async(parent, {email, password}) => {
            const users = await User.findOne({email});
            if (!users) {
                throw new AuthenticationError ('Incorrect!');
            }
                const correctAs = await User.isCorrectPassword(password);

            if(!correctAs) {
                    throw new AuthenticationError('Incorrect');
            }
            
            const tokens = signToken(users)
            return {tokens, users};
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const update = await User.findOneAndUpdate(
                    {_id: User._id},
                    {$addToSet: { savedBooks: args}},
                    {new: true, runValidators: true});

                    return update;
            }
            throw new AuthenticationError('Need to login!');
        },

        removeBook: async (parent,{params}, context) => {
            if(context.user) {
                const update = await User.findOneAndUpdate(
                    {_id: User._id},
                    {$pull: {savedBooks: {bookId: params.bookId}}},
                    {new: true})
                    
                    return update;
            }
            throw new AuthenticationError('Need to login!');
        }
    }
};

module.exports = resolvers;

