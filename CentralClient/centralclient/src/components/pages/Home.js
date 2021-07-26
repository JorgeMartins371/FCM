import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import {fetchData} from '../Fetcher'

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {        
			message: 'loading...'
		}
    }
    
    componentDidMount() {
		fetch('http://localhost:8080')
			.then(res => {
                console.log(res)
				let m = 'Server status: Offline'				
				if (res.ok) {
					m = 'Server status: Online'
				}
				this.setState({
					message: m
				})
			})
			.catch(
				this.setState({
					message: 'Server status: Offline'
				})
			)
    }

    render(){
        return (
			<div>
				<div className="container">
					<h4 className="center">Home</h4>
					<p>Central Web-App</p>
					<Col>{this.state.message}</Col>
				</div>
			</div>
		)
    }
}