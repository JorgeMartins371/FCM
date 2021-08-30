import { useEffect , useState, useContext  } from 'react'
import {Container} from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import Event from './Event'
import GlobalState from '../utils/GlobalState';

const InfoBox = () => {

    const [events, setEvents] = useState()
    const [state, setState] = useContext(GlobalState);
    const [conIds, setConIds] = useState([])

    let load = true;

    //  useEffect(() => {
    //      console.log('Clean')
    //      setConIds([])
    //      setEvents()
    // }, [state.User])

    useEffect(() => {
        setTimeout(() => {
            getEvents()
        },1000)
    },[])

    //Timeout de 1ms suficiente para dar load?
    useEffect(() => {
        console.log('getEvents!')
        console.log(state.Filter)
        console.log(state.Ack)
        setTimeout(() => {
            getEvents()
        },1)
    }, [state.Ack, state.Filter])


    function getEvents() {
        console.log('actually running get events')
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization',
        })
        let options = { headers }

        console.log(state.user)

        fetchData('http://localhost:8080/connections/'+localStorage.getItem('user'), options)
            .then(res => {
                console.log(res)
                setConIds(res.data.Connections)

                res.data.Connections.map(con => {
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
                        fetchData('http://localhost:8080/'+con.id+'/event',options)
                        .then(res => {
                            console.log(res.data.result)
                            setEvents(res.data.result) //provavelmente tera de ser filtrado e extender array
                            console.log(events)
                        })
                    })
            })
    }
    
    // const getEvents = () => {

    //     const severities = state.FilterSev
    //     const acknowledged = state.FilterAck

    //     let payload = {
    //         severities,
    //         acknowledged
    //     }
    //     let options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload)
    //     }

    //     console.log('Cons' + conIds)

    //     conIds.map(con => {
    //         console.log('COOOOOOOOOOOOOOONNNNN')
    //         fetchData('http://localhost:8080/'+con.id+'/event',options)
    //         .then(res => {
    //             console.log(res.data.result)
    //             setEvents(res.data.result) //provavelmente tera de ser filtrado e extender array
    //             console.log(events)
    //         })
    //     })
    // }

    return (
        <Container>
            <div className="row justify-content-md-center">
                {events !== undefined ? 
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
                        {events.map(event => {
                            return(
                                <Event conIds={conIds} event={event}/>
                            )
                        })}
                    </tbody>

                </table> : 
                <Container>
                    <h4>No events to show...</h4>
                </Container>
                }
            </div>
        </Container>
    )
}

export default InfoBox
