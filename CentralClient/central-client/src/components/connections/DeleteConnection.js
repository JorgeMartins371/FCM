import { useState, useContext } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';

const DeleteConnection = ({connection}) => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {

        e.preventDefault()

        const conID = connection.id

         let payload = {
             conID,
         }
         let options = {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(payload)
         }

         const resp = fetchData('http://localhost:8080/storedCon',options)
         .then(res => {
            setState(state => ({...state, Update: res}));
         })
         handleClose()
    }

    return (
        <Container>
        <Button variant="danger" onClick={handleShow}>
            Delete
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Connection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body>
                    <h4>Are you sure want to remove {connection.id} from system?</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    </Container>
    )
}

export default DeleteConnection
