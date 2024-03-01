
import { CLEAR_ERROR, EDIT_JOBPOST, GET_JOB, SET_DELETE, SET_ERROR, SET_JOB } from "../action/jodPostAction"

const initialState = { error: "", data: [] }

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOB: {
            return { ...state, data: [...state.data, action.payload] }
        }
        case GET_JOB: {
            return { ...state, data: action.payload }
        }
        case SET_DELETE: {
            const result = state.data.filter(e => e._id !== action.payload._id)
            return { ...state, data: result }
        }
        case EDIT_JOBPOST: {
            const edit = state.data.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                } else {
                    return { ...ele }
                }
            })
            return { ...state, data: edit }
        }
        case SET_ERROR: {
            return { ...state, error: action.payload };
        }
        case CLEAR_ERROR: {
            return { ...state, error: "" };
        }

        default: {
            return { ...state }
        }

    }
}

export default jobReducer