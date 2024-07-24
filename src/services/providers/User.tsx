import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, getDocumentById } from '../firebase/Calls';
import { onAuthStateChanged } from "firebase/auth";

interface UserInfo {
    uid: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

interface UserContextType {
    loggedIn: boolean;
    userInfo: UserInfo | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [loggedIn, setLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userData = await getDocumentById({
                        collectionName: 'customers',
                        docId: user.uid
                    });
                    setLogin(true);
                    setUserInfo(userData as UserInfo);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLogin(false);
                    setUserInfo(null);
                }
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
