import React, { useEffect, useState } from 'react'
import Constants from './Constants'
import JobCreateForm from './components/JobCreateForm'
import JobUpdateForm from './components/JobUpdateForm'

function App() {
	const [jobs, setJobs] = useState([])
	const [showCreateJobForm, setShowCreateJobForm] = useState(false)
	const [updateJob, setUpdateJob] = useState(null)

	const getJobs = async () => {
		const url = Constants.API_URL_GET_ALL_JOBS

		try {
			const api = await fetch(url, {
				method: 'GET',
			})
			const response = await api.json()
			setJobs(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getJobs()
	}, [])
	const renderPostsTable = () => {
		return (
			<div className='table-responsive mt-5'>
				<table className='table table-bordered border-dark'>
					<thead>
						<tr>
							<th scope='col'>JobId ()</th>
							<th scope='col'>Title</th>
							<th scope='col'>Content</th>
							<th scope='col'>CRUD</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job) => {
							return (
								<tr key={'Job' + job.id}>
									<th scope='row'>{job.id}</th>
									<td>{job.title}</td>
									<td>{job.description}</td>
									<td>
										<button
											className='btn btn-dark btn-lg mx-3 my-3'
											onClick={() => setUpdateJob(job)}
										>
											Update
										</button>
										<button
											className='btn btn-secondary btn-lg'
											onClick={() => {
												if (
													window.confirm(
														`Are you sure you want to delete job listing: ${job.title} ?`
													)
												)
													deleteJob(job.id)
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}

	const onJobCreated = (createdJob) => {
		setShowCreateJobForm(false)
		if (createdJob.title === '' || createdJob.description === '') {
			console.log('====================================')
			console.log('ss')
			console.log('====================================')
		}
		alert(`Post successfully created: ${createdJob.title}`)
		getJobs()
	}

	const onJobUpdated = (updatedJob) => {
		setUpdateJob(null)
		if (updatedJob.title === '' || updatedJob.description === '') {
			return
		}
		let clonedJobs = [...jobs]

		const updateIndex = clonedJobs.findIndex((post, index) => {
			if (post.id === updateJob.id) {
				return true
			}
		})
		if (updateIndex !== -1) {
			clonedJobs[updateIndex] = updatedJob
		}
		setJobs(clonedJobs)
		alert(`Post successfully updated: ${updatedJob.title}`)
		getJobs()
	}
	const onJobDeleted = (jobId) => {
		let clonedJobs = [...jobs]

		const updateIndex = clonedJobs.findIndex((post, index) => {
			if (post.id === jobId) {
				return true
			}
		})
		if (updateIndex !== -1) {
			clonedJobs.splice(updateIndex, 1)
		}
		setJobs(clonedJobs)
		alert('Post successfully deleted.')
		getJobs()
	}

	const deleteJob = async (jobId) => {
		const url = `${Constants.API_URL_DELETE_JOB}/${jobId}`

		try {
			const api = await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jobId),
			})
			const response = await api.json()
			console.log(response)
			onJobDeleted(jobId)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='container'>
			<div className='row min-vh-100'>
				<div className='col d-flex flex-column justify-content-center align-items-center'>
					{showCreateJobForm === false && updateJob === null && (
						<div className='mt-5'>
							<button
								className='btn btn-dark btn-lg w-100'
								onClick={() => setShowCreateJobForm(true)}
							>
								Create new job listing
							</button>
						</div>
					)}

					{jobs.length > 0 &&
						showCreateJobForm === false &&
						updateJob === null &&
						renderPostsTable()}
					{showCreateJobForm && <JobCreateForm onJobCreated={onJobCreated} />}
					{updateJob !== null && (
						<JobUpdateForm job={updateJob} onJobUpdated={onJobUpdated} />
					)}
				</div>
			</div>
		</div>
	)
}

export default App
