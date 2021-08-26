import { useState, useEffect } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import StoredConnections from '../StoredConnections'
import RemoveConnection from '../users/RemoveConnection';
import AddConnectionUser from '../users/AddConnectionUser';
import { fetchData } from '../../utils/Fetcher';

const ConfigureConnections = ({connections,user}) => {

    const [show, setShow] = useState(false)
    const [usersCon, setUsersCon] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization',
        })
        let options = { headers }
        const a = fetchData('http://localhost:8080/connections/'+user.name, options)
            .then(res => {
                setUsersCon(res.data.Connections)
                console.log(res)
        })
    },[]
)

    return (
        <Container>
            <Button variant="secondary" onClick={handleShow}>
                Configure
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{user.name} Connections Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StoredConnections 
                    connections={usersCon}
                    title={user.name+' Available Connections'}/>
                </Modal.Body>
                <Modal.Footer>
                <AddConnectionUser allCons={connections} userCons={usersCon} user={user}/>
                <RemoveConnection allCons={connections} userCons={usersCon} user={user}/>
                </Modal.Footer>
            </Modal>
            
        </Container>
    )
}

export default ConfigureConnections