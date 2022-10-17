import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {useContext} from 'react'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import defaultProfile from '../../assets/profile.jpg'
import { UserContext } from '../../contextProvider/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import { ADD_ROOM, GET_CHATROOM_BY_USERS, SEND_MESSAGE } from '../../queries/messageQuery'

export default function ShareProfileCard({userID}:any) {
  const user = useContext(UserContext).user
  const navigate = useNavigate()
  const [addChatroom] = useMutation(ADD_ROOM)
  const [sendMessageMutation] = useMutation(SEND_MESSAGE) 
  const {id} = useParams()
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {
      id: userID
    }
  })
  const [getRoom,{loading:getChatRoomLoading, error:getChatRoomError, data:getChatRoomData}] = useLazyQuery(GET_CHATROOM_BY_USERS, {
    variables: {
        user1: userID,
        user2: user.id
    }
  })

  if(loading) return(
    <div className="">
      Loading...
    </div>
  )
  
  if(error) return(
    <div className="">
      Error while fetching data!
    </div>
  )

  function sendProfileHandler(){
    // console.log("Masuk");
    
    getRoom({
      variables: {
        user1: user.id,
        user2: userID
      }
    }).then((e:any)=>{            
        if(e.data.getChatRoomByUsers.id) {
            sendMessageMutation({
                variables:{
                    sender: user.id,
                    roomID: e.data.getChatRoomByUsers.id,
                    text: "",
                    imageURL: "",
                    sharePost: "",
                    shareUser: id
                }
            }).then(()=>{
                navigate(`/message/${e.data.getChatRoomByUsers.id}`)
            })
        }else{
            addChatroom({
                variables:{
                    userID1: user.id,
                    userID2: userID
                }
            }).then(()=>{
                sendMessageMutation({
                    variables:{
                        sender: user.id,
                        roomID: e.data.getChatRoomByUsers.id,
                        text: "",
                        imageURL: "",
                        sharePost: "",
                        shareUser: userID
                    }
                }).then(()=>{
                    navigate(`/message/${e.data.getChatRoomByUsers.id}`)
                })
            })
        }
    }).catch((e:any)=>{
        alert(e)           
    })
  }

  return (
    <div className='cursor-pointer chat-card m-3' onClick={sendProfileHandler}>
      {
          data.getUserByID.profilePicture ?
          <img src={data.getUserByID.profilePicture} alt="" className='notif-avatar-nav'/>
          :
          <img src={defaultProfile} alt="" className='notif-avatar-nav'/>
      }
      <span className='font-bold ml-5'>{data.getUserByID.firstName} {data.getUserByID.lastName}</span>
    </div>
  )
}
