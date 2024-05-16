import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {UserType} from "./UserType.ts";

type UserContextType = {
    userData:UserType,
    setUserData: Dispatch<SetStateAction<UserType>>
}
const UserContext = createContext<UserContextType|undefined>(undefined);

export const useUser = () =>{
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
export default UserContext;