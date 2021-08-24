import { useEffect , useState, useContext  } from 'react'
import {Container, ListGroup, Col, Row} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'
import GlobalState from '../utils/GlobalState';

const InfoBox = () => {

    const [events, setEvents] = useState()
    const [state, setState] = useContext(GlobalState);

    let firstLoad = true;

    useEffect(() => {
        if(state.Filter == true){
            getEvents()
            setState(state => ({...state, Filter: false}));
        }
        if(firstLoad){
             getEvents()
             firstLoad=false;
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

        const token = fetchData('http://localhost:8080/Zabbix1/event',options)
        .then(res => {
            setEvents(res.data.result)
        })
    }

    return (
        <Container fluid>
            {events !== undefined ? 
            <table className="table table-hover table-responsive mb-0">

            <thead>
                <tr>
                    <th className="th-lg"><a>Provider</a></th>
                    <th className="th-lg"><a>Host</a></th>
                    <th className="th-lg"><a>Problem</a></th>
                    <th className="th-lg"><a>Time</a></th>
                    <th className="th-lg"><a>Severity</a></th>
                    <th className="th-lg"><a>Acknowledged</a></th>
                </tr>
            </thead>

                <tbody>
                    {events.map(event => {
                        return(
                            <Event key={event.eventid} event={event}/>
                        )
                    })}
                </tbody>

            </table> : 
            <Container>
                <h4>No events to show...</h4>
            </Container>
             }
        </Container>
    )
}

export default InfoBox
