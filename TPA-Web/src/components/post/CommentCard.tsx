import { useContext,useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import { AiOutlineLike,AiOutlineSend } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { ADD_COMMENT, LIKE_COMMENT } from '../../queries/commentQuery'
import { UserContext } from '../../contextProvider/userContext'
import CommentReplies from './CommentReplies'

export default function CommentCard({commentData, refetchComment}:any) {
    const user = useContext(UserContext).user
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: commentData.commentedBy
        }
    })
    const [likeCommentMutation] = useMutation(LIKE_COMMENT)
    const [addCommentMutation] = useMutation(ADD_COMMENT)
    const [replyComment, setReplyComment] = useState(false)
    const [refetchReply, setRefetchReply] = useState(false)

    function likeCommentHandler(){
        likeCommentMutation({
            variables: {
                commentID: commentData.id,
                likedBy: user.id
            }
        }).then(()=>{
            refetchComment()
        })
    }

    function addReplyHandler(){
        const comment = (document.getElementById('replyCommentInp') as HTMLInputElement).value
        if(comment) {
            addCommentMutation({
                variables: {
                    commentOfPost: "",
                    content: comment,
                    commentedByID: user.id,
                    replyOf: commentData.id
                }
            }).then(()=>{
                setRefetchReply(true)
            }).catch((e)=>{
                alert(e)
            })
        }
    }

    function replyCommentHandler(){
        if(replyComment) {
            setReplyComment(false)
        }else{
            setReplyComment(true)
        }
    }

    if(loading) return(
        <div className="">
            loading...
        </div>
    )
    if(error) return(
        <div className="">
            Error while fetching data
        </div>
    )

    return (
        <div className='flex'>
            <img src={data.getUserByID.profilePicture} className="avatar-nav mr-5 mt-5"/>
            <div className="flex flex-col w-full mr-6">
                <div className="flex flex-col bg-gray-400 p-3 rounded-lg">
                    <span className='font-bold'>{data.getUserByID.firstName} {data.getUserByID.lastName}</span>
                    <span>{commentData.content}</span>
                </div>
                <div className="flex items-center cursor-pointer">
                    {
                        commentData.likedBy.includes(user.id) ?
                        <div className="flex items-center unlikeIcon">
                            <AiOutlineLike size={20} className="m-2"/>
                            <span className='mr-8 '>
                                Liked
                            </span>
                        </div>
                        :
                        <div className="flex items-center likeIcon" onClick={likeCommentHandler}>
                            <AiOutlineLike size={20} className="m-2"/>
                            <span className='mr-8 '>
                                Like
                            </span>
                        </div>
                    }
                    <div className="flex items-center m-2 cursor-pointer commentIcon" onClick={replyCommentHandler}>
                        <BiCommentDetail size={20} className="m-2"/>
                        <span>
                            Reply
                        </span>
                    </div>
                </div>
                {
                    replyComment &&
                    <div className="flex items-center mb-8">
                        <input type="text" id="replyCommentInp" className='w-full rounded-lg border-2 p-2' placeholder='Reply comment'/>
                        <AiOutlineSend size={30} className="ml-2 shareIcon" onClick={addReplyHandler}/>
                    </div>
                }
                <CommentReplies commentData={commentData} refetchReply={refetchReply}/>
            </div>
        </div>
    )
}
