import { useMutation, useQuery } from '@apollo/client'
import {useContext, useRef, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../contextProvider/userContext'
import { SEARCH_USER } from '../../queries/searchQuery'
import defaultProfile from '../../assets/profile.jpg'
import { REQUEST_CONNECT } from '../../queries/connectionQuery'

export default function SearchUser() {
    const user = useContext(UserContext).user
    const {keyword} = useParams()
    const navigate = useNavigate()
    const ref = useRef(null)
    const [connectUserMutation] = useMutation(REQUEST_CONNECT)
    const {loading:getSearchLoading, error:getSearchError, data:getSearchData, refetch,fetchMore, networkStatus} = useQuery(SEARCH_USER, {
        variables: {
            currUser: user.id,
            keyword: keyword,
            limit: 3,
            offset: 0
        },
        notifyOnNetworkStatusChange: true
    })
    
    const handleScroll = () => {
        if (ref.current) {
            const { scrollTop, scrollHeight, clientHeight } = ref.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                if(networkStatus !== 3){
                    fetchMore({
                        variables: { offset: getSearchData.SearchUser.length },
                        updateQuery: (previousResult, { fetchMoreResult }) => {   
                            console.log(fetchMoreResult)
                            if(!fetchMoreResult.SearchUser.length){
                                return previousResult
                            }else{
                                return { getPosts: [...previousResult.getPosts, ...fetchMoreResult.getPosts] }
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
        return(
            <div className="">
                Error while fetching data!
            </div>
        )
    }

    function connectUserHandler(recepient:any) {        
        connectUserMutation({
            variables: {
                userID: user.id,
                recepient: recepient
            }
        }).then(()=>{
            refetch()
        }).catch((e)=>{
            alert(e)
        })
    }
    
    return (
        <div ref={ref} className='text-start m-5 overflow-y-auto p-5' onScroll={handleScroll}>
            {
                getSearchData.SearchUser.length !== 0 ?
                getSearchData.SearchUser.map((e:any)=>{
                    
                    return(
                        <div className="bg-gray-400 p-3 flex cursor-pointer border-2 rounded-lg shadow-md mb-10" key={e.id}>
                            {
                                e.profilePicture ?
                                <img src={e.profilePicture} alt="" className='notif-avatar-nav mr-5'/>
                                :
                                <img src={defaultProfile} alt="" className='notif-avatar-nav mr-5'/>
                            }
                            <div className="">
                                <span className="font-bold text-md" onClick={()=>{navigate(`/profile/${e.id}`)}}>
                                    {e.firstName} {e.lastName}
                                </span>
                                <p>{e.email}</p>
                                {   
                                    (e.connectedUser.includes(user.id) === false || e.connectedUser.includes(user.id) === false) &&
                                    <button className='z-index-10' onClick={()=>{connectUserHandler(e.id)}}>Connect</button>
                                }
                                {
                                    e.connectRequest.includes(user.id) &&
                                    <div className="">
                                        Requested
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
                :
                <div className="text-center">
                    User not found!
                </div>
            }
        </div>
    )
}
