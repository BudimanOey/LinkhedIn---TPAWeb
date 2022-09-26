import { useMutation, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import defaultProfile from '../../assets/profile.jpg'
import { RefetchUser } from '../../contextProvider/RefetchUserContext'
import { UserContext } from '../../contextProvider/userContext'
import { ACCEPT_CONNECT, DECLINE_CONNECT } from '../../queries/connectionQuery'
import { GET_USER_BY_ID } from '../../queries/userQuery'

export default function RequestConnectComponent(props:any) {
    const {user, setUser} = useContext(UserContext)
    const refetchUser = useContext(RefetchUser).refetchUserData;
    const [acceptConnect] = useMutation(ACCEPT_CONNECT)
    const [declineConnect] = useMutation(DECLINE_CONNECT)
    const {loading, error, data} = useQuery(GET_USER_BY_ID,{
        variables: {
            id: props.id
        }
    })
    
    // console.log(user)

    function acceptConnectHandler(){
        acceptConnect({
            variables: {
                userID: user.id,
                sender: props.id
            }
        }).then(()=>{
            alert("success")
            refetchUser()
        }).catch(()=>{
            console.log(error)
        })
    }

    function declineConnectHandler(){
        declineConnect({
            variables: {
                userID: user.id,
                sender: props.id
            }
        }).then(()=>{
            alert("Success")
            refetchUser()
        }).catch(()=>{
            console.log(error)
        })
    }

    if(loading){
        return (
            <div>
                Fetching...
            </div>
        )
    }

    if(error) return(
        <div>
            Error while fetching data!
        </div>
    )

    // console.log(data)

    return (
        <div className='flex items-center'>
            {data.getUserByID.profilePicture ? 
                <img className='w-14 h-14 rounded-50 border-2-grey mr-10' src={data.getUserByID.profilePicture}/>
                :
                <img className='w-14 h-14 rounded-50 border-2-grey mr-10' src={defaultProfile} alt="" />
            }
            <div className='flex flex-col'>
                <div className='flex w-full font-bold text-xl mb-4'>
                    {data.getUserByID.firstName}
                    {data.getUserByID.lastName}
                </div>
                <div className='flex'>
                    <button className='addBtn mr-4' onClick={acceptConnectHandler}>Accept</button>
                    <button className='declineBtn' onClick={declineConnectHandler}>Decline</button>
                </div>
            </div>
        </div>
    )
}
