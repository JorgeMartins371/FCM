import NavBar from './components/NavBar.js'
import Login from './components/Login.js'
import InfoBox from './components/InfoBox.js'
import Dashboard from './components/Dashboard.js';
import EventFilter from './components/EventFilter.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AcknowledgeInfo from './components/AcknowledgeInfo.js';
import { useState } from 'react'
import GlobalState from './utils/GlobalState.js';
import Configuration from './components/Configuration.js';
import Logout from './components/Logout.js';


function App() {

  /*const { token, setToken} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }*/

  const [token, setToken] = useState();
  const [state, setState] = useState({});

  //  if(!localStorage.getItem('isLog') && !token) {
  //    return(
  //      <Login/>
  //   ) 
  //  }

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        <Router>
            <NavBar/>
            <Route exact path='/'>
              {(!localStorage.getItem('user')) ? 
              <Login/> :<Redirect to='/events'/>}
            </Route>
            <Route exact path='/events'>
              <EventFilter/>
              <InfoBox/>
            </Route>
            <Route exact path='/ack/:aid' component={AcknowledgeInfo} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/logout' component={Logout}/>
          </Router>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
