import { useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext';
import { storage } from '../firebase/firebaseConnect';
import { BLOCK_USER, FOLLOW_USER, GET_USER_BY_ID, UNBLOCK_USER, UNFOLLOW_USER, UPDATE_BACKGROUND_PICTURE, UPDATE_PROFILE_PICTURE } from '../queries/userQuery';
import '../styles/styleLib.scss';
import { useParams } from 'react-router-dom';
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



export default function ProfilePage() {
    const {user, setUser} = useContext(UserContext)
    const refetchUser = useContext(RefetchUser).refetchUserData;
    const {id} = useParams();
    const [updateProfilePic] = useMutation(UPDATE_PROFILE_PICTURE);
    const [updateBackgroundPic] = useMutation(UPDATE_BACKGROUND_PICTURE);
    const [requestConnect] = useMutation(REQUEST_CONNECT);
    const [requestFollow] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const [blockUser] = useMutation(BLOCK_USER);
    const [unblockUser] = useMutation(UNBLOCK_USER); 
    const [openModal, setOpenModal] = useState(false);
    const [openExpModal, setOpenExpModal] = useState(false);
    const [refetchEdu, setRefetchEdu] = useState(false);
    const [refetchExp, setRefetchExp] = useState(false);
    const [activeExp, setActiveExp] = useState();

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

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }
    if(error){
        return(
            <NotFoundPage/>
        )
    }

    // console.log(expData.getExperience)

    return (
        <div className='body'>
            <EducationModal active={openModal} setActive={setOpenModal} setRefetchData={setRefetchEdu}/>
            <AddExperienceModal active={openExpModal} setActive={setOpenExpModal} setRefetchData={setRefetchExp}/>
            
            <Navbar/>
            
            <div className='h-full bg-linkhedin'>
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
                            <label htmlFor="backgroundImg">
                                <HiPencilAlt className='bg-white absolute top-0 right-0 m-5' size={35}/>
                            </label>
                        </div>
                        
                        <div className="ml-10">
                            { data.getUserByID && 
                               <div className="">
                                    <p className='text-3xl font-semibold'>{data.getUserByID.firstName} {data.getUserByID.lastName}</p>
                                    {
                                        expData.getExperience.map((e:any)=>{
                                            return(
                                                <div className="">
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
                        
                        <div>
                        {
                            (id !== user.id && user.requestConnectTo.includes(data.getUserByID.id) === true) &&
                            <p>Requested</p>
                        }
                        </div>
                        <div>
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
                        </div>
                    </div>
                    <Education id={id} openModal={openModal} setOpenModal={setOpenModal} refetchData={refetchEdu} setRefetchData={setRefetchEdu}/>
                    <Experience id={id} setOpenModal={setOpenExpModal} refetchData={refetchExp} setRefetchData={setRefetchExp} setActiveExp={setActiveExp}/>
                </div>

            </div>
        </div>
    )
}
