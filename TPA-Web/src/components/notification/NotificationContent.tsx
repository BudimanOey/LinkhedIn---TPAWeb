import { useQuery } from '@apollo/client'
import {useContext, useEffect} from 'react'
import { UserContext } from '../../contextProvider/userContext'
import { GET_NOTIFICATIONS } from '../../queries/notificationQuery'
import NotificationCard from './NotificationCard'

export default function NotificationContent() {
    const user = useContext(UserContext).user
    const {loading:getNotifLoading, error:getNotifError, data:getNotifData, startPolling} = useQuery(GET_NOTIFICATIONS,{
        variables: {
            userID: user.id
        }
    })

    useEffect(() => {
      startPolling(500)
    }, [])
    

    if(getNotifLoading) return (
        <div className="bg-white center-all flex flex-col border-2 rounded-lg shadow-md min-w-2xl mt-16">
            <span>Notifications</span>
            <p>Loading...</p>
        </div>
    )

    if(getNotifError) return (
        <div className="bg-white center-all flex flex-col border-2 rounded-lg shadow-md min-w-2xl mt-16">
            <span>Notifications</span>    
            <p>Error while fetching data!</p>
        </div>
    )
    
    return (
        <div className="bg-white flex flex-col border-2 rounded-lg shadow-md min-w-2xl mt-16 max-h-lg overflow-auto">
            <span className='font-bold m-5 text-xl'>Notifications</span>
            <div className="overflow-auto p-3">
                {
                    getNotifData.getNotifications.length !== 0 ? 
                    getNotifData.getNotifications.map((data:any)=>{
                        return(
                            <div key={data.id}>
                                <NotificationCard notifData={data}/>
                            </div>
                        )
                    })
                    :
                    <div className="m-5">
                        Empty
                    </div>
                }
            </div>
        </div>
    )
}
