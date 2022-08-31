import { gql } from "@apollo/client";

export const GET_ACTIVATION = gql`
    query getActivation ($id: ID!){
        getActivation(id: $id){
            id
            userID
        }
    }
`