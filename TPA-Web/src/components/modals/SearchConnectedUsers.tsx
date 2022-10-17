import { useLazyQuery, useMutation } from '@apollo/client';
import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../assets/profile.jpg'
import { UserContext } from '../../contextProvider/userContext';
import { ADD_ROOM, GET_CHATROOM_BY_USERS } from '../../queries/messageQuery';

export default function SearchConnectedUsers({conUsers}:any) {
    const navigate = useNavigate()
    const user = useContext(UserContext).user
    const [addChatroom] = useMutation(ADD_ROOM)
    const [getRoom,{loading:getChatRoomLoading, error:getChatRoomError, data:getChatRoomData}] = useLazyQuery(GET_CHATROOM_BY_USERS)

    var position:string;
    if(conUsers.length > 0){
        position = "absolute"
    }else{
        position = ""
    }

    function navigateRoomHandler(data:any) {
        console.log(data);
        
        getRoom({
            variables: {
              user1: user.id,
              user2: data.id
            }
          }).then((e:any)=>{   
            console.log(e.data.getChatRoomByUsers.id);
                     
              if(e.data.getChatRoomByUsers.id) {
                navigate(`/message/${e.data.getChatRoomByUsers.id}`)
              }else{
                  addChatroom({
                      variables:{
                          userID1: user.id,
                          userID2: data.id
                      }
                  }).then((e)=>{
                    // console.log(e);
                    
                    navigate(`/message/${e.data.getChatRoomByUsers.id}`)
                  })
              }
          }).catch((e:any)=>{
              alert(e)           
          })
    }
    
    return (
        <div className={`${position} bg-white border-2 rounded-md shadow-md ml-5 mt-24`}>
            {/* <div className="absolute right-0">close</div> */}
            {
                conUsers.map((e:any)=>{
                    return(
                        <div key={e.id} className="justify-start p-3 items-center cursor-pointer" onClick={()=>{navigateRoomHandler(e)}}>
                            {
                                e.profilePicture ?
                                <img src={e.profilePicture} alt="" className='avatar-nav' />
                                :
                                <img src={defaultProfile} alt="" className='avatar-nav'/>
                            }
                            <span className='font-bold text-md ml-3'>{e.firstName} {e.lastName}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
