import { useRef, useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

const LOGIN_URL = '/api/login'

const LoginForm = () => {
	const { setAuth, auth } = useContext(AuthContext)
	const userRef = useRef()
	const errorRef = useRef()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [showError, setShowError] = useState(false)
	const [success, setSuccess] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrorMessage('')
		setShowError(false)
	}, [username, password])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({
					emailAddress: username,
					password,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			const accessToken = response?.data?.value
			const roles = response?.data?.role
			setAuth({ accessToken })
			console.log(accessToken)

			setUsername('')
			setPassword('')
			setSuccess(true)
			setShowError(false)
			alert('Successfully logged in')
			console.log(response)
			navigate('/')
		} catch (error) {
			if (!error?.response) {
				setErrorMessage('No Server Response')
			} else if (error.response?.status === 400) {
				setErrorMessage('Missing Username or Password')
			} else if (error.response?.status === 401) {
				setErrorMessage('Unauthorized')
			} else {
				setErrorMessage('Login Failed')
			}
			setShowError(true)
			errorRef.current.focus()
		}
	}

	return (
		<section className='container mt-5'>
			{showError && (
				<article
					className='alert alert-danger mt-4'
					role='alert'
					ref={errorRef}
				>
					{errorMessage}
				</article>
			)}
			<h1>Sign In</h1>
			<Form className='w-50' onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						ref={userRef}
						autoComplete='on'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<Form.Text className='text-muted'>
						Login to admin's panel: karo.admin@email.com haslo123
					</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						autoComplete='on'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Button variant='dark' type='submit' size='lg'>
					Submit
				</Button>
			</Form>
		</section>
	)
}

export default LoginForm
