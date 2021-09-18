import React from 'react'
import { useState, useContext } from 'react'
import {Button, Modal, Container} from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';
import { dangerMessage } from '../../utils/AlertMessages';

const DeleteUser = ({username}) => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {

        e.preventDefault()

        const admin = localStorage.getItem('user')

        let payload = {
            username,
            admin
        }
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const resp = fetchData('http://localhost:8080/users',options)
        .then(res => {
            if(res.err == true){
                console.log(res)
                setState(state => ({...state, Message: dangerMessage("Error: Cant remove yourself from platform!")}));
                setState(state => ({...state, Status: res}));
               }
                else{
                    console.log(res)
                    setState(state => ({...state, User: res}));
                }
        })
        handleClose()
    }

    return (
        <Container>
        <Button variant="danger" onClick={handleShow}>
            Remove
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure want to remove user {username}?</h4>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    </Container>
    )
}

export default DeleteUser