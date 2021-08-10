import { useEffect , useState } from 'react'
import {Container} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Events from './Events'

const InfoBox = () => {

    const[events, setEvents] = useState()
    

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        fetchData('http://localhost:8080/1/event',options) //Eventualmente meter dinamicamente numero da instancia
        .then(res => {
            console.log(res)
            setEvents(res.data.result)
            console.log(events)
        })
    }, [])

    if(events !== undefined){
        return (
            <Container>
                <Events events={events}/>
            </Container>
        )
    }

    return(
        <Container/>
    )

    
}

export default InfoBox
