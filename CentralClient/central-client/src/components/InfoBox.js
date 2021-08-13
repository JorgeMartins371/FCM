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
            <Container>
                <ListGroup>
                    {events.map(event => {
                        return(
                            <Event event={event}/>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }

    return(
        <Container/>
    )

    
}

export default InfoBox
