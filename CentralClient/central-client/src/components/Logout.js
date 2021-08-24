import {useContext} from 'react'
import { useHistory } from "react-router-dom";
import GlobalState from '../utils/GlobalState';

const Logout = () => {

    let history = useHistory();

    const [state, setState] = useContext(GlobalState);

    setTimeout(() => {
        history.push('/')
    },2000)

    localStorage.clear()
    
    return (
        <div>
            <h3>Logging out...</h3>
        </div>
    )
}

export default Logout
