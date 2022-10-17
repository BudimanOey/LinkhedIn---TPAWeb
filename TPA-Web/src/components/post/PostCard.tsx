import { useContext,useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USER_BY_ID, GET_USER_CONNECTIONS } from '../../queries/userQuery'
import profile from '../../assets/profile.jpg'
import { AiOutlineLike,AiOutlineSend } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { RiShareForwardLine } from "react-icons/ri"
import { LIKE_POST } from '../../queries/postQuery'
import { UserContext } from '../../contextProvider/userContext'
import { ADD_COMMENT } from '../../queries/commentQuery'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'
import CommentComponent from './CommentComponent'
import { mentionInputPostStyle, mentionStyle } from '../MentionStyle'
import CommentContentTemplate from './CommentContentTemplate'
import { ADD_HASHTAG, GET_HASHTAGS } from '../../queries/hashtagQuery'
import { HastagRichText1, HastagRichText2 } from '../../helper/RegexFormat'
import MentionModal from '../modals/MentionModal'
import { Navigate, useNavigate } from 'react-router-dom'
import ConnectedUserList from '../modals/ConnectedUserList'

export function PostCard({postData, refetchPostData, setModal, setPostID}:any) {
    const user = useContext(UserContext).user
    const navigate = useNavigate()
    const [refetchComment, setRefetchComment] = useState(false)
    const [hoverProfile, setHoverProfile] = useState(false)
    const [comment, setComment] = useState("")

    const [commentField, setCommentField] = useState(false)
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: postData.creator,
        }
    })
    const {loading:getTagUsersLoading, error:getTagUsersError, data: getTagUsersData} = useQuery(GET_USER_CONNECTIONS ,{
        variables: {
            id: user.id
        }
    })
    const {loading:getHashtagLoading, error:getHashtageError, data:getHashtagData} = useQuery(GET_HASHTAGS)
    const [addHastagMutation] = useMutation(ADD_HASHTAG)
    const [addCommentMutation] = useMutation(ADD_COMMENT)
    const [likePost] = useMutation(LIKE_POST)

    if(loading || getTagUsersLoading || getHashtagLoading) return(
        <div>Loading...</div>
    )

    if(error || getTagUsersError || getHashtageError) return (        
        <div>Error while fetching data!</div>
    )
    
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

    function likePostHandler(){
        likePost({
            variables: {
                postID: postData.id,
                likedByID: user.id
            }
        }).then(()=>{
            refetchPostData()
        }).catch((e)=>{
            alert(e)
        })
    }    

    function addCommentHandler(){
        if(comment) {
            const texts = comment.split(" ")
            texts.map((text)=>{
                if (text.match(HastagRichText1) && !text.match(HastagRichText2)) {
                    console.log(text);
                    const hastagSubstring = text.substring(1, text.length)
                    addHastagMutation({ variables: { hashtag: hastagSubstring } }).then((e) => {
                        console.log(e);
                    })
                }
            })
            
            addCommentMutation({
                variables: {
                    commentOfPost: postData.id,
                    content: comment,
                    commentedByID: user.id,
                    replyOf: ""
                }
            }).then(()=>{
                setRefetchComment(true)
                setComment("")
            }).catch((e)=>{
                alert(e)
            })
        }
    }
        
    return (
        <div className='w-full flex-col bg-white border-2 rounded-lg shadow-md'>
             <div className='flex m-3 items-center border-bt-2-grey pb-4'>
                <div className="cursor-pointer" onClick={()=>{navigate(`/profile/${data.getUserByID.id}`)}} onMouseEnter={()=>{setHoverProfile(true)}} onMouseLeave={()=>{setHoverProfile(false)}}>
                {
                    data.getUserByID.profilePicture ? 
                    <img src={data.getUserByID.profilePicture} className='avatar-nav'/> 
                    :
                    <img src={profile} alt="" className='avatar-nav'/>
                }
                {
                    hoverProfile &&
                    <MentionModal userID={data.getUserByID.id}/>
                }
                </div>
                <div className='flex flex-col'>
                    <span className='ml-4 font-bold'>{data.getUserByID.firstName +" "+ data.getUserByID.lastName}</span>
                    <span className='ml-4'>asdas</span>
                </div>
             </div>
             <div className=''>
                {
                    postData.photoURL &&
                    <img src={postData.photoURL} className="w-full h-64 border-bt-2-grey"/>  
                    
                }
                {
                    postData.videoURL &&
                    <video src={postData.videoURL} className="w-full h-64 border-bt-2-grey" controls/>
                }
                {/* <p className='m-4 text-justify pt-4 font-semibold pt-4'>{postData.text}</p> */}
                <div className="m-4 text-justify pt-4 font-semibold">
                    <CommentContentTemplate texts={postData.text.split(" ")}/>
                </div>
             </div>
             <div className="flex m-4 justify-between pl-5 pr-5">
                {
                    postData.likedBy.includes(user.id) ?
                    <div className='center-all'>
                        <AiOutlineLike size={25} className="unlikeIcon"/>
                        <span className='select-none unlikeIcon'>Liked</span>
                        <span className='select-none color-grey text-xs'>Liked by {postData.likedBy.length} users</span>
                    </div>
                    :
                    <div className='center-all likeIcon' onClick={likePostHandler}>
                        <AiOutlineLike size={25}/>
                        <span className='select-none'>Like</span>
                        <span className='select-none text-xs'>Liked by {postData.likedBy.length} users</span>
                    </div>
                }
                <div className='center-all commentIcon' onClick={()=>{setCommentField(true)}}>
                    <BiCommentDetail size={24}/>
                    <span className='select-none'>Comment</span>
                </div>
                <div className='center-all shareIcon' onClick={()=>{
                    setModal(true)
                    setPostID(postData.id)
                }}>
                    <RiShareForwardLine size={25}/>
                    <span className='select-none'>Share</span>
                </div>
             </div>
            {
                commentField && 
                <div className='p-4 flex flex-col'>
                    <div className='flex items-center '>
                        {
                            user.profilePicture ?
                            <img src={user.profilePicture} alt="" className='avatar-nav'/>
                            :
                            <img src={profile} alt="" className='avatar-nav'/>
                        }
                        {/* <input type="text" id="commentInput" className='w-full ml-4 rounded-lg border-2 p-2' placeholder='Add a comment...'/> */}
                        <MentionsInput value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="Add a comment..." className='w-full ml-4 ' style={mentionInputPostStyle}>
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
                        
                        <AiOutlineSend size={30} className="ml-2 shareIcon" onClick={addCommentHandler}/>
                    </div>

                    <CommentComponent postData={postData} refetchComment={refetchComment}/>
                </div>
            }
        </div>
    )
}
