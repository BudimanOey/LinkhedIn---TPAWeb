import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageHooks";

export const UserContext = createContext(null as any);

export default function UserContextProvider({children}:any){
    const [user,setUser] = useLocalStorage("user", {})

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

