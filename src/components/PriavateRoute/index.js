import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Auth';
import { getDatabase, ref, set, child, get } from "firebase/database";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth()
    const [role, setRole] = useState(false)


    useEffect(() => {


        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`))
            .then((snapshot) => {
                const users = []
                snapshot.forEach(item => {
                    const data = item.val()
                    users.push(data)
                    console.log(data.id)
                    console.log(currentUser.uid)
                   if(currentUser !== null){
                    if (data.id == currentUser.uid) {
                        if (data.adminRole == true) {
                            setRole(true)
                        }
                    }
                   }
                })


            }).catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='login' />
            }}
        >

        </Route >
    )
}

export default PrivateRoute
