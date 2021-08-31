import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import React from 'react'
import GlobalState from '../utils/GlobalState';

const NavBar = () => {

    const [state, setState] = useContext(GlobalState);
    useEffect(() => {},[state.isLog])

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>FCM</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

            <LinkContainer to="/connections">
                {localStorage.getItem("isAdmin") ? <Nav.Link>Setup Connections</Nav.Link> : <></>}
            </LinkContainer>

            <LinkContainer to="/users">
                {localStorage.getItem("isAdmin") ? <Nav.Link>Configure Users</Nav.Link> : <></>}
            </LinkContainer>

            <LinkContainer to="/events">
                <Nav.Link>Events</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
                {!state.isLog && localStorage.getItem("user")===null ? <Nav.Link>Login</Nav.Link> : <></>}
            </LinkContainer>

            <LinkContainer to="/logout">
                {state.isLog || localStorage.getItem("user")!==null ? <Nav.Link>Logout</Nav.Link> : <></>}
            </LinkContainer>

            {state.isLog || localStorage.getItem("user")!==null ? 
            <div className="d-flex flex-column-reverse">
                <Nav.Link> Logged in as: {localStorage.getItem("user")}</Nav.Link> 
            </div>
            : <></>}

            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavBar
