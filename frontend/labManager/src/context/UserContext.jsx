import { useState, useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';

//Creating a context
const UserContext = createContext();

export const UserProvider = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    console.log(cookies);

    const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {});

    const handleUpdateUser = (user) => {
        if (user.token) {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 12 })
        }
        else {
            removeCookie('user')
        }
        setCurrentUser(user);
    };

    //provide the context
    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

//Export the context inside a custom hook
export const useUserContext = () => {
    return useContext(UserContext);
};