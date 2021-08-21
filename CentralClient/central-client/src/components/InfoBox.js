import { useEffect , useState, useContext  } from 'react'
import {Container, ListGroup, Col, Row} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'
import GlobalState from '../utils/GlobalState';

const InfoBox = () => {

    const [events, setEvents] = useState()
    const [state, setState] = useContext(GlobalState);

    useEffect(() => {
        if(state.Filter == true){
            getEvents()
            setState(state => ({...state, Filter: false}));
        } 
    }, [state.Ack, state.Filter])

    function getEvents(){

        const severities = state.FilterSev
        const acknowledged = state.FilterAck

        let payload = {
            severities,
            acknowledged
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        console.log(options)

        const token = fetchData('http://localhost:8080/' + state.Con + '/event',options)
        .then(res => {
            setEvents(res.data.result)
        })
    }

    return (
        <div>
            {events !== undefined ? 
            <ListGroup>
                <Row>
                    <Col><h5>Provider</h5></Col>
                    <Col><h5>Host</h5></Col>
                    <Col md={8}><h5>Problem</h5></Col>
                    <Col md={2}><h5>Time</h5></Col>
                    <Col><h5>Severity</h5></Col>
                </Row>
                {events.map(event => {
                    return(
                        <Event key={event.eventid} event={event}/>
                    )
                })}
            </ListGroup> : 
            <Container>
                <h4>No events to show...</h4>
            </Container>
             }
        </div>
    )
}

export default InfoBox
