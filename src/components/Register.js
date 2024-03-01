import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { startRegisterUser } from '../action/userAction';
const RegistrationContext = createContext();

export default function Register() {
    const [userType, setUserType] = useState('jobseeker')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [errors, setErrors] = useState({})
    const firstNameRef = useRef(null)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        firstNameRef.current.focus()
    }, [userType])

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value)
    }

    const jobSeekerSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const employerSchema = Yup.object().shape({
        firstName: Yup.string().required('Employer name is required'),
        lastName: Yup.string().required('Employer last name is required'),
        companyName: Yup.string().required('Company name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });
    const reset = () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
        setCompanyName(userType === "employer" ? '' : companyName)
    }
    useEffect(() => {
        reset()
    }, [userType])
    const handleSubmit = async (e) => {
        e.preventDefault();

        let schema;
        if (userType === 'jobseeker') {
            schema = jobSeekerSchema;
        } else {
            schema = employerSchema;
        }

        try {
           
            await schema.validate({
                firstName,
                lastName,
                companyName,
                email,
                password,
            }, { abortEarly: false });

            // If validation passes, you can proceed with form submission
            const formData = {
                firstName,
                lastName,
                ...(userType === "employer" && { companyName }),
                email,
                password,
                role: userType
            };
            // Dispatch action or submit the form data
            dispatch(startRegisterUser(formData,reset,history))
            console.log(formData);
        } catch (errors) {
             // Handle validation errors
        if (errors && errors.inner) {
            const errorsObject = {};
            errors.inner.forEach(error => {
                errorsObject[error.path] = error.message;
            });
            setErrors(errorsObject);
        } else {
            console.error('Validation error:', errors);
        }
        }

    }



    return (
        <RegistrationContext.Provider value={{ userType, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, companyName, setCompanyName, firstNameRef, handleSubmit, errors, setErrors }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Register</h5>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="me-3">Select User Type:</label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="jobseeker"
                                            value="jobseeker"
                                            checked={userType === 'jobseeker'}
                                            onChange={handleUserTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="jobseeker">
                                            Job Seeker
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="employer"
                                            value="employer"
                                            checked={userType === 'employer'}
                                            onChange={handleUserTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="employer">
                                            Employer
                                        </label>
                                    </div>
                                </div>
                                {userType === 'jobseeker' && <JobSeekerRegistrationForm />}
                                {userType === 'employer' && <EmployerRegistrationForm />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RegistrationContext.Provider>
    )

}

function JobSeekerRegistrationForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { firstNameRef, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, handleSubmit, errors, setErrors } = useContext(RegistrationContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        if (errors.firstName) {
            setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
        }
    }

    const handlelastNameChange = (e) => {
        setLastName(e.target.value);
        if (errors.lastName) {
            setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prevErrors => ({ ...prevErrors, email: '' }));
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input ref={firstNameRef} value={firstName} onChange={handleFirstNameChange} type="text" className="form-control" placeholder="First Name" />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
                <input type="text" value={lastName} onChange={handlelastNameChange} className="form-control" placeholder="Last Name" />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
                <input type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <input type={passwordVisible ? "text" : "password"} value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
                    <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Register</button>
        </form>

    )
}

function EmployerRegistrationForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { firstNameRef, firstName, setFirstName, lastName, setLastName, companyName, setCompanyName, email, setEmail, password, setPassword, handleSubmit, errors, setErrors } = useContext(RegistrationContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        if (errors.firstName) {
            setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
        }
    }

    const handlelastNameChange = (e) => {
        setLastName(e.target.value);
        if (errors.lastName) {
            setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));
        }
    }
    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
        if (errors.companyName) {
            setErrors(prevErrors => ({ ...prevErrors, companyName: '' }));
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prevErrors => ({ ...prevErrors, email: '' }));
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input ref={firstNameRef} type="text" value={firstName} onChange={handleFirstNameChange} className="form-control" placeholder="Employer Name" />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
                <input type="text" value={lastName} onChange={handlelastNameChange} className="form-control" placeholder="Employer Last Name" />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
                <input type="text" value={companyName} onChange={handleCompanyNameChange} className="form-control" placeholder="Company Name" />
                {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
            </div>
            <div className="mb-3">
                <input type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <input type={passwordVisible ? "text" : "password"} value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
                    <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Register</button>
        </form>
    )
}
