import { useEffect , useState } from 'react'
import {Container, ListGroup} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'

const InfoBox = () => {

    const[events, setEvents] = useState()

    // const getEvents = async () => {
    //     let headers = new Headers({
    //         Accept: 'application/json',
    //         'Access-Control-Allow-Headers': 'Authorization'
    //     })
    //     let options = { headers }
    //     fetchData('http://localhost:8080/1/event',options) //Eventualmente meter dinamicamente numero da instancia
    //     .then(res => {
    //         console.log(res)
    //         setEvents(res.data.result)
    //         console.log(events)
    //     })
    // }

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
    

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        fetchData('http://localhost:8080/1/event',options) //Eventualmente meter dinamicamente numero da instancia
        .then(res => {
            setEvents(res.data.result)
        })
    }, [])

    if(events !== undefined){
        console.log(events)
        return (
            <div>
                <ListGroup>
                    {events.map(event => {
                        return(
                            <Event event={event}/>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }

    return(
        <Container/>
    )

    
}

export default InfoBox
