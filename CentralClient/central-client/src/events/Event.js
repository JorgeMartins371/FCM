import { useEffect , useState, useContext } from 'react'
import { DropdownButton, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Acknowledge from './Acknowledge.js'
import MaintenanceIcon from './MaintenanceIcon.js'
import { fetchData } from '../utils/Fetcher';
import GlobalState from '../utils/GlobalState';
import EventInfo from './EventInfo.js'

const Event = ({conId,event}) => {

    const name = "null"
    const maintenance_status = "0"
    let dummy = {
        name,
        maintenance_status
    }

    const [host, setHost] = useState(JSON.stringify(dummy));
    const [state, setState] = useContext(GlobalState);

    useEffect(() => {
        getHosts()
    }, [])

    useEffect(() => {
        getHosts()
    }, [state.Filter,state.Ack,state.Toggle])


    function getHosts() {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        fetchData('http://localhost:8080/'+conId+'/host/'+event.objectid,options)
        .then(res => {
            //console.log(res) 
            setHost(res.data.result[0])
            //console.log(host)
        })
    }

    //Sev[0] = Severity name Sev[1]= Severity Color
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

    //Ack[0] = Title Ack[1] = Button Variant
    const getAckInfo = (ack) => {
        if(ack === "0") return ['No','danger']
        else return ['Yes', 'success']
    }

    var sevColor = getSevColor(event.severity)
    var ackInfo = getAckInfo(event.acknowledged)
    var date = new Date(event.clock*1000)
 
    if(state.FilterAck !== undefined){
        if(state.FilterAck[1] && event.acknowledged === "1" && !state.FilterAck[0]){
            return(
                <>
                </>
            )
        }
    }
        
    return (
            <tr>
                <th>{conId}</th>
                <td>{host.name}{host.maintenance_status === "1" ? <MaintenanceIcon/> : <></>}</td>
                <td>{event.name}</td>
                <td><EventInfo conId={conId} event={event}/></td>
                <td>{getDateFormat(date)}</td>
                <td style={{backgroundColor : sevColor[1]}} align="center">{sevColor[0]}</td>
                <td>
                    <DropdownButton id={event.eventid + 'Ack'}  title= {ackInfo[0]} variant={ackInfo[1]}>
                        <Dropdown.Item><Link to={{   pathname: "/ack/"+event.eventid,   state: event.acknowledges  }}>Go to AckInfo</Link></Dropdown.Item>
                        <Acknowledge conId={conId} eid={event.eventid}/>
                    </DropdownButton>
                </td>
            </tr>

        )
    }

function getDateFormat(date){ //Ver razao de necessitar mais duas horas
    return date.toLocaleDateString() + ' ' + (date.getHours()+2) + ':' +  date.getMinutes() + ':' + date.getSeconds()
}

export default Event
