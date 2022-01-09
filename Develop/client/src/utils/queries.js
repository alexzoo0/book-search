import gql  from "graphql";

export const GET_ME = gql `
{
    me{
        _id
        username
        email
        bookCount
        savedBooks {
            # _id
            bookId
            authors
            image
            title
            description
            link

        }
    }
} `;