import { useState, useContext } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';

const DeleteConnection = ({connections}) => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {

        e.preventDefault()


        //  let payload = {
        //      username,
        //  }
        //  let options = {
        //      method: 'DELETE',
        //      headers: {
        //          'Content-Type': 'application/json'
        //      },
        //      body: JSON.stringify(payload)
        //  }

        //  const resp = fetchData('http://localhost:8080/users',options)
        //     .then(res => {
        //        console.log(res)
        //        setState(state => ({...state, User: res}));
        //     })
        // handleClose()
    }

    return (
        <Container>
        <Button variant="danger" onClick={handleShow}>
            Delete Connection
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Connection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group as={Col} className="mb-3" controlId="AddCon" Key="Add">
                    <Col sm={10}>
                    {connections.map(con => {
                        return(
                            <Form.Check 
                            type="radio" 
                            label={con.id}
                            name ="checkbox" 
                            id={con.id}/>
                        )
                    })}
                    </Col>
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

export default DeleteConnection
