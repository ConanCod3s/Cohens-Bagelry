import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, getDocumentById } from '../firebase/Calls';
import { onAuthStateChanged } from "firebase/auth";

interface UserContextType {
    loggedIn: boolean;
    userInfo: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [loggedIn, setLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                getDocumentById({
                    collectionName: 'customers',
                    docId: user.uid
                }).then((userData: any) => {
                    setLogin(true);
                    setUserInfo(userData);
                });
            } else {
                setLogin(false);
                setUserInfo(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ loggedIn, userInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
