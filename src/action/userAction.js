import axios from "../axios_config/axios"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
export const SET_USER = "SET_USER"
export const EDIT_USER = 'EDIT_USER'

export const startRegisterUser = (data, reset, history) => {
    return (dispatch) => {
        (async () => {

            try {
                const result = await axios.post("/api/user/regist", data);
                if (result.data.message === "Email alredy exist") {
                    toast.error(result.data.message)
                } else {
                    // Show success notification
                    toast.success('Registration successful!',{ autoClose: 1000 });
                    // Reset form after successful registration
                    reset();
                    // Redirect to another route using history
                    history.push('/login');
                }
            } catch (error) {
                // Show error notification
                toast.error('Registration failed. Please try again later.');
                // Handle error (e.g., show an alert)
                console.error('Registration error:', error);
            }
        })()
    }
};
const setUserInfo = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const startGetUserInfo = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/user/info', { headers: { 'Authorization': localStorage.getItem("token") } })
                    if (result.data) {
                        dispatch(setUserInfo(result.data))
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }
}

export const startLoginUser = (data, history, setIsSubmitting, reset) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post("/api/user/login", data)
                    localStorage.setItem('token', result.data.token)
                    setIsSubmitting(true)
                    if (localStorage.getItem('token') !== 'undefined') {
                        dispatch(startGetUserInfo(result.data.token))
                        reset()
                        toast.success('Login Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                        });
                        history.push('/')
                    } else {
                        // alert('Please Enter valid email or password')
                        toast.error('Please Enter valid email or password', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                        });
                        localStorage.clear('/')
                    }
                } catch (error) {
                    toast.error('Please Enter valid email or password',{autoClose:1000})
                }
            }
        )()
    }
}

export const startGetAllUserInfo = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/user/list', { headers: { 'Authorization': localStorage.getItem("token") } })
                    if (result.data) {
                        dispatch(setUserInfo(result.data))
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }
}

export const setEditUser = (data) => {
    return {
        type: EDIT_USER,
        payload: data
    }
}

export const startEditUser = (data) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.put('/api/user/edit', data, { headers: { 'Authorization': localStorage.getItem("token") } })
                    dispatch(setEditUser(result.data))
                } catch (error) {            
                    console.log(error);
                }
            }
        )()
    }
}

export const startUpdateJobseekerProfile=(data,toggle)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const result=await axios.put('/api/jobseeker/profileup',data,{headers:{'Content-Type': 'multipart/form-data','Authorization':localStorage.getItem('token')}})
                    if (result.data) {
                        toggle()
                        toast.success(result.data.message,{autoClose:1000})
                    }
                } catch (error) {
                    console.log(error.details);
                }
            }
        )()
    }
}