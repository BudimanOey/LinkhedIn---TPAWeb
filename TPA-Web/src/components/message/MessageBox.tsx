import { useMutation, useQuery } from '@apollo/client'
import { uuidv4 } from '@firebase/util'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {useContext,useEffect, useState} from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { MdInsertPhoto } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contextProvider/userContext'
import { storage } from '../../firebase/firebaseConnect'
import NotFoundPage from '../../pages/NotFoundPage'
import { GET_MESSAGES, GET_ROOM, SEND_MESSAGE } from '../../queries/messageQuery'
import { ADD_NOTIFICATION } from '../../queries/notificationQuery'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import "../../styles/messagePage.scss"
import SharedProfile from './SharedProfile'
import profile from '../../assets/profile.jpg'
import SharedPost from './SharedPost'

export default function MessageBox({roomData}:any) {
    const {roomid} = useParams()
    const user = useContext(UserContext).user
    const [sendMessageMutation] = useMutation(SEND_MESSAGE) 
    const [messageText, setMessageText] = useState("")
    const {loading:getUserLoading, error:getUserError, data:getUserData, startPolling:userStartPolling} = useQuery(GET_USER_BY_ID,{
        variables:{
            id: roomData.user2 === user.id ? roomData.user1 : roomData.user2
        }
    })
    

    const {loading:getMessageLoading, error:getMessageError, data:getMessageData, startPolling} = useQuery(GET_MESSAGES, {
        variables: {
            roomID: roomid
        }
    })

    useEffect(() => {
        userStartPolling(500)
        startPolling(500)
    }, [])
    

    if (getMessageLoading || getUserLoading) return(
        <div className="">
            Loading...
        </div>
    )

    if (getMessageError || getUserError) return(
        <div className="">
            Error while fetching data!
        </div>
    )

    function sendMessageHandler(){
        if(messageText) {
            sendMessageMutation({
                variables:{
                    sender: user.id,
                    roomID: roomid,
                    text: messageText,
                    imageURL: "",
                    sharePost: "",
                    shareUser: ""
                }
            }).then(()=>{
                setMessageText("")
                
            }).catch(()=>{
                alert("error")
            })
        }
    }

    async function sendPictureHandler(e:any) {
        const uploadImg = (e.target.files as FileList)[0] as File
        if(uploadImg !== undefined) {
            const storageRef = ref(storage, `images/post/${uuidv4()}/${uploadImg.name}`)
            await uploadBytes(storageRef, uploadImg)
            getDownloadURL(storageRef).then((url)=>{
                sendMessageMutation({
                    variables:{
                        sender: user.id,
                        roomID: roomid,
                        text: "",
                        imageURL: url,
                        sharePost: "",
                        shareUser: ""
                    }
                }).then(()=>{
                    console.log(url);
                    
                }).catch(()=>{
                    alert("error")
                })
            })
        }
    }
    
    return (
        <div className='bg-white'>
            <div className="justify-start p-2 align-center bg-gray-400">
                {
                    <div className="">
                        {
                            getUserData.getUserByID.profilePicture ?
                            <img src={getUserData.getUserByID.profilePicture} alt="" className='notif-avatar-nav'/>
                            :
                            <img src={profile
                            } alt="" className='notif-avatar-nav'/>
                        }
                        <span className='font-bold text-lg ml-3'>{getUserData.getUserByID.firstName} {getUserData.getUserByID.lastName}</span>
                    </div>
                }
            </div>
            <div className="message-box overflow-y-auto">
                {
                    getMessageData.getMessages.map((e:any) => {
                        
                        return(
                            <div key={e.id} className="">
                                {
                                    e.sender === user.id ?
                                    <div className="justify-end w-fit h-fit m-5">
                                        {
                                            e.text &&
                                            <p className='justify-end border-2 rounded-lg shadow-md pr-5 pl-5 max-w-xs text-break-wrap'>{e.text}</p>
                                        }
                                        {
                                            e.imageURL &&
                                            <img src={e.imageURL} alt="" className='w-56 h-56 border-2 rounded-lg shadow-md pr-5 pl-5'/>
                                        }
                                        {
                                            e.sharedUser &&
                                            <SharedProfile userID={e.sharedUser}/>
                                        }
                                        {
                                            e.sharedPost &&
                                            <div className="">
                                                <SharedPost postID={e.sharedPost}/>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className="justify-start m-5">
                                        {
                                            e.text &&
                                            <p className='border-2 rounded-lg shadow-md pr-5 pl-5'>{e.text}</p>
                                        }
                                        {
                                            e.imageURL &&
                                            <img src={e.imageURL} alt="" className='w-56 h-56 border-2 rounded-lg shadow-md pr-5 pl-5'/>
                                        }
                                        {
                                            e.sharedUser &&
                                            <div className="">
                                                <SharedProfile userID={e.sharedUser}/>
                                            </div>
                                        }
                                        {
                                            e.sharedPost &&
                                            <div className="">
                                                <SharedPost postID={e.sharedPost}/>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                !user.blockedUser.includes(getUserData.getUserByID.id) ?
                <div className="flex bg-gray-400 align-center">
                    <label htmlFor="photoIcon">       
                        <MdInsertPhoto size={30} className="photoIcon ml-2 mt-1" id='postPhoto'/>
                    </label>
                    <input onChange={(e)=>{sendPictureHandler(e)}} type="file" id='photoIcon' className='hidden' accept='image/png, image/jpg, image/jpeg, image/gif'/>
                    <input type="text" className='w-full h-6 bg-white ml-2 mt-2 mb-2' placeholder='message...' value={messageText} onChange={(e)=>{setMessageText(e.target.value)}}/>
                    <AiOutlineSend size={30} className="shareIcon ml-3 mr-2" onClick={sendMessageHandler
                    }/>
                </div>
                :
                <div className="">
                    <span className='font-bold'>You are blocked or you blocked the user</span>
                </div>
            }
        </div>
    )
}
