import React, { useEffect, useState } from 'react'
import Parse from 'parse'
import { Form, Button } from 'react-bootstrap';
import { environment } from '../environment';

const client = new Parse.LiveQueryClient({
    applicationId: environment.APPLICATION_ID,
    serverURL: environment.liveQueryServerURL, // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: environment.JAVASCRIPT_KEY
});
client.open();

const Objects = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const SaveData = async() => {
        const saveData = Parse.Object.extend('Text');
        const data = new saveData();

        data.set('title', title);
        data.set('description', description);
    
        try {
          const res = await data.save();
          console.log('res', res);
        } catch (error) {
          console.log('error', error);
        }
    }

    useEffect(() => {
        const query = Parse.Object.extend('Text');
        const queryPost = new Parse.Query(query);
        queryPost.equalTo('objectId', 'rBcslPbVLC');
        var subscription = client.subscribe(queryPost);
        subscription.on('update', obj => {
            if (obj.id === "rBcslPbVLC"){
                setTitle(obj.attributes.title)
                setDescription(obj.attributes.description)
            }
            console.log('On update event', obj);
         });
    })
    

    const EditData = async() => {
        const saveData = Parse.Object.extend('Text');
        const data = new Parse.Query(saveData);
        // Retrieve the object by id
        data.get('rBcslPbVLC')
        .then((data) => {
          data.set("description", description);
          data.set("title", title);
          data.save();
        }, (error) => {
          // The object was not retrieved successfully.
        });
    }

    useEffect(() => {
        const initData = Parse.Object.extend('Text');
        const initialdata = new Parse.Query(initData);
        
        initialdata.get("rBcslPbVLC")        
        .then((data) => {
            console.log(data.attributes.title)
            setTitle(data.attributes.title)
            setDescription(data.attributes.description)
          // The object was retrieved successfully.
        }, (error) => {
            throw(error)
          // The object was not retrieved successfully.
        });
    },[])
    
    return(
        <>
        <div className='container'>
        <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
        type='text'
        name='title'
        placeholder='Enter Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
            <Form.Control 
            as="textarea"
            rows={3}
            name="editor"
            placeholder="Enter Some Text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            >
            </Form.Control>
            <br />
            <Button variant='primary' onClick={SaveData}>
              create
            </Button>
            <Button variant='primary' onClick={EditData}>
              save
            </Button>
        </Form.Group>
        </Form>
        </div>
        </>
    )
}

export default Objects