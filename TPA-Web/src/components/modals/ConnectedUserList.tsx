import { useQuery } from '@apollo/client'
import {useContext} from 'react'
import { UserContext } from '../../contextProvider/userContext'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import ConnectedUserCard from './ConnectedUserCard'
import "../../styles/modal.scss"

export default function ConnectedUserList({active, setActive, postID}:any) {
    const user = useContext(UserContext).user
    
    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }


    return (
        <div className={`${display} modal-container center-all`} onClick={()=>{setActive(false)}}>
           <div className="bg-white border-lg modal" onClick={(e)=>{
                e.stopPropagation()
            }}>
            {
                user.connectedUser.map((e:any)=>{
                    return(
                        <div key={e}>
                            <ConnectedUserCard userID={e} postID={postID}/>
                        </div>
                    )
                })
            }
           </div>
        </div>
    )
}
