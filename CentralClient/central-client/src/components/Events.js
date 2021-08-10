import React from 'react'
import { ListGroup, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Events = (events) => {    
    const getSevColor = (sev) => {
        switch(sev){
            case '0': return 'gray';
            case '1': return 'white';
            case '2': return 'yellow';
            case '3': return 'orange';
            case '4': return 'red' ;
            case '5': return 'darkred' 
        }
    }

    return (
        <ListGroup>
                {events.events.map(event => {
                    var sevColor = getSevColor(event.severity)
                    var ackColor = event.acknowledged !== "0" ? 'success' : 'danger'
                    return(
                    <ListGroup.Item key={event.eventid}>
                        <Row>
                            <Col>Event ID: {event.eventid}</Col>
                            <Col style={{backgroundColor : sevColor}} xs={9}>{event.name}</Col>
                            <Col>
                                <DropdownButton id={event.eventid + 'Ack'}  title= "Ack" variant={ackColor}>
                                    <Dropdown.Item><Link to='/ack/1'>Go to AckInfo</Link></Dropdown.Item>
                                    <Dropdown.Item>Ack</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    )
                })}
            </ListGroup>
    )
}

export default Events
