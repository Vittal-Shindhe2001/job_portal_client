import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { startGetSelectedJob } from '../../action/jodPostAction'
import { useDispatch, useSelector } from 'react-redux'

const JobPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const job = useSelector(state => state.job.data)

  useEffect(() => {
    dispatch(startGetSelectedJob(id))
  }, [dispatch, id])
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          Job Details
        </div>
        <div className="card-body">
          {job ? (
            <div>
              <h5 className="card-title">Title:{job.title}</h5>
              <p className="card-text">Description:{job.description}</p>
              <p className="card-text">Location: {job.location}</p>
              <p className="card-text">Posted by: {job.userId?.firstName} {job.userId?.lastName}</p>
              <p className="card-text">Company: {job.company_id?.name}</p>
              <p className="card-text">Company Email: {job.company_id?.email}</p>
              <p className="card-text">Company Website: <a href={job.company_id?.website}>{job.company_id?.website}</a></p>
              <div>
                <p className="card-text">Requirements:</p>
                <ul>
                  {job.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobPost
