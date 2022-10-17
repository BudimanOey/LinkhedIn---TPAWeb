import { useContext,useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_BY_ID, GET_USER_CONNECTIONS } from '../../queries/userQuery'
import { AiOutlineLike,AiOutlineSend } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { ADD_COMMENT, LIKE_COMMENT } from '../../queries/commentQuery'
import { UserContext } from '../../contextProvider/userContext'
import CommentReplies from './CommentReplies'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { mentionInputCommentStyle, mentionInputPostStyle, mentionStyle } from '../MentionStyle'
import CommentContentTemplate from './CommentContentTemplate'
import { ADD_HASHTAG, GET_HASHTAGS } from '../../queries/hashtagQuery'
import { HastagRichText1, HastagRichText2 } from '../../helper/RegexFormat'

export default function CommentCard({commentData, refetchComment}:any) {
    const user = useContext(UserContext).user
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: commentData.commentedBy
        }
    })
    const [likeCommentMutation] = useMutation(LIKE_COMMENT)
    const [addCommentMutation] = useMutation(ADD_COMMENT)
    const [addHastagMutation] = useMutation(ADD_HASHTAG)
    const [replyComment, setReplyComment] = useState(false)
    const [refetchReply, setRefetchReply] = useState(false)
    const {loading:getTagUsersLoading, error:getTagUsersError, data: getTagUsersData} = useQuery(GET_USER_CONNECTIONS ,{
        variables: {
            id: user.id
        }
    })
    const {loading:getHashtagLoading, error:getHashtageError, data:getHashtagData} = useQuery(GET_HASHTAGS)
    const [comment, setComment] = useState('')
    
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

    console.log(commentData)
    function addReplyHandler(){
        // const comment = (document.getElementById('replyCommentInp') as HTMLInputElement).value
        if(comment) {
            const texts = comment.split(" ")
            texts.map((text)=>{
                if (text.match(HastagRichText1) && !text.match(HastagRichText2)) {
                    const hastagSubstring = text.substring(1, text.length)
                    console.log(hastagSubstring);
                    addHastagMutation({ variables: { hashtag: hastagSubstring } }).then((e:any) => {
                        console.log(e);
                    })
                }
            })
            addCommentMutation({
                variables: {
                    commentOfPost: "",
                    content: comment,
                    commentedByID: user.id,
                    replyOf: commentData.id
                }
            }).then(()=>{
                setRefetchReply(true)
                setComment('')
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

    return (
        <div className='flex'>
            <img src={data.getUserByID.profilePicture} className="avatar-nav mr-5 mt-5"/>
            <div className="flex flex-col w-full mr-6">
                <div className="flex flex-col bg-gray-400 p-3 rounded-lg">
                    <span className='font-bold'>{data.getUserByID.firstName} {data.getUserByID.lastName}</span>
                    <CommentContentTemplate texts={commentData.content.split(" ")} />
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
                        {/* <input type="text" id="replyCommentInp" className='w-full rounded-lg border-2 p-2' placeholder='Reply comment'/> */}
                        <MentionsInput value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="Add a comment..." className='w-full' style={mentionInputPostStyle}>
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
                        <AiOutlineSend size={30} className="ml-2 shareIcon" onClick={addReplyHandler}/>
                    </div>
                }
                <CommentReplies commentData={commentData} refetchReply={refetchReply}/>
            </div>
        </div>
    )
}
