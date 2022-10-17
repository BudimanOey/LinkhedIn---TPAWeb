import {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../contextProvider/userContext'
import profile from '../../assets/profile.jpg'
import '../../styles/post.scss'
import { useQuery } from '@apollo/client'
import { GET_POST } from '../../queries/postQuery'
import {PostCard} from './PostCard'

export default function PostComponent({setModal, refetchPost, setUserList, setPostID}:any) {
  const {user, setUser} = useContext(UserContext)
  const {loading, error, data, refetch, fetchMore, networkStatus} = useQuery(GET_POST, {
      variables: {
        id:  user.id,
        limit: 3,
        offset: 0
      },
      notifyOnNetworkStatusChange: true
  })
 
  if(data === undefined){
    return(
      <div>loading</div>
    )
  }

  if(refetchPost === true) {
    refetch()
  }

  window.onscroll = () => {
    
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      if(networkStatus !== 3){
        fetchMore({
          variables: { offset: data.getPosts.length },
          updateQuery: (previousResult, { fetchMoreResult }) => {   
              if(!fetchMoreResult.getPosts.length){
                return previousResult
              }else{
                return { getPosts: [...previousResult.getPosts, ...fetchMoreResult.getPosts] }
              }
          },
        })
      }
    }
  }

  const postData = data.getPosts as Array<any>

  return (
    <div className='flex center-all'>
        <div className='flex flex-col'>
          <div className='flex border-2 rounded-lg shadow-md mt-10 p-5 bg-white'>
            {user.profilePicture ? 
              <div className='mr-5'>
                  <img src={user.profilePicture} alt="" className='avatar-nav'/>
              </div>
              :
              <div className='mr-5'>
                  <img src={profile} alt="" className='avatar-nav'/>
              </div>
            }
            <div className='w-96 rounded-lg border-2 h-fit createPostBtn' onClick={()=>{setModal(true)}}>
              <span className='p-3 color-grey-400 select-none'>Start a post</span>
            </div>
          </div>
          {
            postData.map((e)=>{
              return(
                <div className="mt-10" key={e.id}>
                  <PostCard postData={e} refetchPostData={refetch} setModal={setUserList} setPostID={setPostID}/>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}
