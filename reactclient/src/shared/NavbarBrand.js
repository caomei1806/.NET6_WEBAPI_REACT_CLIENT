import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavbarBrand = () => {
	return (
		<Navbar bg='light' expand='lg'>
			<div className='container'>
				<LinkContainer to='/'>
					<Navbar.Brand>JobBoard</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<LinkContainer to='/'>
							<Nav.Link className='px-5'>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/create-job'>
							<Nav.Link className='px-5'>Create JobListing</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	)
}

export default NavbarBrand
