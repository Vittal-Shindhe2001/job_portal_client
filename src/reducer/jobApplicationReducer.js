import { GET_JOB_APPLICATION, SET_JOB_APPLICATION, SET_ERROR, CLEAR_ERROR, SET_TOTAL_COUNT, UPDATE_STATUS } from "../action/jobApplicationsAction";

const initialState = { error: "", data: [], totalCount: 0 }

const jobApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOB_APPLICATION: {
            return { ...state, data: [...state.data, action.payload] }
        }
        case GET_JOB_APPLICATION: {
            return { ...state, data: action.payload }
        }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case SET_ERROR: {
            return { ...state, error: action.payload }
        }
        case CLEAR_ERROR: {
            return { ...state, error: '' }
        }
        case UPDATE_STATUS: {
            const edit = state.data.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                } else {
                    return { ...ele }
                }
            })
            return { ...state, data: edit }
        }
        default: {
            return { ...state }
        }

    }
}

export default jobApplicationReducer