import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { startGetJobs, startSearchJobPost, startSortByDateJobPost } from '../../action/jodPostAction';
import { debounce } from 'lodash'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const FindJob = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(6);
    const history=useHistory()
    // useDispatch
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetJobs())
    }, [history])
    const jobs = useSelector(state => {
        if (state.job && state.job.data && Array.isArray(state.job.data)) {
            return state.job.data.filter(job => !job.isDeleted)
            } else {
                return []
            }
    })
    // Get current jobs
        const indexOfLastJob = currentPage * jobsPerPage
        const indexOfFirstJob = indexOfLastJob - jobsPerPage
        const currentJobs = Array.isArray(jobs) ? jobs.slice(indexOfFirstJob, indexOfLastJob) : []
       

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle sorting change
    const handleSortByChange = (event) => setSortBy(event.target.value)
    useEffect(() => {
        dispatch(startSortByDateJobPost(sortBy))
    }, [sortBy, dispatch])

    // Update search term
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Call debounced search function with the updated search term
        debouncedSearch(term);
    }

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((term) => {
            // Perform search operation here
            dispatch(startSearchJobPost(term))
        }, 3000), // Debounce delay of 300 milliseconds
        []
    );

    return (
        <div className="container">
            <h1>Find Jobs</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    style={{width:"41%"}}
                    placeholder="Search by title, company, or location"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="sortBy" className="form-label">Sort By:</label>
                <select id="sortBy" className="form-select" style={{width:"16%"}} value={sortBy} onChange={handleSortByChange}>
                    <option value="date">Date</option>
                    <option value="1day">one Day Ago</option>
                    <option value="1week">one Week Ago</option>
                    <option value="1month">one Month Ago</option>
                </select>
            </div>
            <div className="row">
                {currentJobs?.length > 0 ? (
                    currentJobs.map(job => (
                        <div key={job._id} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{job.company_id?.name}</h6>
                                    <p className="card-text">Location: {job.location}</p>
                                    {job.salary ? (
                                        <p className="card-text">Salary: {job.salary}</p>
                                    ) : (
                                        <p className="card-text">Salary: -</p>
                                    )}
                                    <p className="card-text">Posted:{moment(job.posted_at).fromNow()}</p>
                                    <Link to={`/jobseeker/job/${job._id}`} className="card-link">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-md-12">
                        <p>No data found</p>
                    </div>
                )}
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
                    {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    {currentPage !== Math.ceil(jobs.length / jobsPerPage) && (
                        <li className="page-item">
                            <button onClick={() => paginate(currentPage + 1)} className="page-link">
                                Next
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

        </div>
    );
};

export default FindJob;
