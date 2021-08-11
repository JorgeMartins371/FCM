import React, { useState } from 'react'
import { Container, Form, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { fetchData } from '../utils/Fetcher';

const Login = ( {setToken} ) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

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

        const token = fetchData('http://localhost:8080/login',options)
        .then(res => {
            console.log(res)
            setToken(res.data.Encoded)
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
                    <br></br>
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </Form>
                <br></br>
            </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login
