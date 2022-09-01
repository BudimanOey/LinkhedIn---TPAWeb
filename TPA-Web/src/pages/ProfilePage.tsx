import { useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext';
import { storage } from '../firebase/firebaseConnect';
import { GET_USER_BY_ID, REQUEST_CONNECT, UPDATE_PROFILE_PICTURE } from '../queries/userQuery';
import '../styles/styleLib.scss';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Education from '../components/Educations/Education';
import EducationModal from '../components/modals/EducationModal';
import Experience from '../components/Experience/Experience';
import AddExperienceModal from '../components/modals/AddExperienceModal'; 
import defaultProfile from '../assets/profile.jpg'
import { BiLogOut } from "react-icons/bi";
import UpdateExperience from '../components/modals/UpdateExperience';
import { RefetchUser } from '../contextProvider/RefetchUserContext';


export default function ProfilePage() {
    const {user, setUser} = useContext(UserContext)
    const refetchUser = useContext(RefetchUser).refetchUserData;
    const {id} = useParams();
    const [updateProfilePic] = useMutation(UPDATE_PROFILE_PICTURE);
    const [requestFollow] = useMutation(REQUEST_CONNECT);
    const [openModal, setOpenModal] = useState(false);
    const [openExpModal, setOpenExpModal] = useState(false);
    const [refetchEdu, setRefetchEdu] = useState(false);
    const [refetchExp, setRefetchExp] = useState(false);

    
    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID,{
        variables: {
            id: id
        }
    })

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
                    const updatedUser = user
                    updatedUser.profilePic = e.data.updateProfileImage
                    setUser(updatedUser);
                    refetch();
                })
            })
        }
    }
    
    function connectButtonHandler(){

        requestFollow({
            variables: {
                userID: user.id,
                recepient: id
            }
        }).then(()=>{
            refetchUser();
            alert("Request sent!");
        })
    }
    
    function logoutButtonHandler(){
        setUser({})
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

    console.log(user)
    console.log(data.getUserByID.id)

    return (
        <div className='body'>
            <EducationModal active={openModal} setActive={setOpenModal} setRefetchData={setRefetchEdu}/>
            <AddExperienceModal active={openExpModal} setActive={setOpenExpModal} setRefetchData={setRefetchExp}/>
            
            <Navbar/>
            
            <div className='full-screen'>
                <div className='grid grid-template-col-1 w-5/6'>
                    <div className='flex flex-col border-2 rounded-lg shadow-md mt-10 mr-32 ml-32 p-10'>
                        {
                            id === user.id &&
                            <div>
                                <BiLogOut className='delete-style cursor-pointer' onClick={logoutButtonHandler} size={30}/>
                            </div>
                        }
                        { data.getUserByID && 
                            <label htmlFor='profileImg' className='w-fit w-200px rounded-50'>
                                {data.getUserByID.profilePicture ? 
                                    <img src={data.getUserByID.profilePicture} className="avatar-profile cursor-pointer" />
                                    :
                                    <img src={defaultProfile} className="avatar-profile cursor-pointer" />
                                }
                            </label>
                        }
                        { data.getUserByID && 
                            <p className='text-2xl'>{data.getUserByID.firstName} {data.getUserByID.lastName}</p>
                        }

                        { id === user.id && 
                            <div>
                                <input onChange={(e)=>{uploadImgButtonHandler(e)}} type="file" accept='jpg,png,jpeg' id='profileImg' className='hidden'/>
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
                            (id !== user.id && user.requestConnectTo.includes(data.getUserByID.id) === false) &&
                            <button onClick={connectButtonHandler}>Connect</button>  
                        }
                          
                        
                        </div>
                    </div>
                    <Education id={id} openModal={ openModal} setOpenModal={setOpenModal} refetchData={refetchEdu} setRefetchData={setRefetchEdu}/>
                    <Experience id={id} setOpenModal={setOpenExpModal} refetchData={refetchExp} setRefetchData={setRefetchExp}/>
                </div>

            </div>
        </div>
    )
}
