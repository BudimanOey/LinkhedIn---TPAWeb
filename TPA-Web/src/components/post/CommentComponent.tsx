import { useQuery } from '@apollo/client'
import { GET_COMMENT } from '../../queries/commentQuery'
import CommentCard from './CommentCard'

export default function CommentComponent({postData, refetchComment}:any) {

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
                let check = false;
  
                for (let index = 0; index < previousResult.getCommentFromPost.length; index++) {
                    for (let index2 = 0; index2 < fetchMoreResult.getCommentFromPost.length; index2++) {
                        if (previousResult.getCommentFromPost[index].id === fetchMoreResult.getCommentFromPost[index2].id) {
                            check = true
                        }
                    }
                }
  
                if (check === true) {
                    return previousResult
                    
                } else {
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
