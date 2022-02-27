import React, { useEffect, useContext } from 'react'
import JobUpdateForm from '../components/JobUpdateForm'
import AuthContext from '../context/AuthProvider'
import Job from './Job'

const JobList = (props) => {
	const { auth } = useContext(AuthContext)

	useEffect(() => renderPostsTable, [auth])

	const renderPostsTable = () => {
		if (auth.accessToken !== undefined) {
			return (
				<div className='container table-responsive mt-5 w-100'>
					<table className='table border-dark'>
						<thead>
							<tr>
								<th scope='col'>JobId ()</th>
								<th scope='col'>Title</th>
								<th scope='col'>Content</th>
								<th scope='col'>CRUD</th>
							</tr>
						</thead>
						<tbody>
							{props.jobs.map((job) => {
								return (
									<tr key={'Job' + job.id}>
										<th scope='row'>{job.id}</th>
										<td>{job.title}</td>
										<td className='col-md-6'>{job.description}</td>
										<td>
											<button
												className='btn btn-dark btn-lg mx-3 my-3'
												onClick={() => props.setUpdateJob(job)}
											>
												Update
											</button>
											<button
												className='btn btn-secondary btn-lg mx-3'
												onClick={() => {
													if (
														window.confirm(
															`Are you sure you want to delete job listing: ${job.title} ?`
														)
													)
														props.deleteJob(job.id)
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
		} else {
			return (
				<div className='container mt-5'>
					{props.jobs.map((job) => {
						return <Job job={job} key={`${job.id}_${job.title}`} />
					})}
				</div>
			)
		}
	}

	return (
		<div className='row w-100 min-vh-75'>
			<div className='col d-flex flex-column align-items-center'>
				{props.jobs.length > 0 &&
					props.updateJob === null &&
					renderPostsTable()}
				{props.updateJob !== null && (
					<JobUpdateForm
						job={props.updateJob}
						onJobUpdated={props.onJobUpdated}
					/>
				)}
			</div>
		</div>
	)
}

export default JobList
