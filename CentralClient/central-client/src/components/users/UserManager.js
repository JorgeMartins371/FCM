import React, { useState, useContext, useEffect  } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import { useHistory } from "react-router-dom";
import GlobalState from '../../utils/GlobalState';
import RegisterUser from './RegisterUser';
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
                            <h2 class="py-3 text-center font-bold font-up blue-text">Manage Users</h2>
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
                    
                </div>
            </div>
            <RegisterUser/>
            <h5>{state.Message}</h5>
        </div>
        </Container>
        )
    }

    else{
        return(
            <h1>Restricted Path</h1>
        )
    }

    
}

export default UserManager