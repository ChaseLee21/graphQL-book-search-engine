import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Query($username: String!) {
        me(username: $username) {
        _id
        bookCount
        email
        username
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
            }
        }
    }
`;
  