import React from 'react'
import JobUpdateForm from '../components/JobUpdateForm'

const JobList = (props) => {
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
						{props.jobs.map((job) => {
							return (
								<tr key={'Job' + job.id}>
									<th scope='row'>{job.id}</th>
									<td>{job.title}</td>
									<td>{job.description}</td>
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
	}

	return (
		<div className='row w-100 min-vh-100'>
			<div className='col d-flex flex-column justify-content-center align-items-center'>
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
