import {useContext, useState} from 'react'
import { UserContext } from '../../contextProvider/userContext'
import profile from '../../assets/profile.jpg'
import { MdSlowMotionVideo, MdInsertPhoto } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConnect';
import { uuidv4 } from '@firebase/util';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../../queries/postQuery';

export default function AddPostModal({active, setActive, setRefetch}:any) {
    const user = useContext(UserContext).user
    const [imageLink, setImageLink] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [createPost] = useMutation(CREATE_POST)

    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }

    async function uploadImgHandler(e:any){
        const uploadImg = (e.target.files as FileList)[0] as File
        if(uploadImg !== undefined && videoLink === "") {
            const storageRef = ref(storage, `images/post/${uuidv4()}/${uploadImg.name}`)
            await uploadBytes(storageRef, uploadImg)
            getDownloadURL(storageRef).then((url)=>{
                setImageLink(url)
            })
        }else if(uploadImg !== undefined && (videoLink || imageLink) !== ""){
            // console.log("masuk")
            setImageLink("")
            setVideoLink("")
            const storageRef = ref(storage, `images/post/${uuidv4()}/${uploadImg.name}`)
            await uploadBytes(storageRef, uploadImg)
            getDownloadURL(storageRef).then((url)=>{
                setImageLink(url)
            })
        }
    }

    async function uploadVideoHandler(e:any){
        const uploadVid = (e.target.files as FileList)[0] as File
        if(uploadVid !== undefined && imageLink === "") {
            const storageRef = ref(storage, `images/post/${uuidv4()}/${uploadVid.name}`)
            await uploadBytes(storageRef, uploadVid)
            getDownloadURL(storageRef).then((url)=>{
                setVideoLink(url)
            })
        }else if(uploadVid !== undefined && (imageLink || videoLink) !== ""){
            setImageLink("")
            setVideoLink("")
            const storageRef = ref(storage, `images/post/${uuidv4()}/${uploadVid.name}`)
            await uploadBytes(storageRef, uploadVid)
            getDownloadURL(storageRef).then((url)=>{
                setVideoLink(url)
            })
        }
    }

    function postHandler(){
        const text = (document.getElementById("text") as HTMLInputElement).value
        if(text === "") {
            alert("Input text first!")
        }else{
            createPost({
                variables: {
                    text: text,
                    photo: imageLink,
                    video: videoLink,
                    creator: user.id,
                }
            }).then(()=>{
                alert("success")
                setActive(false)
                setRefetch(true)
                // iamge
            }).catch((e)=>{
                alert(e)
            })
        }
    }


    return (
        <div className={`${display} modal-container center-all`} onClick={(e)=>{
                setActive(false)
            }}>
            <div className='bg-white border-lg modal' onClick={(e)=>{
                e.stopPropagation()
            }}>
                <div className='flex items-center justify-between border-bt-2-grey'>
                <div className='flex justify-center pl-5'>
                    {user.profilePicture ? 
                        <div>
                            <img src={user.profilePicture} alt="" className='avatar-nav'/>
                        </div>
                        :
                        <div>
                            <img src={profile} alt="" className='avatar-nav'/>
                        </div>
                        }
                    <span className='ml-5 mt-1'>{user.firstName} {user.lastName}</span>
                </div>
                    <span className='font-bold  p-4'>Create post</span>
                </div>
                <div className='modal-content mt-2'>
                    {
                        imageLink && 
                        <div className='flex w-full pb-5 relative'>
                            <img src={imageLink} alt="" className='w-full pb-5'/> 
                            <IoMdRemoveCircleOutline className='declineBtn absolute right-0 rounded-2xl m-2 cursor-pointer' size={30} onClick={()=>{setImageLink("")}}/>
                        </div>
                    }
                    {
                        videoLink &&
                        <div className="flex w-full pb-5 relative">
                            <video src={videoLink} className="w-full h-64" controls/>
                            <IoMdRemoveCircleOutline className='declineBtn absolute right-0 rounded-2xl m-2 cursor-pointer' size={30} onClick={()=>{setVideoLink("")}}/>
                        </div>
                    }
                    <div className='w-full flex-col'>
                        <textarea id="text" className='post-text-area' placeholder="What's in your mind ?"></textarea>
                    </div>
                    <label htmlFor="postVideo">
                        <MdSlowMotionVideo className='videoIcon' size={30}/>
                    </label>
                    <input onChange={(e)=>{uploadVideoHandler(e)}} type="file" accept='video/*' id='postVideo' className='hidden' />
                    <label htmlFor="photoIcon">       
                        <MdInsertPhoto size={30} className="photoIcon" id='postPhoto'/>
                    </label>
                    <input onChange={(e)=>{uploadImgHandler(e)}} type="file" id='photoIcon' className='hidden' accept='image/png, image/jpg, image/jpeg, image/gif'/>
                    
                </div>
                <div className='justify-end pt-5 pb-5'>
                    <button className='addBtn' onClick={postHandler}>post</button>
                </div>
            </div>
        </div>
    )
}
