import React, { useEffect, useState, useContext } from 'react'
import NavbarBrand from './shared/NavbarBrand'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobCreateForm from './components/JobCreateForm'
import JobList from './components/JobList'
import Constants from './Constants'
import LoginForm from './components/LoginForm'
import AuthContext from './context/AuthProvider'
import JobListing from './components/JobListing'
const CREATEJOB_URL = '/jobs-create'
function App() {
	const [jobs, setJobs] = useState([])
	const [updateJob, setUpdateJob] = useState(null)
	const { auth } = useContext(AuthContext)

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

	const onJobCreated = (createdJob) => {
		if (createdJob === null) {
			return
		}
		alert(`Post successfully created: ${createdJob.title}`)
		getJobs()
	}

	const onJobUpdated = (updatedJob) => {
		if (updatedJob === null) {
		}
		setUpdateJob(null)
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
					Authorization: `Bearer ${auth.accessToken}`,
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
		<div>
			<Router>
				<NavbarBrand />
				<Routes>
					<Route
						path='/'
						element={
							<JobList
								jobs={jobs}
								updateJob={updateJob}
								updatedJob={updateJob}
								onJobUpdated={onJobUpdated}
								setUpdateJob={setUpdateJob}
								deleteJob={deleteJob}
							/>
						}
					/>
					<Route path='/:id' element={<JobListing jobs={jobs} />} />
					<Route
						path='/create-job'
						element={<JobCreateForm onJobCreated={onJobCreated} />}
					/>
					<Route path='/login' element={<LoginForm />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
