import { useState, useContext, useEffect } from 'react'
import { Container, Form, Col, Row, DropdownButton, Button } from 'react-bootstrap'
import GlobalState from '../utils/GlobalState';

const EventFilter = () => {

    const [state, setState] = useContext(GlobalState);
    const [sevs, setSevs] = useState([])
    const [acks, setAcks] = useState([false,false])

    //  useEffect(() => {
    //      if(first){
    //         setState(state => ({...state, FilterSev: sevs}));
    //         setState(state => ({...state, FilterAck: acks}));
    //      }
    //     first=false
    //  }, )

    //Provavelmente chamar useEffect para dar reset nos botoes
    //Ter const faz com que tudo corra
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

    return (
        <Container>
            <h4>Filter Events:</h4>
             <Form>
                <Row>
                <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
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
                            <Form.Label as="legend" column sm={2}>
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
                </Row>
                <Button as={Row} variant="primary" type="submit" onClick={handleSubmit}>
                    Apply Filters
                </Button>
            </Form>
        </Container>
    )
}

export default EventFilter
