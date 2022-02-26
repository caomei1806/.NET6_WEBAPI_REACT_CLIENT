import React, { useState, useEffect } from 'react'
import Constants from '../Constants'

const JobUpdateForm = (props) => {
	const initialFormData = Object.freeze({
		title: props.job.title,
		description: props.job.description,
	})

	const [newJob, setNewJob] = useState(initialFormData)
	const [alertState, setAlertState] = useState(false)

	const handleChange = (e) => {
		setAlertState(false)
		setNewJob({
			...newJob,
			[e.target.name]: e.target.value,
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()

		const jobToUpdate = {
			id: props.job.id,
			title: newJob.title,
			description: newJob.description,
		}
		const url = Constants.API_URL_UPADATE_JOB
		try {
			if (jobToUpdate.title !== '' && jobToUpdate.description !== '') {
				const api = await fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(jobToUpdate),
				})
				const response = await api.json()
				console.log(response)
				props.onJobUpdated(jobToUpdate)
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
		<form className='w-100 px-5'>
			<h1 className='mt-5'>Update {props.job.title} job listing</h1>

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
				<div class='alert alert-danger mt-4' role='alert'>
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
				onClick={() => props.onJobUpdated(null)}
			>
				Cancel
			</button>
		</form>
	)
}

export default JobUpdateForm
