import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { startGetUserInfo } from '../action/userAction'
import { startPostJboApplication } from '../action/jobApplicationsAction'


const ApplicationForm = (props) => {
    const [jobId, setJobId] = useState()
    const [applicantId, setApplicantId] = useState()
    const [resume, setResume] = useState(null)
    const [email, setEmail] = useState()
    const [status, setStatus] = useState('pending')
    const [phone, setPhone] = useState()
    const [errors, setErrors] = useState({})
    const [companyId, setCopanyID] = useState()
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetUserInfo())
    }, [])
    const data = useSelector(state => state.user.data)
    useEffect(() => {
        if (data) {
            setPhone(data.profile?.phone || '')
            setEmail(data.user?.email || '')
            setResume(data.profile?.resume || '')
            setJobId(props?.jobId || '')
            setCopanyID(props?.companyId._id || '')
            setApplicantId(data.user?._id)

        }
    }, [data])
    const handleChange = (e) => {
        const { name, value,files } = e.target
        // Clear the error for the changed input field
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        switch (name) {
            case 'phone':
                setPhone(value)
                break
            case 'email_id':
                setEmail(value)
                break
            case 'resume':
                setResume(files[0])
                break
            default:
                break
        }
    }
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setResume(file);
    // }

    const handleToggle = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
        if (toggle) {
            props.toggle()
            setErrors({})
        }
    }, [toggle])
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            job_id: jobId,
            phone: phone,
            applicant_id: applicantId,
            resume: resume,
            status: status,
            company_Id: companyId
        }
        console.log(formData.resume);
        const schema = Yup.object().shape({
            phone: Yup.string()
                .required('Job ID is required')
        })

        try {
            await schema.validate(formData, { abortEarly: false })
            // Form is valid, submit the data
            dispatch(startPostJboApplication(formData, handleToggle))

        } catch (error) {
            const validationErrors = {}
            error.inner?.forEach(err => {
                validationErrors[err.path] = err.message
            })
            setErrors(validationErrors)
        }
    }

    return (
        <div className='container'>
            <div className="card shadow">
                <div className="card-body">
                    <h3>Contact info</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h3>{data.user?.firstName} {data.user?.lastName} </h3>
                            {data?.profile?.skills.map((e, i) => <p key={i} className='fs-5'>{e}</p>)}
                            {<p className='mt--3'>{data?.profile?.address}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email_id" className="form-label">Email address*</label>
                            <input type="email" className="form-control" name="email_id" disabled value={email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Mobile Number*</label>
                            <input type="text" className="form-control" name="phone" value={phone} onChange={handleChange} />
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="resume" className="form-label">resume</label>
                            <div className='card'>
                                <div className="card-body">

                                    <button type='button' className='btn  btn-primary' style={{ marginLeft: "284px" }}>
                                        <a href={`http://localhost:3096/${resume}`} download style={{ textDecoration: "none", color: "black" }}>
                                            View Resume
                                        </a>
                                    </button>


                                </div>
                            </div>
                            <input type="file" className="form-control mt-3" name="resume" onChange={handleChange} />
                        </div>
                        <button className="btn btn-primary mr-6">Apply</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ApplicationForm
