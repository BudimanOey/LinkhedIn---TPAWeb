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
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import { mentionInputPostStyle, mentionStyle } from '../MentionStyle';
import { GET_USER_CONNECTIONS } from '../../queries/userQuery';
import { ADD_HASHTAG, GET_HASHTAGS } from '../../queries/hashtagQuery';
import { HastagRichText1, HastagRichText2 } from '../../helper/RegexFormat';
import { ADD_NOTIFICATION } from '../../queries/notificationQuery';

export default function AddPostModal({active, setActive, setRefetch}:any) {
    const user = useContext(UserContext).user
    const [imageLink, setImageLink] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [createPost] = useMutation(CREATE_POST)
    const [text, setText] = useState("")
    const [addHastagMutation] = useMutation(ADD_HASHTAG)
    const [addNotif] = useMutation(ADD_NOTIFICATION)
    const {loading:getHashtagLoading, error:getHashtageError, data:getHashtagData} = useQuery(GET_HASHTAGS)
    const {loading:getTagUsersLoading, error:getTagUsersError, data: getTagUsersData} = useQuery(GET_USER_CONNECTIONS ,{
        variables: {
            id: user.id
        }
    })
    
    if(getTagUsersLoading || getHashtagLoading) return(
        <div className="">
            Loading...
        </div>
    )

    if(getTagUsersError || getHashtageError) return(
        <div className="">
            Error while fetching data!
        </div>
    )

    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }


    const mentionDatas: SuggestionDataItem[] = []
    getTagUsersData.getAllConnectedUser.map((dataMention : any) => {
        let mentionData: SuggestionDataItem = { id: "", display: "" }
        let at: string = "@"
        mentionData.id = dataMention.id
        mentionData.display = at.concat(dataMention.firstName).concat(dataMention.lastName)
        mentionDatas.push(mentionData)
    })

    const hashtagDatas: SuggestionDataItem[] = []
    getHashtagData.getHashtags.map((dataHashtag:any)=>{
        let hashtagData: SuggestionDataItem = { id: "", display: "" }
        let at: string = "#"
        hashtagData.id = at.concat(dataHashtag.id)
        hashtagData.display = at.concat(dataHashtag.hashtag)
        hashtagDatas.push(hashtagData)
    })

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
        // const text = (document.getElementById("text") as HTMLInputElement).value
        if(text === "") {
            alert("Input text first!")
        }else{
            const texts = text.split(" ")
            console.log(texts);
            
            texts.map((text)=>{
                if (text.match(HastagRichText1) && !text.match(HastagRichText2)) {
                    const hastagSubstring = text.substring(1, text.length)
                    console.log(hastagSubstring);
                    addHastagMutation({ variables: { hashtag: hastagSubstring } }).then((e) => {
                        console.log(e);
                    })
                }
            })
            createPost({
                variables: {
                    text: text,
                    photo: imageLink,
                    video: videoLink,
                    creator: user.id,
                }
            }).then(()=>{
                alert("success")
                
                // user.connectedUser
                setActive(false)
                setRefetch(true)
                setText("")
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
                        {/* <textarea id="text" className='' placeholder="What's in your mind ?"></textarea> */}
                        <MentionsInput value={text} onChange={(e)=>{setText(e.target.value)}} placeholder="What's in your mind ?" style={mentionInputPostStyle} className='post-text-area'>
                            <Mention
                                trigger="@"
                                data={mentionDatas}
                                style={mentionStyle}
                            />
                            <Mention
                                trigger="#"
                                data={hashtagDatas}
                                style={mentionStyle}
                            />
                        </MentionsInput>
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
