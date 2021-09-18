import { useState, useContext } from 'react'
import {Button, Modal, Form, Container} from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';
import { dangerMessage } from '../../utils/AlertMessages';

const StoreCon = () => {

    const [show, setShow] = useState(false)
    const [Tool, setTool] = useState('')
    const [info, setInfo] = useState([])
    const [state, setState] = useContext(GlobalState);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = e => {

        e.preventDefault()

        const ID =info[0];
        const IP = info[1];
        const User = info[2];
        const Password = info[3];

        let payload = {
            ID,
            IP,
            User,
            Password,
            Tool
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

         const resp = fetchData('http://localhost:8080/storedCon',options)
          .then(res => {
            if(res.err == true){
                console.log(res)
                setState(state => ({...state, Message: dangerMessage("Error: Connection ID already Exists!")}));
                setState(state => ({...state, Status: res}));
               }
            else{
                setState(state => ({...state, Update: res}));
            }
          })
         handleClose()
    }

    const handleOnChange = (e) => {
        let aux = [...info]
        aux[e.target.id] = e.target.value
        setInfo(aux)
    }

    const handleTool = (e) => {
        setTool(e.target.id)
    }

    return (
        <Container>
            <Button variant="success" onClick={handleShow}>
                Register New Connection
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Register New Connection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="0">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter ID" onChange={handleOnChange} />
                            <Form.Text className="text-muted">
                            Give the Server an ID here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="1">
                            <Form.Label>IP</Form.Label>
                            <Form.Control type="text" placeholder="Enter IP" onChange={handleOnChange} />
                            <Form.Text className="text-muted">
                            Type Server's IP here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="2">
                            <Form.Label>Server Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={handleOnChange} />
                            <Form.Text className="text-muted">
                            Type Server's username here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="3">
                            <Form.Label>Server Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter password" onChange={handleOnChange} />
                            <Form.Text className="text-muted">
                            Type Server's password here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="4">
                            <Form.Label as="legend" row sm={2}>
                                Select Monitoring tool
                            </Form.Label>
                            <Form.Check
                                inline
                                label="Zabbix"
                                name="Zabbix"
                                type='radio'
                                id='Zabbix'
                                onChange={handleTool}
                            />
                            <Form.Check
                                inline
                                label="Nagios"
                                name="Nagios"
                                type='radio'
                                id='Nagios'
                                onChange={handleTool}
                            />
                            <Form.Check
                                inline
                                label="Nimsoft"
                                label="Nimsoft"
                                type='radio'
                                id='Nimsoft'
                                onChange={handleTool}
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

export default StoreCon
