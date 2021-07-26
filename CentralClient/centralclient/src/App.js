import React, { Component } from 'react'
import { NavBar } from './components/NavBar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './components/pages/Home'
import Event from './components/pages/Event'

export default class App extends Component {
	render() {
		return (
			<Container>
				<BrowserRouter>
					<div className="App">
					<NavBar />
						<br />
						<br />
						<Switch>	
                        <Route exact path='/' component={Home} />
                        <Route exact path='/event' component={Event} />
						</Switch>	
					</div>
				</BrowserRouter>
			</Container>
			
		  );
	}
}