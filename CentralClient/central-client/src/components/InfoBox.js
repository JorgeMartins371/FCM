import { useEffect , useState, useContext  } from 'react'
import {Container, ListGroup} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'
import GlobalState from '../utils/GlobalState';

const InfoBox = () => {

    const[events, setEvents] = useState()
    const [state, setState] = useContext(GlobalState);

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        fetchData('http://localhost:8080/' + state.Con + '/event',options) 
        .then(res => {
            setEvents(res.data.result)
        })
    }, [])

    if(events !== undefined){
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
