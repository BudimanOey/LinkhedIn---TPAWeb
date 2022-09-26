import {useState,useContext} from 'react'
import AddPostModal from '../components/modals/AddPostModal'
import Navbar from '../components/Navbar'
import defaultProfile from '../assets/profile.jpg'
import PostComponent from '../components/post/PostComponent'
import { UserContext } from '../contextProvider/userContext'

export default function HomePage() {
  const [postModal, setPostModal] = useState(false)
  const [refetchPost, setRefetchPost] = useState(false)
  const user = useContext(UserContext).user
  
  return (
    <div className='body bg-linkhedin items-center h-full'>
      <Navbar/>
      <AddPostModal active={postModal} setActive={setPostModal} setRefetch={setRefetchPost}/>
      <div className='bg-linkhedin flex'>
        <div className='bg-white h-fit flex border-2 rounded-lg shadow-md m-10 p-5 bg-white items-center flex-col'>
          <div className="rounded-lg shadow-md" style={{backgroundImage: `url(${user.backgroundPicture})`}}>
          {
            user.profilePicture ? 
            <img src={user.profilePicture} className="avatar-home" />
            :
            <img src={defaultProfile} className="avatar-home cursor-pointer" />
          }
          </div>
          <span className='font-semibold '>{user.firstName} {user.lastName}</span>
        </div>
        <PostComponent setModal={setPostModal} refetchPost={refetchPost}/>
      </div>
    </div>
  )
}
