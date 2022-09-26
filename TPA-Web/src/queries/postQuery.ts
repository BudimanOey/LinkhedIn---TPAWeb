import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation createPost($text: String!, $photo: String!, $video:String!, $creator: String!){
    createPost(input:{
            text: $text,
        photoURL: $photo,
        videoURL: $video,
        creator: $creator,
    })
    }
`

export const GET_POST = gql`
    query getPost($id: String!, $limit: Int!, $offset: Int!){
        getPosts(id: $id, limit:$limit, offset: $offset){
            id,
            text,
            photoURL,
            videoURL,
            likedBy,
            creator,
            createdAt
        }
    }
`

export const LIKE_POST = gql`
    mutation likePosting($postID: String!, $likedByID:String!) {
        likePost(postID: $postID, likedByID: $likedByID)
    }
`