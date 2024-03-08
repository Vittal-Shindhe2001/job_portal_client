import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { startCreateCompany } from '../action/companyAction'

export default function CompanyForm(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [industry, setIndustry] = useState('')
    const [size, setSize] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()


    // Form validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Company name is required'),
        description: Yup.string(),
        industry: Yup.string().required('Industry is required'),
        size: Yup.string(),
        website: Yup.string().url('Invalid URL'),
        location: Yup.string().required('Location is required'),
        email: Yup.string().email('Invalid email address')// Validation for email field
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        // Clear the error for the changed input field
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'description':
                setDescription(value)
                break
            case 'industry':
                setIndustry(value)
                break
            case 'size':
                setSize(value)
                break
            case 'website':
                setWebsite(value)
                break
            case 'location':
                setLocation(value)
                break
            case 'email':
                setEmail(value)
                break
            default:
                break
        }
    }
    const handleToggle = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
        if (toggle) {
            props.toggle()
            setErrors({})
            props.handleUseEffect()
        }
    }, [toggle])
    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = { name, email, description, industry, size, website, location }
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            // Handle form submission, e.g., send data to backend
            dispatch(startCreateCompany(formData,handleToggle))
            // Clear errors if any
            // setErrors({})
            // props.toggle()
            // props.handleUseEffect()
        } catch (validationErrors) {
            const errors = {}
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message
            })
            setErrors(errors)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={description} onChange={handleChange}></textarea>
                    {errors.description && <p className="text-danger">{errors.description}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="industry" className="form-label">Industry</label>
                    <input type="text" className="form-control" id="industry" name="industry" value={industry} onChange={handleChange} />
                    {errors.industry && <p className="text-danger">{errors.industry}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="size" className="form-label">Size</label>
                    <input type="text" className="form-control" id="size" name="size" value={size} onChange={handleChange} />
                    {errors.size && <p className="text-danger">{errors.size}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input type="text" className="form-control" id="website" name="website" value={website} onChange={handleChange} />
                    {errors.website && <p className="text-danger">{errors.website}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={location} onChange={handleChange} />
                    {errors.location && <p className="text-danger">{errors.location}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
