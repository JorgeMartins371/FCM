import NavBar from './components/NavBar.js'
import Login from './components/Login.js'
import InfoBox from './components/InfoBox.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AcknowledgeInfo from './components/AcknowledgeInfo.js';
import useToken from './utils/UseToken.js'
import { useState } from 'react'
import { fetchData } from './utils/Fetcher.js';


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
        <Route exact path='/ack/:aid' component={AcknowledgeInfo} />
      </Router>
    </div>
  );
}

function zab(){
  let headers = new Headers({
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Authorization'
  })
  let options = { headers }
  fetchData('http://localhost:8080/zabbixCon',options) //Eventualmente meter dinamicamente numero da instancia
  .then(res => {
      console.log(res)
  })
}

export default App;
