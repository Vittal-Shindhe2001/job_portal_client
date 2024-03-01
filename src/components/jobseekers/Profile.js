import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import JobSeekerProfileForm from '../../forms/JobSeekerProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUserInfo } from '../../action/userAction';



const ProfileJobSeeker = () => {
    // Component state
    const [show, setShow] = useState(false);
    const [modal, setModel] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [userInfo,setUser]=useState()
    const [resumeUrl, setResumeUrl] = useState('')
    // Dispatch function
    const dispatch = useDispatch();

    // Toggle modal function
    const toggle = () => {
        setModel(!modal);
        setShow(!show);
    };

    // Handle update function
    const handleUpadte = (e) => {
        setShow(!show);
        toggle()
        setUser(e)
    };

    // Fetch user information on component mount
    useEffect(() => {
        dispatch(startGetUserInfo());
    }, [dispatch]);

    // Retrieve user data from Redux store
    const user = useSelector((state) => state.user.data);


    // Handle "Show More" click
    const handleShowMoreClick = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="container">
            <h1>Job Seeker Profile</h1>
            <button type="button" className="btn btn-primary" onClick={()=>{handleUpadte(user)}}>Update Profile</button>
            <div className="card">
                {user?.user && Object.keys(user.user).length > 0 && (
                    <div className="card-body">
                        <h5 className="card-title">Name: {user.user.firstName} {user.user.lastName}</h5>
                        <p className="card-text">Email: {user.user.email}</p>
                        <p className="card-text">Phone: {user.profile?.phone}</p>
                        {showMore && (
                            <div>
                                <p className="card-text">Skills: {user.profile.skills?.join(', ')}</p>
                                <p className="card-text">Experience: {user.profile.experience}</p>
                                <p className="card-text">Education: {user.profile.education}</p>

                                {/* {user.profile.resume && (
                                    <div>
                                        <p className="card-text">Resume:</p>
                                        <a href="#" onClick={}>View Resume</a>
                                    </div>
                                )} */}


                            </div>
                        )}
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={handleShowMoreClick}>
                                {showMore ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
            {show && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <JobSeekerProfileForm toggle={toggle} user={userInfo}/>
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>
    )
}

export default ProfileJobSeeker;
