import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageHooks";
import { GET_USER_BY_ID } from "../queries/userQuery";
import { UserContext } from "./userContext";

export const RefetchUser = createContext(null as any);

export default function RefetchUserProvider({children}:any){
    const userContext = useContext(UserContext).user
    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
        variables: {
            id: userContext.id
        }
    })

    function refetchUserData(){
        refetch().then((e)=>{
            console.log(e)
        })
    }

    return(
        <RefetchUser.Provider value={refetchUserData}>
            {children}
        </RefetchUser.Provider>
    )
}

