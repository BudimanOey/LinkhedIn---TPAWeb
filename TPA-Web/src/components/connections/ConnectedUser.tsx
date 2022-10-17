import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { UserContext } from '../../contextProvider/userContext'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import defaultProfile from '../../assets/profile.jpg'

export default function ConnectedUser(props:any) {
    const {loading, error, data} = useQuery(GET_USER_BY_ID,{
        variables: {
            id: props.id
        }
    })


    if(loading) return (
        <div>
            Loading...
        </div>
    )
    if(error) return (
        <div>Error while fetching data!</div>
    )

    return (
        <div className='flex flex-col center-all '>
            <div className='w-14 h-14 pt-5'>
            {
                data.getUserByID.profilePicture ? 
                <img src={data.getUserByID.profilePicture} alt="" className='w-14 h-14 rounded-50 border-2-grey mr-10'/>
                :
                <img src={defaultProfile} alt="" className='w-14 h-14 rounded-50 border-2-grey mr-10'/>
            }
            </div>
            <p className='font-bold'>{data.getUserByID.firstName} {data.getUserByID.lastName}</p>
        </div>
    )
}
