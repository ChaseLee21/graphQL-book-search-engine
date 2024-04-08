import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($password: String!, $email: String!, $username: String!) {
        addUser(password: $password, email: $email, username: $username) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                bookId
                authors
                description
                title
                image
                link
                }
            }
        }
    }
`;