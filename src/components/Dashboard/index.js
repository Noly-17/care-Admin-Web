import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onChildAdded, onChildChanged, onValue, onChildRemoved, query, orderByChild, equalTo } from "firebase/database";


const Dashboard = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [usersAddress, setUsersAddress] = useState([])

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    useEffect(() => {
        const dbRef = ref(db, 'users/');
        onValue(dbRef, (snap) => {
                  const users = []
                  snap.forEach(item => {
                      const data = item.val()
                      if(auth.currentUser.uid == data.id){
                          users.push(data)
                          console.log(data.address)
                          setUsersAddress(data.address)
                      }
                  })
                  
  
          });
    }, [])

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className='text-center mb-4'><strong>Email: </strong>{currentUser.email}</div>
                    <div className='text-center mb-4' ><strong>Address: </strong>{usersAddress}</div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='danger' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
