import { ReactNode, useEffect, useState} from "react";
import PropTypes from "prop-types";
import UserContext from "./index";
import {getMe} from "../../services/api/users.ts";
import {UserType} from "./UserType.ts";
//import {UserType} from "./UserType.ts";


function Provider({ children }:{children:ReactNode}) {
    const [userData, setUserData] = useState<UserType>(null);

    useEffect(() => {
        getMe().then((user) => {
            setUserData(user);
        });
    }, []);

    return <UserContext.Provider value={{userData, setUserData}}>{children}</UserContext.Provider>;
}

Provider.propTypes = {
    children: PropTypes.node,
};

export default Provider;