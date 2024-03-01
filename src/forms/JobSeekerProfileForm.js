import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import * as Yup from 'yup'
import { startUpdateJobseekerProfile } from '../action/userAction'

const JobSeekerProfileForm = (props) => {
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
            const { phone, address, education, experience, skills } = props.user.profile
            setPhone(phone || '')
            setAddress(address || '')
            setEducation(education || '')
            setExperience(experience || '')
            setSkills(skills ? skills.join(', ') : '')
            // Set resume file if it exists
            if (props.user.profile.resume) {
                // Create a Blob object from the resume data
                const resumeBlob = new Blob([new Uint8Array(props.user.profile.resume.data)], { type: props.user.profile.resume.contentType });
                // Create a File object from the Blob
                const resumeFile = new File([resumeBlob], 'resume', { type: props.user.profile.resume.contentType });
                setResume(resumeFile);
            }
        }
    }, [props.user])

    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
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
            props.toggle()
            setErrors({})
        }
    }, [toggle])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = { skills, phone, address, education, experience, resume }
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            console.log(formData)
            // Handle form submission, e.g., send data to backend
            dispatch(startUpdateJobseekerProfile(formData, handleToggle))
            setErrors({})
            props.toggle()
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
