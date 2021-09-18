import { useEffect , useState, useContext  } from 'react'
import {Container} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'
import GlobalState from '../utils/GlobalState';
import { dangerMessage } from '../utils/AlertMessages';

const InfoBox = () => {

    const [msg, setMsg] = useState()
    const [events,setEvents] = useState([])
    const [state, setState] = useContext(GlobalState);

    useEffect(() => {
        setTimeout(() => {
            getEvents()
        },1)      
    },[])

    useEffect(() => {
        console.log('Toggle!')
        console.log(state.Refresh)
        if(state.Refresh != 0){
            setTimeout(() => {
                getEvents()
                console.log('Refresh Events!')
                console.log("refresh is: " + state.Refresh)
                setState(state => ({...state, Toggle: !state.Toggle}));
            },state.Refresh)
        }
    }, [state.Toggle])
    
    useEffect(() => {
        getEvents()
    }, [state.Filter,state.Ack])


    function getEvents() {
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

        fetchData('http://localhost:8080/'+localStorage.getItem('user')+'/event', options)
            .then(res => {
                console.log(res)
                if(res.err == true){
                    setMsg(dangerMessage("One of your associated connections is badly setup, please contact a system admin."))
                }
                else{
                    var auxEvents = []
                    var auxInfo = []
                    res.data.Result.map(Con => {
                        console.log(Con)
                        auxInfo = [...auxInfo,Con]
                        Con.Events.result.map(event => {
                            auxEvents = [...auxEvents,<Event conId={Con.ConnectionID} event={event}/>]
                        })
                    })
                    setEvents(auxEvents)
                }
            })
    }

    return (
        <Container>
            <div className="row justify-content-md-center">
                {events.length !== 0 ? 
                <table className="table table-hover table-responsive mb-0">

                <thead>
                    <tr>
                        <th className="th-lg"><a>Provider</a></th>
                        <th className="th-lg"><a>Host</a></th>
                        <th className="th-lg"><a>Problem</a></th>
                        <th className="th-lg"><a>Info</a></th>
                        <th className="th-lg"><a>Time</a></th>
                        <th className="th-lg"><a>Severity</a></th>
                        <th className="th-lg"><a>Acknowledged</a></th>
                    </tr>
                </thead>

                    <tbody>
                        {events}
                    </tbody>

                </table> : 
                <Container>
                    <h4>No events to show...</h4>
                    <h5>{msg}</h5>
                </Container>
                }
            </div>
        </Container>
    )
}

export default InfoBox
