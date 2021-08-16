import NavBar from './components/NavBar.js'
import Login from './components/Login.js'
import InfoBox from './components/InfoBox.js'
import Dashboard from './components/Dashboard.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AcknowledgeInfo from './components/AcknowledgeInfo.js';
import useToken from './utils/UseToken.js'
import { useState } from 'react'
import { fetchData } from './utils/Fetcher.js';
import GlobalState from './utils/GlobalState.js';


function App() {

  /*const { token, setToken} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }*/

  const [token, setToken] = useState();
  const [state, setState] = useState({});

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        <Router>
          <NavBar/>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/events' component={InfoBox} />
          <Route exact path='/ack/:aid' component={AcknowledgeInfo} />
        </Router>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
