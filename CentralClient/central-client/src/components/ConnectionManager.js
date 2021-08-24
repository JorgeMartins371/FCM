import React, { useState, useContext, useEffect  } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import { useHistory } from "react-router-dom";
import GlobalState from '../utils/GlobalState';
import StoreCon from './StoreCon';
import RemoveConnection from './RemoveConnection';
import CurrentConnections from './CurrentConnections';

const ConnectionManager = () => {

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
        },[]
    )

    let i=0

    const handleSubmit = async e => {
        e.preventDefault()

        

        //Adicionar Forma de conectar a outras plataformas

        // const url = 'http://' + ip + '/zabbix/api_jsonrpc.php'

        // let payload = {
        //     url,
        //     user,
        //     pass
        // }
        // let options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        // }

        // fetchData('http://localhost:8080/zabbixCon',options)
        // .then(res => {
        //     console.log(res)

        //     setState(state => ({...state, Con: res.data.ConnectionId}));
        //     console.log(state.Con)

        //      history.push({
        //          pathname:'/events',
        //          state:{
        //              id:res.data.ConnectionId
        //           }
        //         });
        // })
    }

    if(localStorage.getItem('isAdmin')){
        return(
            <Container>
            <div className="card">
            <div className="card-body">
                
                <div className="row">
                    
                    <div className="col-md-12">
                        <h2 class="py-3 text-center font-bold font-up blue-text">Connections</h2>
                    </div>
                    
                </div>
                
                <table className="table table-hover table-responsive mb-0">
                    
                    <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th className="th-lg"><a>User</a></th>
                            <th className="th-lg"><a>Admin</a></th>
                            <th className="th-lg"><a>Add Connection</a></th>
                            <th className="th-lg"><a>Delete Connection</a></th>
                            <th className="th-lg"><a>Configured Connections</a></th>
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
                                    <StoreCon/>
                                </td>
                                <td>
                                    <RemoveConnection/>
                                </td>
                                <td>
                                    <CurrentConnections/>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                    {/* <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>Larry</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Paul</td>
                            <td>Topolski</td>
                            <td>@P_Topolski</td>
                            <td>Paul</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>Larry</td>
                        </tr>
                    </tbody> */}
                    
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
        </Container>
        )
        // return (
        //     <Container>
        //         <h3>Dashboard</h3>
        //         <Form onSubmit={handleSubmit}>
        //             <Form.Group className="mb-3" controlId="formIP">
        //                 <Form.Label>Insert IP</Form.Label>
        //                 <Form.Control type="text" placeholder="Enter IP" onChange={e => setIP(e.target.value)}/>
        //                 <Form.Text className="text-muted">
        //                 Insert server's IP (Example: 195.22.17.158).
        //                 </Form.Text>
        //             </Form.Group>
    
        //             <Form.Group as={Col}>
        //                     <Form.Label column sm="2">
        //                         Server Username
        //                     </Form.Label>
        //                     <Col sm="10">
        //                         <Form.Control required name="username"  type= "text" placeholder="username" onChange={e => setUser(e.target.value)}/>                        
        //                     </Col>
        //                 </Form.Group>
        //                 <Form.Group as={Col}>
        //                     <Form.Label column sm="2">
        //                         Server Password
        //                     </Form.Label>
        //                     <Col sm="10">
        //                         <Form.Control required name="password"  type= "password" placeholder="password" onChange={e => setPass(e.target.value)}/>                        
        //                     </Col>
        //                 </Form.Group>
    
        //             <Button variant="primary" type="submit">
        //                 Submit
        //             </Button>
        //         </Form>
        //     </Container>
        // )
    }

    else{
        return(
            <h1>Uhhhhhhhhhhhhh.... You shouldn't be here mate 🤨</h1>
        )
    }

    
}

export default ConnectionManager
