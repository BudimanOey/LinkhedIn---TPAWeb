import { gql } from "@apollo/client"

export const REQUEST_CONNECT = gql`
  mutation reqConn($userID: String!, $recepient: String!){
    connectionRequest(userID: $userID, recepient: $recepient)
  }
`

export const ACCEPT_CONNECT = gql`
  mutation acceptConnection($userID: String!, $sender: String!){
    acceptConnection(userID: $userID, sender:$sender)
  }
`

export const DECLINE_CONNECT = gql`
    mutation decline($userID: String!, $sender: String!){
        declineConnection(userID: $userID, sender: $sender)
    }
`