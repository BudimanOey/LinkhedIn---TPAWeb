import { useQuery } from '@apollo/client'
import { UserContext } from '../../contextProvider/userContext'
import { GET_COMMENT } from '../../queries/commentQuery'
import { useContext, useState } from 'react'
import CommentCard from './CommentCard'

export default function CommentComponent({postData, refetchComment}:any) {
    const user = useContext(UserContext).user
    const [refetchButton, setRefetchButton] = useState(true)
    const {loading: getCommentLoading, error: getCommentError, data: commentData,
        refetch, fetchMore} = useQuery(GET_COMMENT, {
            variables: {
                postID: postData.id,
                limit: 3,
                offset: 0
            }
        })
   
    if(refetchComment) {
        refetch()
    }
    
    if (getCommentLoading) return (
        <div className="">
        Loading...
        </div>
    )
    
    if(getCommentError) return (
        <div className="">
            Error while fetching data
        </div>
    )

    function loadMoreHandler(){
        fetchMore({
            variables: { offset: commentData.getCommentFromPost.length },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if(!fetchMoreResult.getCommentFromPost.length){
                    return previousResult
                }else{
                    return { getCommentFromPost: [...previousResult.getCommentFromPost, ...fetchMoreResult.getCommentFromPost] }
                }
            },
        })
    }

    const comments = commentData.getCommentFromPost as Array<any>

    return (
        <div className=''>
            { comments ?
                comments.map((e:any)=>{
                    return(
                        <div className='flex flex-col mt-8' key={e.id}>
                            <CommentCard commentData={e} refetchComment={refetch}/>
                        </div>
                    )
                })
                :
                null
            }
            <div className="w-full center-all mt-8 cursor-pointer" onClick={loadMoreHandler}>
                <span className='rounded-lg p-2 border-2'>Load more</span>
            </div>
        </div>
    )
}
