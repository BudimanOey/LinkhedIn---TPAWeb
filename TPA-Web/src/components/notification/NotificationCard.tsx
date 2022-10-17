import { useQuery } from '@apollo/client'
import React from 'react'
import defaultProfile from '../../assets/profile.jpg'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import '../../styles/notifPage.scss'

export default function NotificationCard(data:any) {
    const {loading:getUserLoading, error: getUserError, data:getUserData} = useQuery(GET_USER_BY_ID,{
        variables:{
            id: data.notifData.fromUser
        }
    })

    if(getUserLoading) return (
        <div className="">
            Loading...
        </div>
    )

    if(getUserError) return(
        <div className="">
            Error while fetching data!
        </div>
    )
    
    return(
        <div className="justify-start mb-5 bg-gray-400 p-3 border-2 rounded-lg shadow-md" >
            {
                getUserData.getUserByID.profilePicture !== "" ?
                <img src={getUserData.getUserByID.profilePicture} className='notif-avatar-nav'/>
                :
                <img src={defaultProfile} className='notif-avatar-nav'/>
            }
            <div className="flex flex-col ml-5">
                <span className='font-bold'>{getUserData.getUserByID.firstName} {getUserData.getUserByID.lastName}</span>
                <span>{data.notifData.message}</span>
            </div>
        </div>
    )
}
