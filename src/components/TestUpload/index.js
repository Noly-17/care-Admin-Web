import React, { useState } from 'react';
import { getDatabase, ref, get, push, set, child } from "firebase/database";

const db = ref(getDatabase());
get(child(db, `requests/`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

const TestUpload = () => {
    const [taskName, setTaskName] = useState('')
    const [key, setKey] = useState('')
    console.log(key);


    function createTodo(e,) {
        e.preventDefault()


        const db = getDatabase();

        const newOrderRef = push(ref(db, 'requests/'), {
            id: key,
            username: taskName,
            profile_picture: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
        });

        setKey(newOrderRef.key)






        try {

        } catch {
            console.log("error")
        }
    };

    const handleChange = (e) => {
        setTaskName(e.target.value)
    }

    return (
        <form onSubmit={createTodo}>
            <input
                type='text'
                placeholder='Enter Todo'
                value={taskName}
                onChange={handleChange}
            />
            <button type='submit'>upload</button>
        </form>
    )
}

export default TestUpload
