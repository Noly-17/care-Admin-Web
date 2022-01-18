import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { getDatabase, ref, get, push, set, child } from "firebase/database";



const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState(false)



    // for signingup or making an account
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // for login 
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // for logout
    function logout() {
        return auth.signOut()
    }

    // for forgot password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    // for upload
    function upload(userId, name, email, imageUrl) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/`))
                .then((snapshot) => {
                    const users = []
                    snapshot.forEach(item => {
                        const data = item.val()
                        users.push(data)
                        console.log(data.id)
                        console.log(currentUser.uid)
                        if (data.id == currentUser.uid) {
                            if (data.adminRole == true) {
                                setRole(true)
                            }
                        }
                    })
    
    
                }).catch((error) => {
                    console.error(error);
                });
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        upload
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

