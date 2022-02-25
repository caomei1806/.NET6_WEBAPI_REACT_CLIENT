import React, { useState } from 'react'
import Constants from '../Constants'

const JobUpdateForm = (props) => {
	const initialFormData = Object.freeze({
		title: props.job.title,
		description: props.job.description,
	})

	const [newJob, setNewJob] = useState(initialFormData)

	const handleChange = (e) => {
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
			const api = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jobToUpdate),
			})
			const response = await api.json()
			console.log(response)
		} catch (error) {
			console.log(error)
		}

		props.onJobUpdated(jobToUpdate)
	}

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
