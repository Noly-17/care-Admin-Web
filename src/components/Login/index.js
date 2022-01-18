import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/index';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set, child, get } from "firebase/database";




const Login = () => {

    const emailRef = useRef()
    const passRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { currentUser } = useAuth()





    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to Log In')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id='password' className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' required ref={passRef} />
                        </Form.Group>
                        <Button className='w-100 mt-3' type='submit' disabled={loading}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}


export default Login;