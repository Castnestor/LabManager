import { useState, useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';

//Creating a context
const UserContext = createContext();

export const UserProvider = (props) => {
    //Using react-cookie
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    //Checking for the cookie information
    // console.log(cookies);

    //Set a new cookie if the user does not have one yet
    const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {});

    const handleUpdateUser = (user) => {
        if (user.token) {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 12 }) //cookie expires in 12 hrs
        }
        else {
            removeCookie('user')
        }
        setCurrentUser(user);
    };

   // 2. Provide the context.
    // The Provider component of any context (UserContext.Provider)
    // sends data via its value prop to all children at every level.
    // We are sending both the current user and an update function
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