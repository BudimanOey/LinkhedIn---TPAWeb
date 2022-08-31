import { gql } from "@apollo/client";

export const GENERATE_RESET_PASSWORD_LINK = gql`
    mutation generatePassLink($userID: String!, $email: String!){
        generateResetPassLink(userID: $userID, email: $email)
    }
`

export const GET_RESET_PASSWORD_LINK = gql`
    query getResetPassLink($id: ID!){
        getResetPassLink(id: $id){
            id,
            userID
        }
    }
`