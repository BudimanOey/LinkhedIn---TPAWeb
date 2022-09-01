import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import RequestConnectComponent from '../components/connections/RequestConnectComponent'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext'
import { GET_USER_BY_ID } from '../queries/userQuery'

export default function Network() {
  const {user, setUser} = useContext(UserContext)
  // const {loading, error, data} = useQuery(GET_USER_BY_ID)
  // console.log(user)
  return (
    <div className='full-screen'>
      <Navbar/>
      <div className='flex full-screen bg-blue-400'>
        {user.connectRequest.map((e:any)=>{
          {console.log(e)}
          <RequestConnectComponent id={e}/>
        })}
      </div>
    </div>
  )
}
