import { gql } from "@apollo/client";

export const ADD_HASHTAG = gql`
    mutation addHashtag($hashtag: String!) {
        addHashtag(hashtag: $hashtag) {
            hashtag
        }
    }
`

export const GET_HASHTAGS = gql`
    query getHashtags {
        getHashtags{
            id,
            hashtag
        }
    }
`