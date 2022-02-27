import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Constants from '../Constants'

const JobListing = () => {
	const [job, setJob] = useState({})
	let { id } = useParams()

	const getJobById = async () => {
		const url = `${Constants.API_URL_GET_ALL_JOBS}/${id}`
		try {
			const api = await fetch(url, {
				method: 'GET',
			})
			const response = await api.json()
			console.log(response)
			setJob(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getJobById()
	}, [])

	return (
		<section className='d-flex pt-5 justify-content-center'>
			<article className='card mb-3 w-50'>
				<div className='card-body'>
					<h5 className='card-title'>{job.title}</h5>
					<h6 className='card-subtitle mb-2 text-muted'>
						<strong>Job Description:</strong>
					</h6>
					<p className='card-text'>{job.description}</p>
					<Link className='card-link' to='/'>
						Go back
					</Link>
				</div>
			</article>
		</section>
	)
}

export default JobListing
