import React from 'react'
import { ListGroup, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

/*0 - not classified;
1 - information;
2 - warning;
3 - average;
4 - high;
5 - disaster.*/

const Events = (events) => {    

    const getSevColor = (sev) => {
        switch(sev){
            case '0': return ['Not Classified', 'gray'];
            case '1': return ['Information','white'];
            case '2': return ['Warning','yellow'];
            case '3': return ['Average','orange'];
            case '4': return ['High','red'];
            case '5': return ['Disaster','darkred'];
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
                            <Col xs={9}>{event.name}</Col>
                            <Col style={{backgroundColor : sevColor[1]}} xs={1}>{sevColor[0]}</Col>
                            <Col>
                                <DropdownButton id={event.eventid + 'Ack'}  title= "Ack" variant={ackColor}>
                                    <Dropdown.Item><Link to={{   pathname: "/ack/1",   state: event.acknowledges  }}>Go to AckInfo</Link></Dropdown.Item>
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
