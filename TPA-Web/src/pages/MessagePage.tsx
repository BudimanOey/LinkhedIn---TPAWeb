import { useQuery } from '@apollo/client'
import {useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import ChatList from '../components/message/ChatList'
import MessageBox from '../components/message/MessageBox'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext'
import { GET_ROOM } from '../queries/messageQuery'
import { GET_USER_BY_ID } from '../queries/userQuery'
import '../styles/MessagePage.scss'
import NotFoundPage from './NotFoundPage'

export default function MessagePage() {
    const user = useContext(UserContext).user
    const {roomid} = useParams()
    
    const {loading:getRoomLoading, error:getRoomError, data:getRoomData} = useQuery(GET_ROOM, {
        variables:{
            id: roomid
        }
    })

    if (getRoomLoading) return(
        <div className="">
            Loading...
        </div>
    )

    if (roomid && getRoomError) return(
        <NotFoundPage/>
    )

    return (
        <div className='body bg-linkhedin'>
            <Navbar/>
            <div className="center-all">
                <div className="bg-gray-400 chatbox-container border-2 rounded-md shadow-md w-full mt-6">
                    <div className="friend-box boder-right-2-grey text-center">
                        <div className="bg-gray-400 pt-5 pb-4">
                            <span className='font-bold text-2xl '>Chat</span>
                        </div>
                        <ChatList/>
                    </div>
                    <div className="chat-box text-center">
                        {
                            roomid &&
                            <MessageBox roomData={getRoomData.getChatRoom}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
