'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useState<{id:string, name: string; email: string; isAdmin?: boolean } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: {id:string, name: string; email: string; isAdmin?: boolean }) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auths/login');  // Logout ke baad login page pe redirect
    };

    const protectRoute = () => {
        if (!localStorage.getItem('user')) {
            router.push('/auths/login');  // Agar user logged in nahi hai toh login pe redirect
        }
    };

    const protectAdminRoute = () => {
        const storedUser = localStorage.getItem('user');
        console.log('Stored User:', storedUser); // Debugging localStorage data
    
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log('Parsed User:', parsedUser); // Check if isAdmin is true
    
            if (!parsedUser.isAdmin) {
                console.log('Redirecting non-admin user to homepage'); // Debug redirect trigger
                router.push('/');  // Redirect non-admin users
            }
        } else {
            console.log('No user found, redirecting to login'); // Debug when no user found
            router.push('/auths/login');  // Redirect if no user is logged in
        }
    };
    

    return { user, login, logout, protectRoute, protectAdminRoute };
}


