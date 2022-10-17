import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import profile from '../../assets/profile.jpg'
import { GET_EDUCATION } from '../../queries/educationQuery'

export default function MentionModal({userID}:any) {
    const {loading:getUserLoading, error:getUserError, data:getUserData} = useQuery(GET_USER_BY_ID,{
        variables: {
            id: userID
        }
    })
    const {loading:getUserEduLoading, error:getUserEduError, data:getUserEduData} = useQuery(GET_EDUCATION, {
        variables: {
            userID: userID
        }
    })

    if(getUserLoading || getUserEduLoading) return(
       <div className="absolute bg-white flex mt-8 ml-10 w-72 p-3 rounded-lg p-2 border-2">
        Loading...
       </div>
    )

    if(getUserError || getUserEduError) return(
        <div className="absolute bg-white flex mt-8 ml-10 w-72 p-3 rounded-lg p-2 border-2">
            Error while fetching data!
        </div>
    )

    return (
        <div className='absolute bg-white flex mt-8 ml-10 w-72 p-3 rounded-lg p-2 border-2'>
            {
                getUserData.getUserByID.profilePicture ? 
                <img src={getUserData.getUserByID.profilePicture} className="avatar-nav mr-3" />
                :
                <img src={profile} className="avatar-nav mr-3"/>
            }
            <div className="flex flex-col">
                <span className='font-bold'>{getUserData.getUserByID.firstName} {getUserData.getUserByID.lastName}</span>
                <p className='font-normal'>{getUserData.getUserByID.email}</p>
            </div>
        </div>
    )
}
