import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as Yup from 'yup';
import { startLoginUser } from '../action/userAction';


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setErrors] = useState({})
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // button disabled
    const history = useHistory()
    const dispatch = useDispatch()
    const onfocus=useRef(null)
   
    useEffect(()=>{
    onfocus.current.focus()
    },[]
    )
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    })
    const reset = ()=> {
        setEmail('')
        setPassword('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setIsSubmitting(true); // Disable the button during submission
            //dispatch 
            dispatch(startLoginUser(formData, history, reset,setIsSubmitting))
        } catch (validationErrors) {
            const errors = {};
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" ref={onfocus} value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" placeholder="Enter email" />
                                    {error.email && <p className="text-danger">{error.email}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="Password" />
                                        <button type="button"  disabled={isSubmitting}  className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                                        </button>
                                        {error.password && <p className="text-danger">{error.password}</p>}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}
