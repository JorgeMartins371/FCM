import React, { useState, useContext, useEffect  } from 'react'
import { Row, Col, Button, Container, Modal } from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import { useHistory } from "react-router-dom";
import GlobalState from '../../utils/GlobalState';
import StoreCon from './StoreCon';
import StoredConnections from '../StoredConnections';
import ConfigureConnections from './ConfigureConnections';
import DeleteConnection from './DeleteConnection';

const ConnectionManager = () => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const [users, setUsers] = useState([])
    const [connections, setConnections] = useState([])

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
        },[]
    )

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
                    
                    <div className="d-flex justify-content-center">
                    
                        <nav className="my-4 pt-2">
                            <ul className="pagination pagination-circle pg-blue mb-0">
                                
                                <li className="page-item disabled clearfix d-none d-md-block"><a className="page-link">First</a></li>
                                
                                <li className="page-item disabled">
                                    <a className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                </li>
                                
                                <li className="page-item active"><a className="page-link">1</a></li>
                                <li className="page-item"><a className="page-link">2</a></li>
                                <li className="page-item"><a className="page-link">3</a></li>
                                <li className="page-item"><a className="page-link">4</a></li>
                                <li className="page-item"><a className="page-link">5</a></li>
                                
                                <li className="page-item">
                                    <a className="page-link" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                </li>
                                
                                <li className="page-item clearfix d-none d-md-block"><a className="page-link">Last</a></li>
                            </ul>
                        </nav>
                        
                    </div>
                    
                </div>   
                </div>
                    <div>
                    <Button variant="primary" onClick={handleShow}>
                        Show All Connections
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>System Available Connections</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StoredConnections 
                            connections={connections}
                            title={'Connections'}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                    <StoreCon/>
                    <DeleteConnection connections={connections}/> 
            </div>
        </Container>
        )
    }

    else{
        return(
            <h1>Uhhhhhhhhhhhhh.... You shouldn't be here mate 🤨</h1>
        )
    }

    
}

export default ConnectionManager
