import {useContext} from 'react'
import { UserContext } from '../../contextProvider/userContext';
import ShareProfileCard from './ShareProfileCard';


export default function ShareProfileList({active, setActive}:any) {
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
                            <ShareProfileCard userID={e}/>
                        </div>
                    )
                })
            }
           </div>
        </div>
    )
}
