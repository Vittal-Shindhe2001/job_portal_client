import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteJobPost, startGetJobs } from '../../action/jodPostAction'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import JobForm from '../../forms/Job_form'

const JobListingAdmin = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage] = useState(5) // Number of jobs to display per page
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [edit, setEdit] = useState({})

    useEffect(() => {
        dispatch(startGetJobs())
    }, [])

    const jobListings = useSelector(state => state.job.data)
    // Get current jobs
    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    // Pagination button handlers
    const handleNextPage = () => {
        if (currentPage < Math.ceil(jobListings.length / jobsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }


    const handleEdit = (ele) => {
        console.log(ele);
        setEdit(ele)
        setModal(!modal)
    }
    return (
        <div className="container">
            {currentJobs.length > 0 ? <>  <h1>Job Listings - Admin</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Location</th>
                            <th scope="col">Posted</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((job, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{job.title}</td>
                                <td>{job.company_id.name}</td>
                                <td>{job.location}</td>
                                <td>{formatTimeAgo(job.posted_at)}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => { handleEdit(job) }} >Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => { dispatch(startDeleteJobPost(job._id, true)) }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
           { /* Pagination */}
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrevPage}>Previous</button>
                    </li>
                    {Array.from({ length: Math.ceil(jobListings.length / jobsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(jobListings.length / jobsPerPage) ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNextPage}>Next</button>
                    </li>
                </ul>
            </nav>
            </>   : <div className='container'>
                <h3>No Data found</h3>
            </div>}
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Job Post</ModalHeader>
                <ModalBody >
                    <div className="col-md-12">
                        <JobForm job={edit} toggle={toggle} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default JobListingAdmin
