import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutation loginUser($email:String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            _id
        }
    }
}`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email){
        user{
            -id
            username
            email
            bookCount
            saveBooks{
                authors
                bookId
                image
                link
                description
            }
        }
        token
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($input: String!) {
    saveBook(input: $input){
        _id
        username
        email
        bookCount
        saveBooks{
            # _id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        saveBooks{
            bookId
            authors
            image
            link 
            title 
            description
        }
    }
}`;


