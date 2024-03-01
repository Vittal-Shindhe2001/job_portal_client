import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAppliedJodApplication } from '../../action/jobApplicationsAction'

export default function AppliedJods() {
    const [currentPage, setCurrentPage] = useState(1);
    const [ApplicationsPerPage] = useState(3);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetAppliedJodApplication())
    }, [])
    const applications = useSelector(state => state.applications.data)
    // PAGINATION
    // Get current jobs
    const indexOfLastApplication = currentPage * ApplicationsPerPage
    const indexOfFirstApplication = indexOfLastApplication - ApplicationsPerPage
    const currentApplications = Array.isArray(applications) ? applications.slice(indexOfFirstApplication, indexOfLastApplication) : []


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
               {currentApplications.length > 0 ? <div className="col-md-8 mt-3">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h1>Applied Jobs</h1>
                            {currentApplications.length > 0 && currentApplications.map((application) => {
                                // Calculate time difference
                                const appliedTime = new Date(application.applied_at);
                                const currentTime = new Date();
                                const timeDifference = Math.abs(currentTime - appliedTime);
                                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                                const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                                return (
                                    <div className="md-3" key={application._id}>
                                        <h5>{application.job_id.title}</h5>
                                        <p>Company Name: {application.company_Id.name}</p>
                                        <p>Location: {application.company_Id.location}</p>
                                        <p>status: {application.status}</p>
                                        <p>Applied on {daysDifference > 0 ? `${daysDifference} day${daysDifference === 1 ? '' : 's'}` : ''} {hoursDifference > 0 ? `${hoursDifference} hour${hoursDifference === 1 ? '' : 's'}` : ''} ago</p>

                                        <hr />
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    <nav>
                        <ul className="pagination">
                            {currentPage !== 1 && (
                                <li className="page-item">
                                    <button onClick={() => paginate(currentPage - 1)} className="page-link">
                                        Previous
                                    </button>
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(applications.length / ApplicationsPerPage) }, (_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            {currentPage !== Math.ceil(applications.length / ApplicationsPerPage) && (
                                <li className="page-item">
                                    <button onClick={() => paginate(currentPage + 1)} className="page-link">
                                        Next
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div> : <>
                    <h1>No Data Found</h1>
                </>}
                <div className="col-md-2"></div>
            </div>
        </div>

    )
}
