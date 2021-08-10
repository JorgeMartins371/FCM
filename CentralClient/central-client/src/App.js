import NavBar from './components/NavBar.js'
import Header from './components/Header.js'
import InfoBox from './components/InfoBox.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Acknowledge from './components/Acknowledge.js';


function App() {

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
