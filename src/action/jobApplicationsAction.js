import { toast } from "react-toastify";
import axios from "../axios_config/axios";

export const SET_JOB_APPLICATION = 'SET_JOB_APPLICATION'
export const GET_JOB_APPLICATION = 'GET_JOB_APPLICATION'
export const SET_ERROR = "SET_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const UPDATE_STATUS='UPDATE_STATUS'

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};

export const setJobApplication = (data) => {
    return {
        type: GET_JOB_APPLICATION,
        payload: data
    }
}
//GET DATA FROM SERVER
export const startGetAppliedJodApplication = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/jobseeker/application', { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setJobApplication(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError('error'))
                }
            }
        )()
    }
}

export const setTotalCount = (data) => {
    return {
        type: SET_TOTAL_COUNT,
        payload: data
    }
}
//GET DATA FROM SERVER
export const startGetEmployeJobApplication = (currentPage, pageLimit) => {
    return async (dispatch) => {
        try {
            const result = await axios.get(`/api/employe/application?page=${currentPage}&limit=${pageLimit}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            if (result.data) {
                dispatch(setJobApplication(result.data))
                dispatch(setTotalCount(result.data.totalCount))
                dispatch(clearError())
                return result.data
            }
        } catch (error) {
            dispatch(setError('error'))
            throw error; // Rethrow the error to handle it in the component
        }
    }
}

//post
export const setJobApplicationPost = (data) => {
    return {
        type: SET_JOB_APPLICATION,
        payload: data
    }
}
//sending data to server
export const startPostJboApplication = (data, toggle) => {
    console.log(data);
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post('/api/jobseeker/jobApplication', data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setJobApplicationPost(result.data))
                        toggle()
                        dispatch(clearError())
                        toast.success('Applied Successfully',{autoClose:1000})
                    }
                } catch (error) {
                    dispatch(setError('Failed to Job Application try again...'))
                }
            }
        )()
    }
}
//admin
export const startGetAllJobApplications = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/all/application', { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setJobApplication(result.data))
                    }
                } catch (error) {
                    dispatch(setError('error'))
                }
            }
        )()
    }
}

//GET APPLICATION ON ID
export const startGetApplicationId = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get(`/api/employer/view/application/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setJobApplication(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError('error occured in finding application'))
                }
            }
        )()
    }
}

//UPDATE STATUS BY EMPLOYER
export const setUpdateStatus=(data)=>{
    return{
        type:UPDATE_STATUS,
        payload:data
    }
}

export const  start_Update_Status_Application = (id,status) => {
    
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post(`/api/employer/application/${id}`,{status}, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setUpdateStatus(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError('error occured in finding application'))
                }
            }
        )()
    }
}