import { gql } from "@apollo/client";

export const ADD_ROOM = gql`
    mutation addChatRoom($userID1: String!,$userID2: String!){
        addChatRoom(userID1: $userID1, userID2: $userID2)
    }
`

export const SEND_MESSAGE = gql`
    mutation sendMessage($sender:String!,$roomID: String!, $text: String!, $imageURL:String!, $sharePost:String!, $shareUser: String!){
    sendMessage(input:{
                sender: $sender
                roomID: $roomID
                text: $text
                imageURL: $imageURL
                sharedPost: $sharePost
                sharedUser: $shareUser
            }
        )
    }
`

export const GET_ROOM = gql`
    query getChatRoom($id:String!){
        getChatRoom(roomID:$id){
            user1
            user2
            createdAt
        }
    }
`

export const GET_CHATROOM_BY_USERS = gql`
    query getChatRoomByUsers($user1: String!, $user2: String!) {
        getChatRoomByUsers(user1: $user1, user2: $user2){
                id
            user1
            user2
        }
    }
`

export const GET_CHATROOMS = gql`
    query getChatRooms($userID: String!){
        getChatRooms(userID:$userID){
            id
            user1
            user2
        }
    }
`

export const GET_MESSAGES = gql`
    query getMessages($roomID: String!){
        getMessages(roomID: $roomID){
                id
            sender
            roomID
            text
            imageURL
            sharedPost
            sharedUser
            createdAt
        }
    }
`