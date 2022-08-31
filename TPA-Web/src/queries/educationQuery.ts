import { gql } from "@apollo/client";

export const ADD_EDUCATION = gql`
    mutation addEdu(
        $userID: String!
        $school: String!
            $degree: String!
            $major: String!
            $grade: Float!
        $startDate: String!
        $endDate: String!
        $description: String!
    ){
        addEducation(input:{
            userID: $userID
            school: $school
            degree: $degree
            major: $major
            grade: $grade
            startDate: $startDate
            endDate:$endDate
            description: $description
        }){
            school
        }
    }
`

export const GET_EDUCATION = gql`
    query getEducation($userID: String!){
        getEducation(userID: $userID){
            id,
            userID,
            school,
            degree,
            major,
            grade,
            startDate,
            endDate,
            description
        }
    }
`

export const REMOVE_EDUCATION = gql`
    mutation removeEdu($id: String!){
        removeEducation(ID: $id)
    }
`

export const UPDATE_EDUCATION = gql`
    mutation updateEdu(
        $id: String!
        $userID: String!
        $school: String!
        $major: String!
        $startDate: String!
        $degree: String!
        $desc: String!
        $grade: Float!
        $endDate: String!
    ){
        updateEducation(
            ID: $id,
            input: {
            userID: $userID,
            school: $school,
            degree: $degree,
            major: $major,
            grade: $grade,
            startDate: $startDate,
            endDate: $endDate,
            description: $desc
            }
        )
    }
`