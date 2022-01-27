const {gql} = require('apollo-server-express');
const typedefs = gql`
type Query {
    me: User
    users: [User]
    user: (username: String!): User
}

type Mutation {
    login(email: String!, password, String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String!], description: String!, title: String!, book_id: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount:Int
    saveBooks[Book]
}

type Book {
    bookId: ID!
    authors: ID!
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}
`;

module.exports = typedefs;
