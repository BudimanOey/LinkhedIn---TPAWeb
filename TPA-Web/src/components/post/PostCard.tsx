import { useContext,useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import profile from '../../assets/profile.jpg'
import { AiOutlineLike,AiOutlineSend } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { RiShareForwardLine } from "react-icons/ri"
import { LIKE_POST } from '../../queries/postQuery'
import { UserContext } from '../../contextProvider/userContext'
import { ADD_COMMENT, GET_COMMENT } from '../../queries/commentQuery'
import CommentComponent from './CommentComponent'

export default function PostCard({postData, refetchPostData}:any) {
    const [refetchComment, setRefetchComment] = useState(false)
    const [commentField, setCommentField] = useState(false)
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: postData.creator,
        }
    })
    const [addCommentMutation] = useMutation(ADD_COMMENT)
    const [likePost] = useMutation(LIKE_POST)
    const user = useContext(UserContext).user
    
    
    

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
        const comment = (document.getElementById('commentInput') as HTMLInputElement).value
        if(comment) {
            addCommentMutation({
                variables: {
                    commentOfPost: postData.id,
                    content: comment,
                    commentedByID: user.id,
                    replyOf: ""
                }
            }).then(()=>{
                setRefetchComment(true)
            }).catch((e)=>{
                alert(e)
            })
        }
    }

    if(loading) return(
        <div>Loading...</div>
    )

    if(error) return (
        <div>Error while fetching data!</div>
    )
        
    return (
        <div className='w-full flex-col bg-white border-2 rounded-lg shadow-md w-full'>
             <div className='flex m-3 items-center border-bt-2-grey pb-4'>
                <div className="">
                {
                    data.getUserByID.profilePicture ? 
                    <img src={data.getUserByID.profilePicture} className='avatar-nav'/> 
                    :
                    <img src={profile} alt="" className='avatar-nav'/>
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
                <p className='m-4 text-justify pt-4 font-semibold pt-4'>{postData.text}</p>
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
                <div className='center-all shareIcon'>
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
                        <input type="text" id="commentInput" className='w-full ml-4 rounded-lg border-2 p-2' placeholder='Add a comment...'/>
                        <AiOutlineSend size={30} className="ml-2 shareIcon" onClick={addCommentHandler}/>
                    </div>

                    <CommentComponent postData={postData} refetchComment={refetchComment}/>
                </div>
            }
        </div>
    )
}
