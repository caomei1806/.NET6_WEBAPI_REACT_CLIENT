import React, { useContext, useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../context/AuthProvider'

const NavbarBrand = () => {
	const { auth } = useContext(AuthContext)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		if (auth.accessToken === undefined) {
			setIsLoggedIn(false)
		} else {
			setIsLoggedIn(true)
		}
	}, [auth])

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
						{isLoggedIn && (
							<LinkContainer to='/create-job'>
								<Nav.Link className='px-5'>Create JobListing</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
				{!isLoggedIn && (
					<LinkContainer className='mt-auto' to='/login'>
						<Nav.Link className='px-5'>Login</Nav.Link>
					</LinkContainer>
				)}
				{isLoggedIn && (
					<LinkContainer to='/logout'>
						<Nav.Link className='px-5'>Logout</Nav.Link>
					</LinkContainer>
				)}
			</div>
		</Navbar>
	)
}

export default NavbarBrand
