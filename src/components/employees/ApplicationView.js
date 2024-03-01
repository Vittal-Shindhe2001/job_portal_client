import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetApplicationId, start_Update_Status_Application } from '../../action/jobApplicationsAction'

const ApplicationView = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetApplicationId(id))
    }, [id])
    const application = useSelector(state => state.applications.data)

    if (!application) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 mt-3 text-center">
                    <div className="card-body">
                        {Object.keys(application).length > 0 && <div className="card shadow">
                            <h3>Application Details</h3>
                            <p>Job Title: {application?.application?.job_id?.title}</p>
                            <p>Applicant Name: {application?.application?.applicant_id?.firstName} {application?.application?.applicant_id?.lastName}</p>
                            <p>Applicant Email: {application?.application?.applicant_id?.email}</p>
                            <p>Company Name: {application?.application?.company_Id?.name}</p>
                            <p>Skills: {application?.applicant_profile?.skills?.length > 0 ? application?.applicant_profile?.skills.map(skill => <span key={skill}>{skill}, </span>) : "No skills provided"}</p>
                            <div className="d-flex justify-content-center mb-2">
                                <a href={`http://localhost:3096/${application?.application?.resume}`}> <button className="btn btn-primary btn-sm me-3" style={{ width: '137px' }} type='button' onClick={() => { dispatch(start_Update_Status_Application(application?.application?._id, 'resume download')) }}>
                                    Download Resume
                                </button></a>
                                <button className="btn btn-success btn-sm me-3" onClick={() => { dispatch(start_Update_Status_Application(application?.application?._id, 'accepted')) }}>Accepted</button>
                                <button className="btn btn-danger btn-sm" onClick={() => { dispatch(start_Update_Status_Application(application?.application?._id, 'reject')) }}>Reject</button>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}
export default ApplicationView