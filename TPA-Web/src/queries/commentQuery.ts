import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
    mutation addCommentMutation($content: String!, $commentedByID: String!, $commentOfPost: String!, $replyOf: String!){
        addComment(input: {
            commentOfPost: $commentOfPost,
            content: $content
            commentedBy: $commentedByID
            replyOfComment: $replyOf
        })
    }
`

export const GET_COMMENT = gql`
    query getCommentQuery($postID: String!, $limit: Int!, $offset: Int!){
        getCommentFromPost(postID: $postID,limit: $limit, offset: $offset){
                id
            content
            likedBy
            createdAt
            replyOfComment
            commentedBy
        }
    }
`

export const GET_REPLY = gql`
    query getCommentQuery($commentID: String!, $limit: Int!, $offset: Int!){
        getCommentReplies(commentID: $commentID,limit: $limit, offset: $offset){
                id
            content
            likedBy
            createdAt
            replyOfComment
            commentedBy
        }
    }
`

export const LIKE_COMMENT = gql`
    mutation likeComment($commentID: String!, $likedBy: String!){
        likeComment(commentID: $commentID, likedByID: $likedBy)
    }
`