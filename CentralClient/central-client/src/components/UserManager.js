import React, { useState, useContext, useEffect  } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import { useHistory } from "react-router-dom";
import GlobalState from '../utils/GlobalState';
import RegisterUser from './RegisterUser';
import RemoveConnection from './RemoveConnection';
import CurrentConnections from './CurrentConnections';
import DeleteUser from './DeleteUser';

const UserManager = () => {

    const [state, setState] = useContext(GlobalState);
    // const [ip, setIP] = useState();
    // const [user, setUser] = useState();
    // const [pass, setPass] = useState();
    const [users, setUsers] = useState([])

    useEffect(() => {
            let headers = new Headers({
                Accept: 'application/json',
                'Access-Control-Allow-Headers': 'Authorization',
            })
            let options = { headers }
            const a = fetchData('http://localhost:8080/users', options)
                .then(res => {
                    setUsers(res.data.Users)
                    console.log(res)
            })
        },[state.User]
    )

    let i=0

    const handleSubmit = async e => {
        e.preventDefault()

    }

    if(localStorage.getItem('isAdmin')){
        return(
            <Container>
            <div className="card">
            <div className="card-body">
                
                <div className="row">
                    
                    <div className="col-md-12">
                        <h2 class="py-3 text-center font-bold font-up blue-text">Users</h2>
                    </div>
                    
                </div>
                
                <table className="table table-hover table-responsive mb-0">
                    
                    <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th className="th-lg"><a>User</a></th>
                            <th className="th-lg"><a>Admin</a></th>
                            <th className="th-lg"><a>Remove User</a></th>
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
                                    <DeleteUser username={user.name}/>
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
        <RegisterUser/>
        </Container>
        )
    }

    else{
        return(
            <h1>Uhhhhhhhhhhhhh.... You shouldn't be here mate 🤨</h1>
        )
    }

    
}

export default UserManager