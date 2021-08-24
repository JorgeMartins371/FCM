import React from 'react'
import { useState, useContext } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import GlobalState from '../utils/GlobalState';

const RegisterUser = () => {

    const [show, setShow] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [info, setInfo] = useState([])
    const [state, setState] = useContext(GlobalState);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {

        e.preventDefault()

        const username = info[0];
        const password = info[1];

        let payload = {
            username,
            password,
            admin,
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const resp = fetchData('http://localhost:8080/register',options)
           .then(res => {
              console.log(res)
              setState(state => ({...state, User: res}));
           })
        handleClose()
    }

    const handleOnChange = (e) => {
        let aux = [...info]
        aux[e.target.id] = e.target.value
        setInfo(aux)
    }

    const handleAdminOption = () => [
        setAdmin(!admin)
    ]

    return (
        <Container>
        <Button variant="primary" onClick={handleShow}>
            Register user
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Register user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="0">
                        <Form.Label>Platform Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type User's platform username here
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="1">
                        <Form.Label>Platform Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter password" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type User's Platform password here
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Admin">
                        <Form.Label as="legend" row sm={2}>
                            Make user Admin?
                        </Form.Label>
                        <Form.Check
                            label="Admin"
                            name="Admin"
                            type='radio'
                            id='Admin'
                            onChange={handleAdminOption}
                        />
                    </Form.Group>
                </Form>
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

export default RegisterUser
