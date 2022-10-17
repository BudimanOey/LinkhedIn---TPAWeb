import { gql } from "@apollo/client";

export const SEARCH_POST = gql`
    query searchPost($keyword: String!, $limit: Int!, $offset: Int!) {
        SearchPost(keyword: $keyword, limit: $limit, offset: $offset){
            id
            text
            photoURL
            videoURL
            creator
            likedBy
            createdAt
        }
    }
`

export const SEARCH_USER = gql`
    query searchUser($keyword: String!, $limit: Int!, $offset: Int!, $currUser: String!){
        SearchUser(keyword: $keyword, limit: $limit, offset: $offset, currUserID:$currUser){
            id
            firstName
            lastName
            email
            profilePicture
            backgroundPicture
            connectedUser
            connectRequest
            requestConnectTo
            visits
        }
    }
`

export const SEARCH_CONNECTED_USERS = gql`
    query searchConnectedUser($keyword: String!, $userID: String!) {
        SearchConnectedUser(keyword:$keyword, userID: $userID){
                id
            firstName
            lastName
            email
            profilePicture
            blockedUser
            connectedUser
        }
    }
`