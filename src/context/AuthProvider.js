import React, { createContext, useState, useContext } from 'react'

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)
export const baseAvatarUrl = 'http://8.142.171.141:8080/school-news/user/img?path='

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider