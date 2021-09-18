import { useState, useContext, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import GlobalState from '../utils/GlobalState';

const EventFilter = () => {

    const [state, setState] = useContext(GlobalState);
    const [sevs, setSevs] = useState([])
    const [acks, setAcks] = useState([false,false])
    const [refresh, setRefresh] = useState(0)
    
    useEffect(() => {
        console.log('Refresh!')
        setState(state => ({...state, Refresh: refresh}));
        setState(state => ({...state, Toggle: !state.Toggle}));
    }, [refresh])

    const handleSubmit = e => {
        e.preventDefault()

        setState(state => ({...state, FilterSev: sevs}));
        setState(state => ({...state, FilterAck: acks}));
        if(state.Filter === undefined) setState(state => ({...state, Filter: true}));
        else setState(state => ({...state, Filter: !state.Filter}));
    }

    const handleSevChange = (e) => {
        var auxSevs = [...sevs]
        var index = auxSevs.indexOf(e.target.id);
        if(index > -1){
            auxSevs.splice(index, 1);
        }
        else{
            auxSevs = [...auxSevs,e.target.id]
        }
        setSevs(auxSevs)
    }

    const handleAckChange = (e) => {
        const auxAck = [...acks]
        const index = parseInt(e.target.id)
        auxAck[index] = !auxAck[index]
        setAcks(auxAck)

    }

    const handleRefreshChange = (e) => {
        setRefresh(e.target.value)
    }

    return (
        <Container>
            <h4>Filter Events:</h4>
             <Form>
                <Row>
                <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend">
                                Severity:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Not classified"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="0"
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Information"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="1"
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Warning"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="2"
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Average"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="3"
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="High"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="4"
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Disaster"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="5"
                                />
                            </Col>
                        
                            </Form.Group>
                    
                            <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend">
                                Ack:
                            </Form.Label>
                                <Form.Check
                                type="checkbox"
                                label="Acknowledged Events"
                                name="checkbox"
                                onChange={handleAckChange}
                                id='0'
                                />
                                <Form.Check
                                type="checkbox"
                                label="Not Acknowledged Events"
                                name="checkbox"
                                onChange={handleAckChange}
                                id='1'
                                />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label as="legend">
                                Refresh events:
                            </Form.Label>
                                <Form.Check
                                type="radio"
                                label="No Refresh"
                                name="0"
                                value={0}
                                onChange={handleRefreshChange}
                                id='0'
                                />
                                <Form.Check
                                type="radio"
                                label="5 seconds"
                                name="0"
                                value={5000}
                                onChange={handleRefreshChange}
                                id='0'
                                />
                                <Form.Check
                                type="radio"
                                label="30 seconds"
                                name="0"
                                value={30000}
                                onChange={handleRefreshChange}
                                id='0'
                                />
                                <Form.Check
                                type="radio"
                                label="1 minute"
                                name="0"
                                value={60000}
                                onChange={handleRefreshChange}
                                id='0'
                                />
                        </Form.Group>
                </Row>
                <Button as={Row} variant="primary" type="submit" onClick={handleSubmit}>
                    Apply Filters
                </Button>
            </Form>
        </Container>
    )
}

export default EventFilter
