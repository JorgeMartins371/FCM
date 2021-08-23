import React, { useState, useContext, useEffect } from 'react'
import { fetchData } from '../utils/Fetcher'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import GlobalState from '../utils/GlobalState';

const Configuration = () => {
    const [state, setState] = useContext(GlobalState);
    const [cons, setCons] = useState([])
    const [users, setUsers] = useState([])

    //System Admins

    if(state.isAdmin === true || localStorage.getItem('isAdmin') == true){

        const getInfo = e => {
        e.preventDefault()

        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization'
        })
        let options = { headers }
        const a = fetchData(`http://localhost:8080/storedCon`, options)
            .then(res => {
                setCons(res.data.Connections)
        })

        // fetchData(`http://localhost:8080/users`, options)
        //     .then(res => {
        //         setUsers(res.data.Users)
        //         console.log(users)
        // })


        }


        return (
            <Container>
                <Button variant="danger" type="submit" onClick={getInfo}>
                    Get info
                </Button>
            </Container>
        )
    }

    //Standart Users
    
    else{
        console.log("not admin")
        return(
            <div>
                <h5>Im not admin!</h5>
            </div>
        )
    }
}

export default Configuration
