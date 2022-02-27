import React, { useState, useEffect, useContext } from 'react'
import Constants from '../Constants'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
const CREATEJOB_URL = '/jobs-create'

const JobCreateForm = (props) => {
	const initialFormData = Object.freeze({
		title: 'Job title..',
		description: 'This job is awesome',
	})

	const [newJob, setNewJob] = useState(initialFormData)
	const [alertState, setAlertState] = useState(false)
	const { auth } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleChange = (e) => {
		setAlertState(false)
		setNewJob({
			...newJob,
			[e.target.name]: e.target.value,
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(`Bearer ${auth.accessToken}`)

		const jobToCreate = {
			postId: 0,
			title: newJob.title,
			description: newJob.description,
		}

		const url = Constants.API_URL_CREATE_JOB

		try {
			if (jobToCreate.title !== '' && jobToCreate.description !== '') {
				const response = await axios.post(
					CREATEJOB_URL,
					JSON.stringify({
						id: jobToCreate.postId,
						title: jobToCreate.title,
						description: jobToCreate.description,
					}),
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${auth.accessToken}`,
						},
					}
				)
				console.log(response)
				props.onJobCreated(jobToCreate)
				navigate('/')
			} else {
				setAlertState(true)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		let alertTimeout = setTimeout(() => setAlertState(false), 5000)

		return () => {
			clearTimeout(alertTimeout)
		}
	}, [alertState])
	return (
		<form className='w-100 px-5 container'>
			<h1 className='mt-5'>Create new job listing</h1>

			<div className='mt-5'>
				<label className='h3 form-label' htmlFor='title'>
					Job title
				</label>
				<input
					className='form-control'
					type='text'
					value={newJob.title}
					name='title'
					id='title'
					onChange={handleChange}
				/>
			</div>
			<div className='mt-4'>
				<label className='h3 form-label' htmlFor='description'>
					Job description
				</label>
				<input
					className='form-control'
					type='text'
					value={newJob.description}
					name='description'
					id='description'
					onChange={handleChange}
				/>
			</div>
			{alertState && (
				<div className='alert alert-danger mt-4' role='alert'>
					Field cannot be empty! Please fill the form inputs with entries.
				</div>
			)}
			<button
				className='btn btn-dark btn-lg w-100 mt-5'
				type='submit'
				onClick={handleSubmit}
			>
				Submit
			</button>
			<button
				className='btn btn-secondary btn-lg w-100 mt-3'
				onClick={() => props.onJobCreated(null)}
			>
				Cancel
			</button>
		</form>
	)
}

export default JobCreateForm
