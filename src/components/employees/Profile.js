import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import CompanyForm from '../../forms/Company_form';
import { useDispatch, useSelector } from 'react-redux';
import { startGetCompanyDtls } from '../../action/companyAction';

const ProfileEmployee = () => {
    const [show, setShow] = useState(false)
    const [modal, setModel] = useState(false)
    const dispatch = useDispatch()
    //function to handle popover
    const toggle = () => {
        setModel(!modal)
        setShow(!show)
    }


    const handlebtn = () => {
        setShow(!show)
        toggle()

    }
    useEffect(() => {
        dispatch(startGetCompanyDtls())
    }, [])
    const company = useSelector(state => state.company.data)
    return (
        <div className="container">
            <h1>Company Profile</h1>
            <button type="button" className="btn btn-primary" onClick={handlebtn}>Create Company</button>
            <div className="card mt-2"> 
                {company.length > 0 && company?.map((ele, i) => {
                    return (
                        <div className="card-body" key={i}>
                            <h5 className="card-title">Company Name: {ele.name}</h5>
                            <p className="card-text">Email: {ele.email}</p>
                            <p className="card-text">Location: {ele.location}</p>
                            <p className="card-text">Industry: {ele.industry}</p>
                            <p className="card-text">Description: {ele.description}</p>
                            <a href={ele.website} className="card-link">Website</a>
                        </div>
                    )
                })}
            </div>
            {show && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Create Company Profile</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <CompanyForm toggle={toggle} />
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
};

export default ProfileEmployee;
