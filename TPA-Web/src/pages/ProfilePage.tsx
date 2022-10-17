import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext';
import { storage } from '../firebase/firebaseConnect';
import { BLOCK_USER, FOLLOW_USER, GET_USER_BY_ID, UNBLOCK_USER, UNFOLLOW_USER, UPDATE_BACKGROUND_PICTURE, UPDATE_PROFILE_PICTURE, VISIT_USER } from '../queries/userQuery';
import '../styles/styleLib.scss';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Education from '../components/Educations/Education';
import EducationModal from '../components/modals/EducationModal';
import Experience from '../components/Experience/Experience';
import AddExperienceModal from '../components/modals/AddExperienceModal'; 
import defaultProfile from '../assets/profile.jpg'
import { RefetchUser } from '../contextProvider/RefetchUserContext';
import { REQUEST_CONNECT } from '../queries/connectionQuery';
import { HiPencilAlt } from "react-icons/hi";
import { GET_EXPERIENCE } from '../queries/experienceQuery';
import { ADD_NOTIFICATION } from '../queries/notificationQuery';
import { ADD_ROOM, GET_CHATROOM_BY_USERS } from '../queries/messageQuery';
import ConnectedUserList from '../components/modals/ConnectedUserList';
import ShareProfileList from '../components/modals/ShareProfileList';



