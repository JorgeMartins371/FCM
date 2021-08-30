import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher';
import { Redirect } from "react-router-dom";
import GlobalState from '../utils/GlobalState';
import { dangerMessage } from '../utils/AlertMessages';

const Login = () => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState()
    const [status, setStatus] = useState()

    const [state, setState] = useContext(GlobalState);

    //Consume Message
     useEffect(() => {
        setTimeout(() => {
            setMsg()
        },4000)
        console.log(msg)
     },[status])
    
    const handleSubmit = e => {
        e.preventDefault()

        let payload = {
            username,
            password
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetchData('http://localhost:8080/login',options)
        .then(res => {
            console.log(res)
            if(res.err == true){
                setMsg(dangerMessage("Wrong credentials, please make sure your Username and Password is correct."))
                setStatus(res)
            }
            else{
                setState(state => ({...state, isLog: true}))
                setState(state => ({...state, user: res.data.User}))
                localStorage.setItem('user', res.data.User)
                if(res.data.Admin){
                    localStorage.setItem('isAdmin', res.data.Admin)
                    setState(state => ({...state, isAdmin: res.data.Admin}));
                }
            }  
        })
    }

    if(state.isLog === undefined || state.isLog === false){
        return (
            <Container>
                    <Row>
                        <Col>
                            <h4>Please login.</h4>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Col}>
                            <Form.Label column sm="2">
                                Username
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required name="username"  type= "text" placeholder="username" onChange={e => setUserName(e.target.value)}/>                        
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required name="password"  type= "password" placeholder="password" onChange={e => setPassword(e.target.value)}/>                        
                            </Col>
                        </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                    <h5>{msg}</h5>
                </Container>
        )
    }
    else{
        return(
            <Redirect to='/events'/>
        )
    }
    
    
}

export default Login

