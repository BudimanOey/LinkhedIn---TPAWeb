import { gql } from "@apollo/client";

export const ADD_NOTIFICATION = gql`
    mutation addNotif($userID: String!, $toUser: String!, $information: String!){
        addNotification(userID:$userID, toUser:$toUser, information:$information)
    }
`
export const GET_NOTIFICATIONS = gql`
    query getNotif($userID:String!){
        getNotifications(userID:$userID){
                id,
            message,
            fromUser,
            toUser,
            createdAt
        }
    }
`