import React from 'react'
import {Nav, Container} from 'react-bootstrap'

export const NavBar = () => (
	<Container>
		<Nav variant="pills" defaultActiveKey="/">
		<Nav.Item>
			<Nav.Link href="/">Home</Nav.Link>
		</Nav.Item>
		<Nav.Item>
			<Nav.Link href="/event">Get all events</Nav.Link>
		</Nav.Item>
		</Nav>
	</Container>
)