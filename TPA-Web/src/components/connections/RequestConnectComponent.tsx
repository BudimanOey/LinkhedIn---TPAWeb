import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ACCEPT_CONNECT, GET_USER_BY_ID } from '../../queries/userQuery'

export default function RequestConnectComponent({id}:any) {
    const [userRequestData, setUserRequestData] = useState({})
    const [acceptConnect] = useMutation(ACCEPT_CONNECT)
    const {loading, error, data} = useQuery(GET_USER_BY_ID,{
        variables: {
            userID: id
        }
    })

    console.log(id)
    console.log(data)
    
    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    // useEffect(() => {
      
    // }, [])


    return (
        <div className='w-10 h-10 flex bg-blue-200'>
            {id}
        </div>
    )
}
