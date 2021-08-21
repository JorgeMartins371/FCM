import React, { useState, useContext  } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import { useHistory } from "react-router-dom";
import GlobalState from '../utils/GlobalState';

const Dashboard = () => {

    const [state, setState] = useContext(GlobalState);
    const [ip, setIP] = useState();
    const [user, setUser] = useState();
    const [pass, setPass] = useState();

    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault()

        //Adicionar Forma de conectar a outras plataformas

        const url = 'http://' + ip + '/zabbix/api_jsonrpc.php'

        let payload = {
            url,
            user,
            pass
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetchData('http://localhost:8080/zabbixCon',options)
        .then(res => {
            console.log(res)

            setState(state => ({...state, Con: res.data.ConnectionId}));
            console.log(state.Con)

             history.push({
                 pathname:'/events',
                 state:{
                     id:res.data.ConnectionId
                  }
                });
        })
    }

    return (
        <Container>
            <h3>Dashboard</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formIP">
                    <Form.Label>Insert IP</Form.Label>
                    <Form.Control type="text" placeholder="Enter IP" onChange={e => setIP(e.target.value)}/>
                    <Form.Text className="text-muted">
                    Insert server's IP (Example: 195.22.17.158).
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col}>
                        <Form.Label column sm="2">
                            Server Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required name="username"  type= "text" placeholder="username" onChange={e => setUser(e.target.value)}/>                        
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label column sm="2">
                            Server Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required name="password"  type= "password" placeholder="password" onChange={e => setPass(e.target.value)}/>                        
                        </Col>
                    </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Dashboard
