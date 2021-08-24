import { useState, useContext } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'

const AddConnection = () => {

    const [show, setShow] = useState(false)
    const [close, setClose] = useState(false)
    const [info, setInfo] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {
        console.log(info)
    }

    const handleOnChange = (e) => {
        let aux = [...info]
        aux[e.target.id] = e.target.value
        setInfo(aux)
    }

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Connection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="0">
                        <Form.Label>IP</Form.Label>
                        <Form.Control type="text" placeholder="Enter IP" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type Server's IP here
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="1">
                        <Form.Label>Server Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type Server's username here
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="2">
                        <Form.Label>Server Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type Server's password here
                        </Form.Text>
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

export default AddConnection
