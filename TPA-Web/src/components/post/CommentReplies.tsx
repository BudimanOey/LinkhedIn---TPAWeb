import { useQuery } from '@apollo/client'
import { GET_REPLY } from '../../queries/commentQuery'
import CommentCard from './CommentCard'

export default function CommentReplies({commentData, refetchReply}:any) {
    const {loading, error, data, refetch} = useQuery(GET_REPLY, {
        variables: {
            commentID: commentData.id,
            limit: 3,
            offset: 0
        }
    })

    if(refetchReply) {
        refetch()
    }

    if(loading) return (
        <div className="">
            Loading...
        </div>
    )

    if(error) return (
        <div className="">
            Error while fetching data!
        </div>
    )


    return (
        <div>
            {
                data.getCommentReplies.map((e:any)=>{
                    return(
                        <div key={e.id}>
                            <CommentCard commentData={e}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

