import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import profile from '../../assets/profile.jpg'

export default function SharedPostCreatorCard({userID}:any) {
    const navigate = useNavigate()
    const {loading,error,data} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: userID
        }
    })
    return (
        <div className='w-full flex'>
            <div className="cursor-pointer" 
                onClick={()=>{navigate(`/profile/${data.getUserByID.id}`)}}
            >
            {
                data.getUserByID.profilePicture ? 
                <img src={data.getUserByID.profilePicture} className='avatar-nav'/> 
                :
                <img src={profile} alt="" className='avatar-nav'/>
            }
            </div>
            <div className='flex flex-col'>
                <span className='ml-4 font-bold'>{data.getUserByID.firstName +" "+ data.getUserByID.lastName}</span>
            </div>
        </div>
    )
}
