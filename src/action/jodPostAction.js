import { toast } from "react-toastify"
import axios from "../axios_config/axios"
import { Toast } from "reactstrap"

export const SET_JOB = 'SET_JOB'
export const GET_JOB = 'SET_GET_JOB'
export const SET_ERROR = "SET_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"
export const SET_DELETE = 'SET_DELETE'
export const EDIT_JOBPOST = 'EDIT_JOBPOST'

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


export const setJobCreate = (data) => {
    return {
        type: SET_JOB,
        payload: data
    }
}

export const startCreateJob = (data, toggle) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post('/api/job/create', data, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setJobCreate(result.data))
                    toggle()
                    toast.success('Job Post Created successfully',{ autoClose: 1000 })
                    dispatch(clearError());
                } catch (error) {
                    dispatch(setError('Failed to create job')); // Dispatch error action
                }
            }
        )()
    }
}

export const setJobs = (data) => {
    return {
        type: GET_JOB,
        payload: data
    }
}

export const startGetEmployesJob = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/employes/jobs', { headers: { "Authorization": localStorage.getItem('token') } })
                    dispatch(setJobs(result.data))
                    dispatch(clearError()); // Clear any previous errors
                } catch (error) {
                    dispatch(setError('Failed to get employee jobs')); // Dispatch error action
                }
            }
        )()
    }
}



export const startGetSelectedJob = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get(`/api/employes/job/${id}`, { headers: { "Authorization": localStorage.getItem('token') } })
                    dispatch(setJobs(result.data))
                    dispatch(clearError()); // Clear any previous errors
                } catch (error) {
                    dispatch(setError('Failed to get selected job')); // Dispatch error action
                }
            }
        )()
    }
}
//Get all Job posts for admin,jobseeker
export const startGetJobs = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/jobs/all', { headers: { "Authorization": localStorage.getItem("token") } })
                    if (result.data) {
                        dispatch(setJobs(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError('Error to featch jobs'))
                }
            }
        )()
    }
}

export const startSearchJobPost = (searchTerm) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get(`/api/jobs/search?searchTerm=${searchTerm}`, { headers: { "Authorization": localStorage.getItem("token") } })
                    if (result.data) {
                        dispatch(setJobs(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError("Error in Searching Jobs"))
                }
            }
        )()
    }
}

export const startSortByDateJobPost = (filter) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get(`/api/jobs/sort?filter=${filter}`, { headers: { "Authorization": localStorage.getItem("token") } })
                    if (result.data) {
                        dispatch(setJobs(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError("Error Occured in Sorting Jobs"))
                }
            }
        )()
    }
}

//DELETE JOB POST admin
export const setDeleteJobPost = (data) => {
    return {
        type: SET_DELETE,
        payload: data
    }
}

export const startDeleteJobPost = (id, isDelete) => {

    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post(`/api/admin/delete/job/post/${id}`, { isDelete }, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setDeleteJobPost(result.data))
                        dispatch(clearError())
                        toast.success('Job post deleted successfully',{ autoClose: 1000 })
                    }
                } catch (error) {
                    dispatch(setError('error'))
                }
            }
        )()
    }
}
//EDIT JOB POST admin
export const setEditJobPost = (data) => {
    return {
        type: EDIT_JOBPOST,
        payload: data
    }
}

export const startEditJobPost = (id, formData, handleToggle) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.post(`/api/admin/edit/job/post/${id}`, formData, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setEditJobPost(result.data))
                        dispatch(clearError())
                        handleToggle()
                        toast.success('Success Fully Updated', { autoClose: 1000 })
                    }
                } catch (error) {
                    console.log(error);
                    dispatch(setError('error'))
                }
            }
        )()
    }
}
// export const startGetAllJobs=()=>{
//     return(dispatch)=>{
//         (
//             async()=>{
//                 try {
//                     const result=await axios.get('/api/admin/get/allJobPost',{headers:{'Authorization':localStorage.getItem('token')}})
//                     if (result.data) {
//                         dispatch(setJobs(result.data))
//                         dispatch(clearError())
//                     }
//                 } catch (error) {
//                     setError('error occured in feaching jobs')
//                 }
//             }
//         )()
//     }
// }