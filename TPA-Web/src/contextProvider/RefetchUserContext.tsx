import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageHooks";
import { GET_USER_BY_ID } from "../queries/userQuery";
import { UserContext } from "./userContext";

export const RefetchUser = createContext(null as any);

export default function RefetchUserProvider({children}:any){
    const {user, setUser} = useContext(UserContext)
    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: user.id
        }
    })

    // console.log(user.token)

    function refetchUserData(){
        refetch().then((e)=>{
            const newUser = {...e.data.getUserByID, token: user.token}
            console.log(newUser)
            setUser(newUser)
            console.log(user)
            // setUser(newUser)
        })
    }

    return(
        <RefetchUser.Provider value={{refetchUserData}}>
            {children}
        </RefetchUser.Provider>
    )
}