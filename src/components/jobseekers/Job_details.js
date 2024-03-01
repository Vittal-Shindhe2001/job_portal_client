import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { startGetSelectedJob } from '../../action/jodPostAction'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ApplicationForm from '../../forms/Application_form'
import { startGetAppliedJodApplication } from '../../action/jobApplicationsAction'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export default function Job_details() {
    const [show, setShow] = useState(false);
    const [modal, setModel] = useState(false);
    const [applied, setApplied] = useState(false)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const job = useSelector(state => state.job.data)
    useEffect(() => {
        dispatch(startGetSelectedJob(id))
        //featch applied job application
        dispatch(startGetAppliedJodApplication())
    }, [dispatch, id, history,modal])
    const applications = useSelector(state => state.applications.data)
    useEffect(() => {
        // Check if the current job has been applied for
        if (applications && job) {
            const isApplied = applications.some(app => app.job_id._id === job._id)
            setApplied(isApplied);
        }
    }, [applications, job, history])
    const handleCancel = () => {
        // Navigate back to the previous page
        history.goBack();
    }
    // Toggle modal function
    const toggle = () => {
        setModel(!modal);
        setShow(!show);
    };

    // Handle update function
    const handleUpadte = () => {
        setShow(!show);
        toggle();
    }

    return (
        <div className="container mt-3">
            {job ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Company: {job.company_id?.name}</h6>
                        <p className="card-text">
                            <strong>Description:</strong> {job.description}<br />
                            <strong>Location:</strong> {job.location}<br />
                            <strong>Posted By:</strong> {job.userId?.firstName} {job.userId?.lastName}<br />
                            <strong>Posted At:</strong> {new Date(job.posted_at).toLocaleDateString()}<br />
                            <strong>Requirements:</strong><br />
                            <ul className="list-unstyled">
                                {job.requirements && job.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </p>
                        <button className="btn btn-primary mr-6" disabled={applied} onClick={handleUpadte}>Apply</button>
                        <button className="btn btn-secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
                        {applied && <Link to='/applied/jobs'><button className='btn btn-primary' style={{ marginLeft: '10px' }}>View Applied Jobs</button></Link>}

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {show && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Apply to {job.company_id?.name}</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <ApplicationForm jobId={job._id} companyId={job.company_id} toggle={toggle} />
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>
    )
}
