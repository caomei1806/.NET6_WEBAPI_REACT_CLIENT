import React, { useEffect, useState } from 'react'

function App() {
	const [jobs, setJobs] = useState([])

	const getJobs = async () => {
		const url = 'https://localhost:7011/jobs'

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
										<button className='btn btn-dark btn-lg mx-3 my-3'>
											Update
										</button>
										<button className='btn btn-secondary btn-lg'>Delete</button>
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
		<div className='container'>
			<div className='row min-vh-100'>
				<div className='col d-flex flex-column justify-content-center align-items-center'>
					<h1>hello</h1>
					{jobs.length > 0 && renderPostsTable()}
				</div>
			</div>
		</div>
	)
}

export default App
