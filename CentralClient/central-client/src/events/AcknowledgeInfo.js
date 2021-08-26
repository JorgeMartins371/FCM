import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Col, Row, Container} from 'react-bootstrap'

const AcknowledgeInfo = (acknowledges) => {
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
            <Link to='/events'> Go Back</Link>
        </Container>
    )
}

export default AcknowledgeInfo
