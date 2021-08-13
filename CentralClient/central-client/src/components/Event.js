import React from 'react'
import { ListGroup, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Acknowledge from './Acknowledge.js'
import { FiTool } from "react-icons/fi";
import { fetchData } from '../utils/Fetcher';

/*0 - not classified;
1 - information;
2 - warning;
3 - average;
4 - high;
5 - disaster.*/

const Event = ({event}) => {

    /*const [triggerIds, setTrigIds] = useState();
    const [hostIds, setHostIds] = useState();

    const triggerReq = async (objids) => {

        let payload = {
            objids
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetchData('http://localhost:8080/1/trigger',options)
        .then(res => {
            const aux = []
            res.data.result.map(trigger => {
                aux.push(trigger.triggerid)
            })
            setTrigIds(aux)
        })
    }

    const getHostIds = () => {

        var objids = new Array(events.events.length - 1)

        for (var i = 0; i < event.events.length - 1; i++) {
            objids[i] = events.events[i].objectid
        }

        triggerReq(objids)

        let payload = {
            triggerIds
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetchData('http://localhost:8080/1/host',options)
        .then(res => {
            console.log(res)
            // const aux = []
            // res.data.result.map(trigger => {
            //     aux.push(trigger.triggerid)
            // })
            // setTrigIds(aux)
        })
    }*/

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
 
    return (
        <ListGroup.Item key={event.eventid}>
            <Row>
                <Col>Event ID: {event.eventid}</Col>
                <Col>Object ID: {event.objectid}</Col>
                {event.suppressed === "1" ? <FiTool style={{color : 'orange'}}/> : <Col/>}
                <Col xs={9}>{event.name}</Col>
                <Col style={{backgroundColor : sevColor[1]}} xs={1}>{sevColor[0]}</Col>
                <Col>
                    <DropdownButton id={event.eventid + 'Ack'}  title= "Ack" variant={ackColor}>
                        <Dropdown.Item><Link to={{   pathname: "/ack/"+event.eventid,   state: event.acknowledges  }}>Go to AckInfo</Link></Dropdown.Item>
                        <Acknowledge/>
                    </DropdownButton>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default Event
