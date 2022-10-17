import { useLazyQuery, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contextProvider/userContext'
import { GET_CHATROOMS } from '../../queries/messageQuery'
import { SEARCH_CONNECTED_USERS } from '../../queries/searchQuery'
import ChatCard from './ChatCard'
import { AiOutlineSearch } from "react-icons/ai";
import SearchConnectedUsers from '../modals/SearchConnectedUsers'

export default function ChatList() {
    const user = useContext(UserContext).user
    const navigate = useNavigate()
    const [searchUserKeyword, setSearchUserKeyword] = useState("") 
    const [connectedUsers, setConnectedUsers] = useState(Array)
    const {loading:getRoomsLoading, error:getRoomsError, data:getRoomsData} = useQuery(GET_CHATROOMS,{
        variables:{
            userID: user.id
        }
    })
    const [searchUsersMutation, {loading:searchUsersLoading, error:searchUsersError, data:searchUsersData}] = useLazyQuery(SEARCH_CONNECTED_USERS)

    if(getRoomsLoading)return(
        <div className="">
            Loading...
        </div>
    )

    if(getRoomsError) return(
        <div className="">
            Error while fetching data!
        </div>
    )

    function searchUsersHandler(){
        if(searchUserKeyword) {
            searchUsersMutation({
                variables:{
                    keyword: searchUserKeyword,
                    userID: user.id
                }
            }).then((e)=>{
                // console.log(e.data.SearchConnectedUser);
                setConnectedUsers(e.data.SearchConnectedUser)
            }).catch((e)=>{
                alert(e)
            })
        }
    }

    return (
        <div className='flex flex-col overflow-auto justify-start'>
            <div className="flex items-center">
                <input className='w-full p-2 m-5' type="text" onChange={(e)=>{setSearchUserKeyword(e.target.value)}} placeholder="search"/>
                <AiOutlineSearch className='cursor-pointer mr-5' size={30} onClick={searchUsersHandler}/>
                <SearchConnectedUsers conUsers={connectedUsers}/>
                
            </div>     
            {
                getRoomsData.getChatRooms.map((e:any)=>{
                    if (user.id === e.user1) {
                        return(
                            <div onClick={()=>{navigate(`/message/${e.id}`)}} key={e.id} className="pl-5 pt-2 pb-2 mb-2 justify-start cursor-pointer chat-card">
                                <ChatCard userID={e.user2}/>
                            </div>
                        )
                    }
                    return (
                        <div onClick={()=>{navigate(`/message/${e.id}`)}} key={e.id} className="pl-5 pb-2 pt-2 mb-2 justify-start cursor-pointer chat-card">
                            <ChatCard userID={e.user1}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
