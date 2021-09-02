import {useContext} from 'react'
import { useHistory } from "react-router-dom";
import GlobalState from '../utils/GlobalState';
import { Container } from 'react-bootstrap'

const Logout = () => {

    let history = useHistory();

    const [state, setState] = useContext(GlobalState);


    setTimeout(() => {
        setState(state => ({...state, isLog: false}))
        history.push('/')
    },2000)

    localStorage.clear()
    
    
    return (
        <Container>
            <h3>Logging out...</h3>
        </Container>
    )
}

export default Logout
