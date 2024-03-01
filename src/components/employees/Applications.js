import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetEmployeJobApplication, start_Update_Status_Application } from '../../action/jobApplicationsAction'


const ApplicationsEmployer = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [id, setId] = useState('')
    const pageLimit = 6
    const applications = useSelector(state => state.applications.data.applications)
    useEffect(() => {
        dispatch(startGetEmployeJobApplication(currentPage, pageLimit))
            .then(data => {
                setTotalPages(Math.ceil(data.totalCount / pageLimit))
            })
    }, [currentPage, pageLimit])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    return (
        <div className="container">
            {applications && Object.keys(applications).length > 0 ? <>  <h1>Applications - Employer</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Applicant</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications && applications?.map((ele, i) => (
                            <tr key={ele._id}>
                                <td>{i + 1}</td>
                                <td>{ele.job_id.title}</td>
                                <td>{ele.company_Id.name}</td>
                                <td>{ele.applicant_id.firstName} {ele.applicant_id.lastName}</td>
                                <td>{ele.status}</td>
                                <td>
                                    <Link to={`/employer/application/view/${ele._id}`} className="btn btn-primary btn-sm me-2" onClick={() => { dispatch(start_Update_Status_Application(ele._id, 'view')) }}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table> </> : <><h1>No Data Found</h1></>
            }            <nav>
                <ul className="pagination">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                        </li>
                    )}

                    {/* Page Buttons */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    {/* Next Button */}
                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default ApplicationsEmployer
