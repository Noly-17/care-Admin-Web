import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/index';
import { useHistory, Link } from 'react-router-dom';



const ForgotPassowrd = () => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check you inbox')
            history.push('/login')
        } catch {
            setError('Failed to Reset Password')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required ref={emailRef} />
                        </Form.Group>
                        <Button className='w-100 mt-3' type='submit' disabled={loading}>
                            Reset Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an accout? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}


export default ForgotPassowrd;