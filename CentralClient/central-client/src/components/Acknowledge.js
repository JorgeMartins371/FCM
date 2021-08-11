import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Col, Row, DropdownButton, Dropdown, Container} from 'react-bootstrap'

const Acknowledge = (acknowledges) => {
    console.log(acknowledges.location.state)
    return (
        <Container>
            <ListGroup>
                {acknowledges.location.state.map(ack => {
                    return(
                        <ListGroup.Item key={ack.acknowledgeid}>
                            <Row>
                                <Col>Acknowledged by User: {ack.alias}</Col>
                                <Col>{ack.message}</Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <Link to='/'> Go Back</Link>
        </Container>
    )
}

export default Acknowledge
