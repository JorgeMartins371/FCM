import { useState, useContext, useEffect } from 'react'
import { Container, Form, Col, Row, DropdownButton, Button } from 'react-bootstrap'
import GlobalState from '../utils/GlobalState';

const EventFilter = () => {

    const [state, setState] = useContext(GlobalState);

    let auxSev = [], auxAck = [false,false]

    //Provavelmente chamar useEffect para dar reset nos botoes
    //Ter const faz com que tudo corra
    const handleSubmit = e => {
        e.preventDefault()

        setState(state => ({...state, FilterSev: auxSev}));
        setState(state => ({...state, FilterAck: auxAck}));
        if(state.Filter === undefined) setState(state => ({...state, Filter: true}));
        else setState(state => ({...state, Filter: !state.Filter}));
    }

    const handleSevChange = (e) => {
        var index = auxSev.indexOf(e.target.id);
        if(index > -1){
            auxSev.splice(index, 1);
        }
        else{
            auxSev = [...auxSev,e.target.id]
        }
    }

    const handleAckChange = (e) => {
        const index = parseInt(e.target.id)
        auxAck[index] = !auxAck[index]
        console.log(auxAck)
    }

    return (
        <Container>
            <h4>Filter Events:</h4>
             <Form>
                <Row>
                    <DropdownButton id="SevFilter" title="Severity">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Severity
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                type="checkbox"
                                label="Not classified"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="0"
                                />
                                <Form.Check
                                type="checkbox"
                                label="Information"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="1"
                                />
                                <Form.Check
                                type="checkbox"
                                label="Warning"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="2"
                                />
                                <Form.Check
                                type="checkbox"
                                label="Average"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="3"
                                />
                                <Form.Check
                                type="checkbox"
                                label="High"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="4"
                                />
                                <Form.Check
                                type="checkbox"
                                label="Disaster"
                                name="checkbox"
                                onChange={handleSevChange}
                                id="5"
                                />
                            </Col>
                            </Form.Group>
                    </DropdownButton>
                    <DropdownButton id="AckFilter" title="Acknowledges">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Ack
                            </Form.Label>
                            <Col sm={10}>
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
                            </Col>
                        </Form.Group>
                    </DropdownButton>
                </Row>
                <Button as={Row} variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default EventFilter
