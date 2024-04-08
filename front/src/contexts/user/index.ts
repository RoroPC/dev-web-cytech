import { createContext } from "react";
import {UserType} from "./UserType.ts";

const userType:UserType = {
    username:null,
    email: null,
    first_name:null,
    last_name:null
}

const UserContext = createContext(userType);
export default UserContext;