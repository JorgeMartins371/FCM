import React, { useState, useContext, useEffect  } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';
import StoreCon from './StoreCon';
import StoredConnections from '../StoredConnections';
import ConfigureConnections from './ConfigureConnections';

const ConnectionManager = () => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const [users, setUsers] = useState([])
    const [connections, setConnections] = useState([])

    //Get users and system connections
    useEffect(() => {
            let headers = new Headers({
                Accept: 'application/json',
                'Access-Control-Allow-Headers': 'Authorization',
            })
            let options = { headers }
            const u = fetchData('http://localhost:8080/users', options)
                .then(res => {
                    setUsers(res.data.Users)
                    console.log(res)
            })

            const c = fetchData('http://localhost:8080/storedCon', options)
                .then(res => {
                    setConnections(res.data.Connections)
                    console.log(res)
            })
        },[state.Update]
    )

    //Consume Message
    useEffect(() => {
        setTimeout(() => {
            setState(state => ({...state, Message: undefined}));
        },4000)
    }, [state.Status])

    let i=0

    if(localStorage.getItem('isAdmin')){
        return(
            <Container>
                <div className="row justify-content-md-center">
                <div className="card">
                <div className="card-body">
                    
                    <div className="row">
                        
                        <div className="col-md-12">
                            <h2 class="py-3 text-center font-bold font-up blue-text">Manage Users Connections</h2>
                        </div>
                        
                    </div>
                    
                    <table className="table table-hover table-responsive mb-0">
                        
                        <thead>
                            <tr>
                                <th scope="row">#</th>
                                <th className="th-lg"><a>User</a></th>
                                <th className="th-lg"><a>Admin</a></th>
                                <th className="th-lg"><a>Configure Connections</a></th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => {
                                i++
                                return(
                                    <tr>
                                    <th scope="row">{i}</th>
                                    <td>{user.name}</td>
                                    <td>{user.admin ? "yes" : "no"}</td>
                                    <td>
                                        <ConfigureConnections connections={connections} user={user}/>
                                    </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        
                    </table>
                </div>   
                </div>             
                </div>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Manage Connections
                    </Button>
                    <Modal show={show} onHide={handleClose} size="xl">
                        <Modal.Header closeButton>
                        <Modal.Title>System Available Connections</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StoredConnections 
                            connections={connections}
                            title={'Connections'}
                            remove={true}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <StoreCon/>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                        <h5>{state.Message}</h5>
                    </Modal>
                    </div>
        </Container>
        )
    }

    else{
        return(
            <h1>User isnt admin.</h1>
        )
    }

    
}

export default ConnectionManager
