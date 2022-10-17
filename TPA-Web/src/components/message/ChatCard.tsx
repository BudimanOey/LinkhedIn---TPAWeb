import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import profile from '../../assets/profile.jpg'

export default function ChatCard({userID}:any) {
    const {loading:getUserLoading, error:getUserError, data:getUserData} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: userID
        }
    })

    if(getUserLoading) return(
        <div className="">
            Loading...
        </div>
    )

    if(getUserError) return(
        <div className="">
            Error while fetching data!
        </div>
    )
    

    return (
        <div className=''>
            {
                getUserData.getUserByID.profilePicture ?
                <img src={getUserData.getUserByID.profilePicture} alt="" className='notif-avatar-nav'/> 
                :
                <img src={profile} alt="" className='notif-avatar-nav'/>
            }
            <span className='ml-5 font-bold'>{getUserData.getUserByID.firstName} {getUserData.getUserByID.lastName}</span>
        </div>
    )
}
