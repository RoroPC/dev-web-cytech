import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "./index";
import {getMe} from "../../services/api/users.ts";


function Provider({ children }:{children:object}) {
    const [userData, setUserData] = useState(undefined);
    const [value, setValue] = useState({ userData });
    //TODO: Update le getMe avec l'api
    useEffect(() => {
        getMe().then((user) => {
            setUserData(user);
        });
    }, []);
    useEffect(() => {
        setValue({ userData });
    }, [userData]);
    // @ts-expect-error Corriger quand la connexion sera implémenter
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

Provider.propTypes = {
    children: PropTypes.object.isRequired,
};

export default Provider;