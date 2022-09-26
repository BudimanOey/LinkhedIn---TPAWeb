import { gql } from "@apollo/client";

export const CREATE_JOB = gql`
    mutation createJob(
        $title: String!, 
        $company: String!,
            $location: String!,
        $createdAt: String!
    ) {
        createJob(input: {
            title: $title,
            company: $company,
            location: $location,
            createdAt: $createdAt
        })
    }
`
export const GET_JOBS = gql`
    query getJob{
    getJobs{
        id,
        title,
        company,
        location,
        createdAt
    }
}
`