import NavBar from './components/NavBar.js'
import Login from './components/Login.js'
import InfoBox from './events/InfoBox.js'
import ConnectionManager from './components/connections/ConnectionManager.js';
import EventFilter from './events/EventFilter.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AcknowledgeInfo from './events/AcknowledgeInfo.js';
import { useState } from 'react'
import GlobalState from './utils/GlobalState.js';
import Logout from './components/Logout.js';
import UserManager from './components/users/UserManager.js';


function App() {

  const [state, setState] = useState({});

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
              <br></br>
              <InfoBox/>
            </Route>
            <Route exact path='/ack/:aid' component={AcknowledgeInfo} />
            <Route exact path='/connections' component={ConnectionManager} />
            <Route exact path='/users' component={UserManager}/>
            <Route exact path='/logout' component={Logout}/>
          </Router>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