export default function ProfilePage() {
    const {user, setUser} = useContext(UserContext)
    const refetchUser = useContext(RefetchUser).refetchUserData;
    const navigate = useNavigate()
    const {id} = useParams();
    const [updateProfilePic] = useMutation(UPDATE_PROFILE_PICTURE);
    const [updateBackgroundPic] = useMutation(UPDATE_BACKGROUND_PICTURE);
    const [requestConnect] = useMutation(REQUEST_CONNECT);
    const [requestFollow] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const [blockUser] = useMutation(BLOCK_USER);
    const [visitUserMutation] = useMutation(VISIT_USER);
    const [unblockUser] = useMutation(UNBLOCK_USER); 
    const [openModal, setOpenModal] = useState(false);
    const [openExpModal, setOpenExpModal] = useState(false);
    const [refetchEdu, setRefetchEdu] = useState(false);
    const [refetchExp, setRefetchExp] = useState(false);
    const [activeExp, setActiveExp] = useState();
    const [shareProfileModal, setShareProfileModal] = useState(false);
    const effectRan = useRef(false);
    const [addNotif] = useMutation(ADD_NOTIFICATION);

    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID,{
        variables: {
            id: id
        }
    })
    
    const {loading:expLoading, error:expError, data:expData} = useQuery(GET_EXPERIENCE, {
        variables: {
            userID: id
        }
    });
    
    const [getRoom,{loading:getChatRoomLoading, error:getChatRoomError, data:getChatRoomData}] = useLazyQuery(GET_CHATROOM_BY_USERS, {
        variables: {
            user1: id,
            user2: user.id
        }
    })

    const [addChatroom] = useMutation(ADD_ROOM)

    useEffect(() => {
        if(effectRan.current === false 
            && data 
            && !data.getUserByID.visits.includes(id) 
            && id !== user.id){
            visitUserMutation({
                variables: {
                    visitor: user.id,
                    visitedUser: id
                }
            }).then(()=>{
                refetch()
            })
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    if(loading) return(
        <div className="">
            Loading...
        </div>
    )
    

    if(error) return(
        <NotFoundPage/>
    )
    
    
    async function uploadBackgroundPicture(e:any){
        const picture = (e.target.files as FileList)[0] as File
        if(picture === undefined){
            alert("Input image file");
        }else{
            const storageRef = ref(storage, `images/${user.id}/backgroundPicture/${picture.name}`);
            await uploadBytes(storageRef, picture);
            getDownloadURL(storageRef).then((url)=>{
                updateBackgroundPic({
                    variables:{
                        id: user.id,
                        url: url
                    }
                }).then(()=>{
                    refetchUser()
                })
            })
        }
    }

    async function uploadImgButtonHandler(e:any){
        const uploadImg = (e.target.files as FileList)[0] as File
        if(uploadImg === undefined){
            alert("Input image file");
        }else{
            const storageRef = ref(storage, `images/${user.id}/${uploadImg.name}`);
            await uploadBytes(storageRef, uploadImg);
            getDownloadURL(storageRef).then((url)=>{
                updateProfilePic({
                    variables: {
                        id: id,
                        imgURL: url
                    }
                }).then((e)=>{
                    refetchUser()
                })
            })
        }
    }
    
    function connectButtonHandler(){

        requestConnect({
            variables: {
                userID: user.id,
                recepient: id
            }
        }).then(()=>{
            refetchUser();
            alert("Request sent!");
        }).catch((e)=>{
            alert(e)
        })
    }

    function followButtonHandler(cond:any){
        if(cond === 1){
            console.log("test")
            requestFollow({
                variables: {
                    userID: user.id,
                    recepient: id
                }
            }).then(()=>{
                refetchUser()
            }).catch((e)=>{
                alert(e)
            })
        }else if(cond === 2){
            unfollowUser({
                variables: {
                    userID: user.id,
                    recepient: id
                }
            }).then(()=>{
                refetchUser()
            }).catch((e)=>{
                alert(e)
            })
            // console.log("unfoll")
        }
    }

    function blockButtonHandler(cond:any){
        if(cond === 1){
            blockUser({
                variables: {
                    userID: user.id,
                    recepient: id
                }
            }).then(()=>{
                refetchUser()
            }).catch((e)=>{
                alert(e)
            })
        }else if(cond === 2){
            unblockUser({
                variables: {
                    userID: user.id,
                    recepient: id
                }
            }).then(()=>{
                refetchUser()
            }).catch((e)=>{
                alert(e)
            })
        }
    }
    
    function messageHandler(){             
              
        getRoom({
            variables: {
                user1: user.id,
                user2: id
            }
        }).then((e:any)=>{            
            if(e.data.getChatRoomByUsers.id) {
                navigate(`/message/${e.data.getChatRoomByUsers.id}`)
            }else{
                addChatroom({
                    variables:{
                        userID1: user.id,
                        userID2: id
                    }
                })
            }
        }).catch((e)=>{
            alert(e)           
        })
    }

    function shareProfile(){

    }
    
    return (
        <div className='body'>
            <EducationModal active={openModal} setActive={setOpenModal} setRefetchData={setRefetchEdu}/>
            <AddExperienceModal active={openExpModal} setActive={setOpenExpModal} setRefetchData={setRefetchExp}/>
            <ShareProfileList active={shareProfileModal} setActive={setShareProfileModal}/>
            <Navbar/>
            
            <div className='bg-linkhedin'>
                <div className='grid grid-template-col-1 w-5/6'>
                    <div className='flex flex-col border-2 rounded-lg shadow-md mt-10 mr-32 ml-32 bg-white'>
                        <div className="rounded-lg shadow-md p-10 relative" style={{backgroundImage: `url(${data.getUserByID.backgroundPicture})`}}>
                            { data.getUserByID && 
                                <label htmlFor='profileImg' className='w-fit w-200px rounded-50 '>
                                    {data.getUserByID.profilePicture ? 
                                        <img src={data.getUserByID.profilePicture} className="avatar-profile cursor-pointer" />
                                        :
                                        <img src={defaultProfile} className="avatar-profile cursor-pointer" />
                                    }
                                </label>
                            }
                            <input type="file" className='hidden' id="backgroundImg" onChange={(e)=>{uploadBackgroundPicture(e)}}/>
                            {
                                id === user.id &&
                                <label htmlFor="backgroundImg">
                                    <HiPencilAlt className='bg-white absolute top-0 right-0 m-5 rounded' size={35}/>
                                </label>
                            }
                        </div>
                        
                        <div className="ml-10">
                            { data.getUserByID && 
                               <div className="">
                                    <p className='text-3xl font-semibold'>{data.getUserByID.firstName} {data.getUserByID.lastName}</p>
                                    {
                                        expData && 
                                        expData.getExperience.map((e:any)=>{
                                            return(
                                                <div className="" key={e.ID}>
                                                    {
                                                        e.endDate === "" &&
                                                        <p className='text-xl'>{e.description} at {e.location}</p>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                               </div>
                            }
                            
                        </div>

                        { id === user.id && 
                            <div>
                                <input onChange={(e)=>{uploadImgButtonHandler(e)}} type="file" accept='image/jpg, image/png, image/gif, image/jpeg' id='profileImg' className='hidden'/>
                            </div>
                        }
                        
                        <div className='m-5'>
                        {
                            (id !== user.id && user.requestConnectTo.includes(data.getUserByID.id) === true) &&
                            <p>Requested</p>
                        }
                        </div>
                        <div className='m-5'>
                        {
                            (id !== user.id && user.connectedUser.includes(data.getUserByID.id) === false && user.requestConnectTo.includes(data.getUserByID.id) === false) &&
                            <button onClick={connectButtonHandler}>Connect</button>  
                        }
                        {
                            (id !== user.id && user.followedUser.includes(data.getUserByID.id) === true) &&
                            <button onClick={()=>{followButtonHandler(2)}} className="mr-5">Unfollow</button>
                        }
                        {
                            (id !== user.id && user.followedUser.includes(data.getUserByID.id) === false) &&
                            <button onClick={()=>{followButtonHandler(1)}} className="mr-8 addBtn">Follow</button>
                        }
                        {
                            (id !== user.id && user.blockedUser.includes(data.getUserByID.id) === true) &&
                            <button onClick={()=>{blockButtonHandler(2)}}>Unblock</button>
                        }
                        {
                            (id !== user.id && user.blockedUser.includes(data.getUserByID.id) === false) &&
                            <button onClick={()=>{blockButtonHandler(1)}} className="declineBtn">block</button>
                        }
                        {
                            (id !== user.id) 
                            && !(data.getUserByID.blockedUser.includes(user.id) || user.blockedUser.includes(data.getUserByID.id)) 
                            && (user.connectedUser.includes(id)) ?
                            <button className='ml-5' onClick={messageHandler}>message</button>
                            :
                            null
                        }
                        <button className='ml-3' onClick={()=>{setShareProfileModal(true)}}>Share</button>
                        <div className="m-5">
                            {
                                id !== user.id ? 
                                <span className='font-bold text-md'>{data.getUserByID.visits.length} Views</span>
                                :
                                <span className='font-bold text-md' >{user.visits.length} Views</span>
                            }
                        </div>
                        </div>
                    </div>
                    <Education id={id} openModal={openModal} setOpenModal={setOpenModal} refetchData={refetchEdu} setRefetchData={setRefetchEdu}/>
                    <Experience id={id} setOpenModal={setOpenExpModal} refetchData={refetchExp} setRefetchData={setRefetchExp} setActiveExp={setActiveExp}/>
                </div>

            </div>
        </div>
    )
}
