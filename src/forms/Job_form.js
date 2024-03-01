import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import * as Yup from 'yup'
import { startCreateJob, startEditJobPost } from '../action/jodPostAction'
import { startGetAllCompanyDtls, startGetCompanyDtls } from '../action/companyAction'
import { startGetUserInfo } from '../action/userAction'

const JobForm = (props) => {
    const { job } = props
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [requirements, setRequirements] = useState('')
    const [location, setLocation] = useState('') 
    const [salary, setSalary] = useState('') 
    const [companyId, setCompanyId] = useState('') 
    const [toggle, setToggle] = useState(false)
    const [errors, setErrors] = useState({}) 
    const [err, setErr] = useState(Boolean)
    const dispatch = useDispatch() 

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        location: Yup.string().required('Location is required'),
        companyId: Yup.string().required('Select Company')
    }) 

    useEffect(() => {
        dispatch(startGetUserInfo())
    }, [])
    const user = useSelector(state => state.user.data)
    useEffect(() => {
        if (user?.user?.role === 'admin') {
            dispatch(startGetAllCompanyDtls())
        } else if (user?.user?.role === 'employer') {
            dispatch(startGetCompanyDtls()) 
        }
    }, [user])
    useEffect(() => {
        if (job) {
            setTitle(job.title || '') 
            setDescription(job.description || '') 
            setRequirements(job.requirements || '') 
            setLocation(job.location || '') 
            setSalary(job.salary || '') 
            setCompanyId(job.company_id._id || '')

            setId(job._id)
        }
    }, [props.job])
    const company = useSelector(state => state.company.data) 
    const handleChange = (e) => {
        const { name, value } = e.target
        // Clear the error for the changed input field
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        switch (name) {
            case 'title':
                setTitle(value)
                break
            case 'description':
                setDescription(value)
                break
            case 'requirements':
                setRequirements(value.split("\n"))
                break
            case 'location':
                setLocation(value)
                break
            case 'salary':
                setSalary(value)
                break
            case 'companyId': // Handle change for company dropdown
                setCompanyId(value)
                break
            default:
                break
        }
    }
    const toggleError = (data) => {
        setErr(data)
    }

    useEffect(() => {
        if (err === true) {
            // If successful, reset errors and toggle the form
            props.toggle()
        }
    }, [err])
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
        const formData = { title, description, requirements, location, salary, companyId }
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            if (job) {
                dispatch(startEditJobPost(id, formData, handleToggle))
            } else {
                dispatch(startCreateJob(formData, handleToggle))
            }
        } catch (validationErrors) {
            const errors = {}
            validationErrors.inner?.forEach(error => {
                errors[error.path] = error.message
            })
            setErrors(errors)
        }

    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" id="title" name="title" value={title} onChange={handleChange} invalid={!!errors.title} />
                {errors.title && <div className="text-danger">{errors.title}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" id="description" name="description" value={description} onChange={handleChange} invalid={!!errors.description} />
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="requirements">Requirements</Label>
                <Input type="text" id="requirements" name="requirements" value={requirements} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="location">Location</Label>
                <Input type="text" id="location" name="location" value={location} onChange={handleChange} invalid={!!errors.location} />
                {errors.location && <div className="text-danger">{errors.location}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="salary">Salary</Label>
                <Input type="number" id="salary" name="salary" value={salary} onChange={handleChange} invalid={!!errors.salary} />
                {errors.salary && <div className="text-danger">{errors.salary}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="companyId">Company</Label>
                <Input type="select" id="companyId" name="companyId" value={companyId} onChange={handleChange} invalid={!!errors.companyId}>
                    <option value="">Select Company</option>
                    {company && company?.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </Input>
                {errors.companyId && <div className="text-danger">{errors.companyId}</div>}
            </FormGroup>
            {job ? <Button type='submit' color='primary'>Upadate</Button> : <Button type="submit" color="primary">Submit</Button>}
        </Form>
    )
}

export default JobForm
