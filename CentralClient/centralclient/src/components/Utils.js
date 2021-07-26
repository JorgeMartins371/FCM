import React from 'react'
import { Form, Col, Button, Row, Tab, } from 'react-bootstrap'

export const successMessage = (message) => (
    <div className="alert alert-success " role="alert">
        {message}
    </div>
)

export const warningMessage = (message) => (
    <div className="alert alert-warning " role="alert">
        {message}
    </div>
)

export const infoMessage = (message) => (
    <div className="alert alert-info " role="alert">
        {message}
    </div>
)

export const dangerMessage = (message) => (
    <div className="alert alert-danger " role="alert">
        {message}
    </div>
)

export const AuthorizationMessage = () =>(
    <div className="alert alert-info " role="alert">
        <p>Please Log In first.</p>
        <button type="button" class="btn btn-outline-info" onClick={() =>{window.location.href = '/log'}}>Log In</button>
    </div>
)
export const redirectMessage = (message, goTo, name) => (
    <div className="alert alert-info " role="alert">
        <p><h3>{message}</h3></p>
        <button type="button" class="btn btn-outline-info" onClick={() =>{window.location.href = goTo}}>{name}</button>
    </div>
)