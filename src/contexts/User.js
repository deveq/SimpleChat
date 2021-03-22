import React, { createContext, useState } from 'react';

const UserContext = createContext({
    user : { email: null, uid: null},
    dispatch : () => null,
});

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState({});
    const dispatch = ({email, uid}) => {
        setUser({ email, uid});
    }
    const value = { user, dispatch };
    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };