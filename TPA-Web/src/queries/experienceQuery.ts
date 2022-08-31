import { gql } from "@apollo/client";

export const GET_EXPERIENCE = gql`
    query getExp($userID: String!){
        getExperience(userID: $userID){
            ID,
            userID,
            title,
            company,
            employmentType,
            location,
            startDate,
            endDate,
            description,
            currentlyWorking
        }
    }
`

export const ADD_EXPERIENCE = gql`
   mutation addExp(
        $userID: String!,
        $title: String!,
        $employmentType: String!,
        $company: String!,
        $location: String!,
        $startDate: String!,
        $endDate: String!,
        $desc: String!,
        $currWork:Boolean!
        ){
        addExperience(input:{
            userID: $userID,
            title: $title,
            employmentType: $employmentType,
            company: $company,
            location: $location,
            startDate: $startDate,
            endDate: $endDate,
            description: $desc,
            currentlyWorking: $currWork
        })
    }
`

export const REMOVE_EXPERIENCE = gql`
    mutation removeExp($id: String!){
        removeExperience(ID: $id)
    }
`

export const UPDATE_EXPERIENCE = gql`
    mutation updateExp(
        $userID: String!,
        $id: String!,
            $title: String!,
        $employmentType: String!,
        $company: String!,
        $location: String!,
        $startDate: String!,
        $endDate: String!,
        $desc: String!,
        $currWork:Boolean!
    ){
    updateExperience(ID: $id,
        input:{
        userID: $userID,
        title: $title,
        employmentType: $employmentType,
        company: $company,
        location: $location,
        startDate: $startDate,
        endDate: $endDate,
        description: $desc,
        currentlyWorking: $currWork
        }
    )
    }
`