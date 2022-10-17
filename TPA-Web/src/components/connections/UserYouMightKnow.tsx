import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contextProvider/userContext'
import { GET_USER_MIGHT_KNOW } from '../../queries/userQuery'
import ConnectedUser from './ConnectedUser'

export default function UserYouMightKnow() {
    const {user, setUser} = useContext(UserContext)
    const {loading:getUserMKLoading, error:getUserMKError, data:getUserMKdata} = useQuery(GET_USER_MIGHT_KNOW,{
        variables: {
            id: user.id
        }
    })

    if(getUserMKLoading) return(
        <div className="">
          Loading...
        </div>
      )
    
      if(getUserMKError) return(
        <div className="">
          Error while fetching data!
        </div>
      )
    return (
        <div className='grid grid-template-col-3'>
            {
                getUserMKdata ?
                getUserMKdata.getUserYouMightKnow.map((e:any)=>{
                    return (
                        <div key={e.id} className="max-w-45 border-2 rounded-lg shadow-md p-4">
                            <Link to={`/profile/${e}`} className="color-black">
                                <ConnectedUser id={e} />
                            </Link>
                        </div>
                    )
                })
                :
                <div className="">
                    Empty
                </div>
            }
        </div>
    )
}
