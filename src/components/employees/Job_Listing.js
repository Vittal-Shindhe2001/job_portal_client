import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import JobForm from '../../forms/Job_form'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteJobPost, startGetEmployesJob } from '../../action/jodPostAction'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { set } from 'lodash'




const JobListing = () => {
    const [show, setShow] = useState(false)
    const [modal, setModel] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage, setJobsPerPage] = useState(5)
    const [editJob, setEditJob] = useState(null)

    const handleEditJob = (job) => {
        setEditJob(job)
        setShow(true)
        toggle()
    }

    const dispatch = useDispatch()
    const history = useHistory()
    //function to handle popover
    const toggle = () => {
        setModel(!modal)
        setShow(!show)
    }


    const handlebtn = () => {
        setEditJob(null)
        setShow(!show)
        toggle()
    }
    const jobs = useSelector(state => state.job.data)
    useEffect(() => {
        dispatch(startGetEmployesJob())
    }, [modal, history])


    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = jobs && Array.isArray(jobs) && jobs.slice(indexOfFirstJob, indexOfLastJob)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={handlebtn}>New Job Post</button>
            {currentJobs.length > 0 ? <><h1>Job Listings</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Location</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs && Array.isArray(currentJobs) && currentJobs.map((job, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{job.title}</td>
                                <td>{job.company_id?.name}</td>
                                <td>{job.location}</td>
                                {job.salary ? (
                                    <td className="card-text">{job.salary}</td>
                                ) : (
                                    <td className="card-text">-</td>
                                )}
                                <td>
                                    <Link to={`/job/${job._id}`} className="btn btn-primary btn-sm me-2">View</Link>
                                    <button className='btn btn-primary btn-sm me-2' onClick={() => { handleEditJob(job) }}>Edit</button>
                                    <button className='btn btn-danger btn-sm' onClick={() => { dispatch(startDeleteJobPost(job._id, true)) }}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {/* Pagination */}
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => setCurrentPage(currentPage - 1)} className="page-link">
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button onClick={() => setCurrentPage(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(jobs.length / jobsPerPage) ? 'disabled' : ''}`}>
                            <button onClick={() => setCurrentPage(currentPage + 1)} className="page-link">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </> : <>
                <h1>No Data Found</h1>
            </>}
            {show && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{editJob ? 'Edit Job Post' : 'Create Job Post'}</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            {editJob ? <JobForm toggle={toggle} job={editJob} /> : <JobForm toggle={toggle} />}
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>

    )

}


export default JobListing

