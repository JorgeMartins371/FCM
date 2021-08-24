import React, { useState, useContext } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { fetchData } from '../utils/Fetcher';
import { useHistory, Link } from "react-router-dom";
import GlobalState from '../utils/GlobalState';

const Login = () => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const [state, setState] = useContext(GlobalState);

    let history = useHistory();
    
    const handleSubmit = async e => {
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
            //Needs to be reworked
            setState(state => ({...state, isLog: true}));
            localStorage.setItem('user', res.data.User)
            if(res.data.Admin){
                localStorage.setItem('isAdmin', res.data.Admin)
                setState(state => ({...state, isAdmin: res.data.Admin}));
            }
             history.push({
                  pathname:'/events',
                  state:{
                      isLog: true,
                      isAdmin: res.data.Admin
                   }
                 });
        })
    }

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
            </Container>
    )
    
}

export default Login

