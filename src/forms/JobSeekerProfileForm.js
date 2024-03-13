import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import * as Yup from 'yup'
import { startUpdateJobseekerProfile } from '../action/userAction'

const JobSeekerProfileForm = (props) => {
    console.log(props.user);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [resume, setResume] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [errors, setErrors] = useState({})
    //if user info there set to state variable
    useEffect(() => {
        if (props.user) {
            const { firstName, lastName, email } = props.user.user
            setFirstName(firstName || '')
            setLastName(lastName || '')
            setEmail(email || '')

            if (props.user.profile) {
                const { phone, address, education, experience, skills } = props.user.profile
                setPhone(phone || '')
                setAddress(address || '')
                setEducation(education || '')
                setExperience(experience || '')
                setSkills(skills ? skills.join(', ') : '')
                // Set resume file if it exists
                if (props.user.profile.resume) {
                    // Create a Blob object from the resume data
                    const resumeBlob = new Blob([new Uint8Array(props.user.profile.resume.data)], { type: props.user.profile.resume.contentType })
                    // Create a File object from the Blob
                    const resumeFile = new File([resumeBlob], 'resume', { type: props.user.profile.resume.contentType })
                    setResume(resumeFile)
                }
            }
        }
    }, [props.user])

    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        education: Yup.string().required('Education details are required'),
        experience: Yup.string().required('Experience details are required'),
        skills: Yup.string().required('Skills is required'),
        resume: Yup.mixed().test('fileRequired', 'Resume is required', (value) => {
            return !!value
        })
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        // Clear the error for the changed input field
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        switch (name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'phone':
                setPhone(value)
                break
            case 'address':
                setAddress(value)
                break
            case 'education':
                setEducation(value)
                break
            case 'experience':
                setExperience(value)
                break
            case 'skills':
                setSkills(value)
                break
            case 'resume':
                setResume(value)
                break
            default:
                break
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setResume(file)
    }
    const handleToggle = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
        if (toggle) {
            props.callBack()
            props.toggle()
            setErrors({})
        }
    }, [toggle])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = { skills, phone, address, education, experience, resume, firstName, lastName, email }
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            // Handle form submission, e.g., send data to backend
            dispatch(startUpdateJobseekerProfile(formData, handleToggle))
            // setErrors({})
            // props.toggle()
            // props.callBack()
        } catch (validationErrors) {
            const errors = {}
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message
            })
            setErrors(errors)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange} invalid={!!errors.firstName} />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange} invalid={!!errors.lastName} />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" id="email" name="email" value={email} onChange={handleChange} invalid={!!errors.email} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" id="phone" name="phone" value={phone} onChange={handleChange} invalid={!!errors.phone} />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" id="address" name="address" value={address} onChange={handleChange} invalid={!!errors.address} />
                {errors.address && <div className="text-danger">{errors.address}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="education">Education</Label>
                <Input type="textarea" id="education" name="education" value={education} onChange={handleChange} invalid={!!errors.education} />
                {errors.education && <div className="text-danger">{errors.education}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="experience">Experience</Label>
                <Input type="textarea" id="experience" name="experience" value={experience} onChange={handleChange} invalid={!!errors.experience} />
                {errors.experience && <div className="text-danger">{errors.experience}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="skills">Skills</Label>
                <Input type="textarea" id="skills" name="skills" value={skills} onChange={handleChange} />
                {errors.skills && <div className="text-danger">{errors.skills}</div>}
            </FormGroup>
            <FormGroup>
                <Label for="resume">Resume</Label>
                <Input type="file" id="resume" name="resume" onChange={handleFileChange} />
                {errors.resume && <div className="text-danger">{errors.resume}</div>}
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </Form>
    )
}

export default JobSeekerProfileForm
