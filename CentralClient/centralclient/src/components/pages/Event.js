import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import {fetchData} from '../Fetcher'

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
            message:'',
            projectList:[]
        }
    }
    
    componentDidMount() {
		let id = this.props.match.params.iid
        let headers = new Headers({
            'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'Authorization',
				Authorization: 'Basic ' + localStorage.getItem('encode')
        })
		console.log(id)

        let options = { headers }
		fetchData(`http://localhost:8080/1/event`,options)
			.then(res => {
                console.log(res)
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
					<h4 className="center">Events</h4>
					<p>Events</p>
					<Col>{this.state.message}</Col>
				</div>
			</div>
		)
    }
}