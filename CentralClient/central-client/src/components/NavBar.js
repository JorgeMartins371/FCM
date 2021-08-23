import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import React from 'react'
import GlobalState from '../utils/GlobalState';

const NavBar = () => {

    const [state, setState] = useContext(GlobalState);
    useEffect(() => {},[state.isLog, state.idAdmin])

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
            <Navbar.Brand href="/">FCM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/">Dashboard</Link>
                <Link to="/Events">Events</Link>
                <Link to="/"> {!state.isLog || localStorage.getItem("isAdmin")===null ? "Login" : "Logout"}</Link>
                <Link to="/config"> {localStorage.getItem("isAdmin") ? "Config" : ""}</Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavBar
