import authService from "@/services/authService";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const getUserApi = async () => {
            try {
                const data = await authService.currentUser();
                setUser(data.user);
            } catch (error) {
                // console.log(error)
            } finally {
                setLoading(false);
            }
        }
        getUserApi();
    }, [])

    const value = {
        user,
        loading
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



