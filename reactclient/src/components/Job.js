import React from 'react'
import { Link } from 'react-router-dom'

const Job = (props) => {
	const { job } = props
	return (
		<div className='card mb-3 w-100'>
			<div className='card-body'>
				<h5 className='card-title'>{job.title}</h5>
				<h6 className='card-subtitle mb-2 text-muted'>
					<strong>Job Description:</strong>
				</h6>
				<p className='card-text'>{job.description}</p>
				<Link className='card-link' to={`/${job.id}`}>
					About
				</Link>
			</div>
		</div>
	)
}

export default Job
