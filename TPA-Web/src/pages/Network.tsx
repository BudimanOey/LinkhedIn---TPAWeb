import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ConnectedUser from '../components/connections/ConnectedUser'
import RequestConnectComponent from '../components/connections/RequestConnectComponent'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext'

export default function Network() {
  const {user, setUser} = useContext(UserContext)

  return (
    <div className='body'>
      <Navbar/>
      <div className='full-screen bg-linkhedin'>
        <div className='flex border-2 rounded-lg shadow-md mt-10 mr-32 ml-32 p-2 pl-5 flex-col bg-white'>
          <p className='font-bold text-l'>
            Invitations
          </p>
          {user.connectRequest.length != 0 ? 
          user.connectRequest.map((e:any)=>{
            return (
              
              <div key={e} className=''>
                
                <RequestConnectComponent id={e}/>
              </div>
            )
          })
          :
          <div className='center-all m-2'>
            Empty
          </div>
            
          }
        </div>
        <div className='flex border-2 rounded-lg shadow-md mt-10 mr-32 ml-32 p-2 pl-5 flex-col bg-white'>
          <p className='font-bold text-l'>Connections</p>
          <div className='grid grid-template-col-auto mr-3 mb-3'>
            {
              user.connectedUser ?
              user.connectedUser.map((e:any, i:any)=>{
                return(
                  <div key={i} className="max-w-lg border-2 rounded-lg shadow-md p-4">
                    <Link to={`/profile/${e}`} className="color-black">
                      <ConnectedUser id={e} />
                    </Link>
                  </div>
                )
              })
              :
              <div className='center-all m-2'>
                Empty
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
