import { useEffect , useState, useContext } from 'react'
import { ListGroup, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Acknowledge from './Acknowledge.js'
import MaintenanceIcon from './MaintenanceIcon.js'
import { fetchData } from '../utils/Fetcher';
import GlobalState from '../utils/GlobalState';

/*0 - not classified;
1 - information;
2 - warning;
3 - average;
4 - high;
5 - disaster.*/

const Event = ({event}) => {

    const name = "null"
    const maintenance_status = "0"
    let dummy = {
        name,
        maintenance_status
    }

    const[host, setHost] = useState(JSON.stringify(dummy));
    const [state, setState] = useContext(GlobalState);

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        fetchData('http://localhost:8080/'+ state.Con + '/host/'+event.objectid,options)
        .then(res => {
            console.log(res)
            setHost(res.data.result[0])
            console.log(host)
        })
    }, [])

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

    var sevColor = getSevColor(event.severity)
    var ackColor = event.acknowledged !== "0" ? 'success' : 'danger'
    var date = new Date(event.clock*1000)
 
    return (
        <ListGroup.Item key={event.eventid}>    
            <Row>
                <Col>Event ID: {event.eventid}</Col>
                <Col>{host.name}{host.maintenance_status === "1" ? <MaintenanceIcon/> : <></>}</Col>
                <Col md={7}>{event.name}</Col>
                <Col>Date : {date.toLocaleDateString()}</Col>
                <Col style={{backgroundColor : sevColor[1]}} md={1} align="center">{sevColor[0]}</Col>
                <Col>
                    <DropdownButton id={event.eventid + 'Ack'}  title= "Ack" variant={ackColor}>
                        <Dropdown.Item><Link to={{   pathname: "/ack/"+event.eventid,   state: event.acknowledges  }}>Go to AckInfo</Link></Dropdown.Item>
                        <Acknowledge eventids={event.eventid}/>
                    </DropdownButton>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default Event
