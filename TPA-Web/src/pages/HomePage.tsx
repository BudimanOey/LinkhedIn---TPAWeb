import {useState,useContext} from 'react'
import AddPostModal from '../components/modals/AddPostModal'
import Navbar from '../components/Navbar'
import defaultProfile from '../assets/profile.jpg'
import PostComponent from '../components/post/PostComponent'
import { UserContext } from '../contextProvider/userContext'
import Footer from '../components/Footer'
import ConnectedUserList from '../components/modals/ConnectedUserList'

export default function HomePage() {
  const [postModal, setPostModal] = useState(false)
  const [refetchPost, setRefetchPost] = useState(false)
  const [userListModal, setUserListModal] = useState(false)
  const [postID, setPostID] = useState("")
  const user = useContext(UserContext).user
  
  return (
    <div className='body bg-linkhedin items-center h-fit w-full'>
      <Navbar/>
      <AddPostModal active={postModal} setActive={setPostModal} setRefetch={setRefetchPost}/>
      <ConnectedUserList active={userListModal} setActive={setUserListModal} postID={postID}/>
      <div className='bg-linkhedin flex w-full'>
      <div className="flex w-full justify-center">
          <div className='bg-white h-fit max-w-fit flex border-2 rounded-lg m-16 shadow-md p-5 bg-white items-center flex-col'>
              <div className="rounded-lg shadow-md" style={{backgroundImage: `url(${user.backgroundPicture})`}}>
              {
                  user.profilePicture ? 
                    <img src={user.profilePicture} className="w-48"/>
                    :
                    <img src={defaultProfile} className="w-48" />
                }
                </div>
                <span className='font-semibold '>{user.firstName} {user.lastName}</span>
            </div>
            <PostComponent setModal={setPostModal} setUserList={setUserListModal} refetchPost={refetchPost} setPostID={setPostID}/>
            <div className="bg-gray-400 w-72 h-72 mt-16 ml-5">
                <Footer/>
            </div>
        </div>
      </div>
    </div>
  )
}
