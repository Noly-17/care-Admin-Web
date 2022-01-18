import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/index';
import { useHistory, Link } from 'react-router-dom';


const Signup = () => {

    const emailRef = useRef()
    const passRef = useRef()
    const passConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passRef.current.value !== passConfirmRef.current.value) {
            return setError("Password didn't match")
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, emailRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id='password' className='mt-3'>
                            <Form.Label>password</Form.Label>
                            <Form.Control type='password' required ref={passRef} />
                        </Form.Group>
                        <Form.Group id='password-confirm' className='mt-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password-confirm' required ref={passConfirmRef} />
                        </Form.Group>
                        <Button className='w-100 mt-3' type='submit' disabled={loading}>
                            Sign Up
                        </Button>
                        <Link to='/forgotpassword'><h5 className='text-center mt-3'>Forgot Password?</h5></Link>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}


export default Signup;