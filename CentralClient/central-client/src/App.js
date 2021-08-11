import NavBar from './components/NavBar.js'
import Login from './components/Login.js'
import InfoBox from './components/InfoBox.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Acknowledge from './components/Acknowledge.js';
import useToken from './utils/UseToken.js'
import { useState } from 'react'


function App() {

  /*const { token, setToken} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }*/

  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Route exact path='/' component={InfoBox} />
        <Route exact path='/ack/:aid' component={Acknowledge} />
      </Router>
    </div>
  );
}

export default App;
