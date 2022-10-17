import { useQuery } from '@apollo/client'
import {useContext,useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../contextProvider/userContext'
import { SEARCH_POST } from '../../queries/searchQuery'
import defaultProfile from '../../assets/profile.jpg'
import { PostCard } from '../post/PostCard'


export default function SearchPost() {
    const user = useContext(UserContext).user
    const {keyword} = useParams()
    const navigate = useNavigate()
    const ref = useRef(null)
    const {loading:getSearchLoading, error:getSearchError, data:getSearchData, refetch, fetchMore, networkStatus} = useQuery(SEARCH_POST, {
        variables: {
            keyword: keyword,
            limit: 3,
            offset: 0
        },
        notifyOnNetworkStatusChange: true
    })

    const handleScroll = () => {
        if(ref.current) {
            const {scrollTop, scrollHeight, clientHeight} = ref.current
            if(scrollTop + clientHeight >= scrollHeight){
                if(networkStatus !== 3){
                    fetchMore({
                      variables: { offset: getSearchData.SearchPost.length },
                      updateQuery: (previousResult, { fetchMoreResult }) => {                   
                          if(!fetchMoreResult.SearchPost.length){
                            return previousResult
                          }else{
                            return { SearchPost: [...previousResult.SearchPost, ...fetchMoreResult.SearchPost] }
                          }
                      },
                    })
                  }
                
            }
        }
    }

    if(getSearchLoading) {
        return(
            <div className="">
                Loading...
            </div>
        )
    }
    
    if(getSearchError) {
        return (
            <div className="">
                Error while fetching data
            </div>
        )
    }
    const postData = getSearchData.SearchPost as Array<any>
    

    return (
        <div id='postContainer' ref={ref} className='text-start m-5 p-4 overflow-y-auto' onScroll={handleScroll}>
            {
                postData.length !== 0 ?
                postData.map((e:any)=>{
                    return(
                        <div className="mb-10" key={e.id}>
                            <PostCard postData={e} refetchPostData={refetch}/>
                        </div>
                    )
                })
                :
                <div className="text-center">
                    Post not found!
                </div>
            }
        </div>
    )
}
