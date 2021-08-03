import React from 'react';
import API from '../config/api';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

const initialState = {
    userId: null,
};

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(initialState);

    // FIXME: TOken must be set, AND MUST BE A VALID ONE!
    // It's not enough to check for a token to say the user
    // is authenticated
    React.useEffect(() => {
        if(localStorage.getItem('token')) {
            setUser(prevState => ({...prevState, userId: 1 }));
        }
    }, [])

    const login = async (loginData) => {
        try {
            const { user, token } = await API.login(loginData);
            console.log(user, token)

            if (token && user) {
                localStorage.setItem('token', token);
                setUser(prevState => ({...prevState, userId: user.id }));
            }
        } catch(error) {
            console.log(error);
        }
    } 

    const register = async (registrationData) => {
        try {
            await API.register(registrationData);
        } catch(error) {
            console.log(error);
        }
    } 

    const logout = async () => {
        try {
            await API.logout();
            
            localStorage.removeItem('token');

            setUser(null)
        } catch(error) {
            console.log(error);

        }
    } 

    return (
        <AuthContext.Provider value={{user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
      throw new Error(`useAuth must be used within an AuthProvider`);
    }

    return context;
}

export {AuthProvider, useAuth}
