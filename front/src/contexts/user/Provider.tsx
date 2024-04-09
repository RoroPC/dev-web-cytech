import {ReactNode, useEffect, useState} from "react";
import PropTypes from "prop-types";
import UserContext from "./index";
import {getMe} from "../../services/api/users.ts";
import {UserType} from "./UserType.ts";
function Provider({ children }:{children:ReactNode}) {
    const [userData, setUserData] = useState<UserType>({
        username:null,
        email: null,
        first_name:null,
        last_name:null
    });
    const [value,setValue] = useState(userData);

    useEffect(() => {
        getMe().then((user) => {
            setUserData(user);
        });
    }, []);

    useEffect(() => {
        setValue(userData)
    }, [userData]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

Provider.propTypes = {
    children: PropTypes.node,
};

export default Provider;