import { toast } from "react-toastify";
import axios from "../axios_config/axios";
import reactRouterDom from "react-router-dom";

export const SET_COMPANY = 'SET_COMPANY'
export const GET_COMPANY = 'GET_COMPANY'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const setCompanyDetails = (data) => {
    return {
        type: SET_COMPANY,
        payload: data
    };
};

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

export const startCreateCompany = (data, toggle) => {
    return async (dispatch) => {
        try {
            const result = await axios.post('/api/company/create', data, { headers: { 'Authorization': localStorage.getItem('token') } });
            if (result.data) {
                dispatch(setCompanyDetails(result.data));
                toggle()
                toast.success(result.data.message,{ autoClose: 1000 });
                dispatch(clearError());
            }
        } catch (error) {
            console.error(error);
            dispatch(setError('Failed to create company'));
            toast.error('Failed to create company. Please try again.',{autoClose:1000});
        }
    };
};

//employer company details
export const setCompany = (data) => {
    return {
        type: GET_COMPANY,
        payload: data
    };
};

export const startGetCompanyDtls = () => {
    return async (dispatch) => {
        try {
            const result = await axios.get('/api/company/details', { headers: { "Authorization": localStorage.getItem('token') } });
            dispatch(setCompany(result.data));
            dispatch(clearError()); // Clear any previous errors
        } catch (error) {
            console.error(error);
            dispatch(setError('Failed to fetch company details'));
            toast.error('Failed to fetch company details. Please try again.',{autoClose:1000});
        }
    };
}

//get all company details by admin
export const startGetAllCompanyDtls = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.get('/api/company/details/admin', { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (result.data) {
                        dispatch(setCompany(result.data))
                        dispatch(clearError())
                    }
                } catch (error) {
                    dispatch(setError('error'))
                }
            }

        )()
    }
}