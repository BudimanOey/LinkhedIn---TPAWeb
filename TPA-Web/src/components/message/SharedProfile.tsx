import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import defaultProfile from '../../assets/profile.jpg'
import { useNavigate } from 'react-router-dom'

export default function SharedProfile({userID}:any) {
    const navigate = useNavigate()
    const {loading:getUserLoading, error:getUserError, data:getUserData} = useQuery(GET_USER_BY_ID,{
        variables:{
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
        <div className='border-2 rounded-lg shadow-md p-2 cursor-pointer' onClick={()=>{navigate(`/profile/${userID}`)}}>
            {
                getUserData.getUserByID.profilePicture ?
                <img src={getUserData.getUserByID.profilePicture} alt="" className='notif-avatar-nav'/>
                :
                <img src={defaultProfile} alt="" className='notif-avatar-nav'/>
            }
            <span className='ml-3 font-bold'>{getUserData.getUserByID.firstName} {getUserData.getUserByID.lastName}</span>
        </div>
    )
}
