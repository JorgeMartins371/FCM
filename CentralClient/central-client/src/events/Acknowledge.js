import { useState, useContext } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import GlobalState from '../utils/GlobalState';

const Acknowledge = ({conId,eid}) => {

    console.log('ConId is: ' + conId)
    console.log('Eid is: ' + eid)
    const [show, setShow] = useState(false)
    const [severity, setSev] = useState(9)
    const [ack, setAck] = useState(false)
    const [close, setClose] = useState(false)
    const [msg, setMsg] = useState('')

    const [state, setState] = useContext(GlobalState);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async e => {

        e.preventDefault()

        const eventids = eid;

        const message = "Acknowledged by User " + localStorage.getItem('user') + ": \n" + msg

        let payload = {
            eventids,
            ack,
            close,
            message,
            severity
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        console.log(conId)
        const resp = fetchData('http://localhost:8080/'+ conId +'/event/ack',options)
         .then(res => {
            setState(state => ({...state, Ack: res}));
         })
        handleClose()
    }

    const handleSevChange = (e) => {
        setSev(e.target.id)
    }

    const handleAck = () => {
        setAck(!ack)
    }

    const handleCloseOption = () => [
        setClose(!close)
    ]

    const handleOnChange = (e) => {
        setMsg(e.target.value)
    }

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
                Acknowledge event
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Acknowledge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Acknowledge" onChange={handleAck}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Close Event" onChange={handleCloseOption}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="email" placeholder="Enter message" onChange={handleOnChange} />
                        <Form.Text className="text-muted">
                        Type a message here.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Change Severity
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                            type="radio"
                            label="Not classified"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="0"
                            />
                            <Form.Check
                            type="radio"
                            label="Information"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="1"
                            />
                            <Form.Check
                            type="radio"
                            label="Warning"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="2"
                            />
                            <Form.Check
                            type="radio"
                            label="Average"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="3"
                            />
                            <Form.Check
                            type="radio"
                            label="High"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="4"
                            />
                            <Form.Check
                            type="radio"
                            label="Disaster"
                            name="formHorizontalRadios"
                            onChange={handleSevChange}
                            id="5"
                            />
                        </Col>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Acknowledge
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Acknowledge
