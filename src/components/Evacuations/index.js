import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/index';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, get, push, set, child } from "firebase/database";




const Evacuation = () => {

    const addRef = useRef()
    const lngRef = useRef()
    const latRef = useRef()
    const [error, setError] = useState('')
    const [pushKey, setPushKey] = useState()

    async function handleSubmit(e) {
        e.preventDefault()


        const db = getDatabase();

        try {
            setError('')
           const getKey = push(ref(db, 'evacuationRoutes/' + pushKey), {
                longitude: lngRef.current.value,
                latitude: latRef.current.value,
                evacuationAdd: addRef.current.value
            });
            setPushKey(getKey.key)

        } catch {
            setError('Failed to add evacution')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Evacuation</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='address' className='mt-3'>
                            <Form.Label>Baranggay Address</Form.Label>
                            <Form.Control type='text' required ref={addRef} />
                        </Form.Group>
                        <Form.Group id='latitude' className='mt-3'>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type='number' required ref={latRef} />
                        </Form.Group>
                        <Form.Group id='longitude' className='mt-3'>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type='number' required ref={lngRef} />
                        </Form.Group>
                        <Button className='w-100 mt-3' type='submit'>
                            Add
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}


export default Evacuation;