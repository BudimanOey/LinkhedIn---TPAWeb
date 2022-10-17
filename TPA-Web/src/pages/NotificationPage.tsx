import {useContext} from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../contextProvider/userContext'
import defaultProfile from '../assets/profile.jpg'
import NotificationContent from '../components/notification/NotificationContent'
import Footer from '../components/Footer'

export default function NotificationPage() {
    const user = useContext(UserContext).user

    return (
        <div className='body bg-linkhedin'>
            <Navbar/>
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
                <NotificationContent/>
                <div className="bg-gray-400 w-72 h-72 mt-16 ml-5">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

