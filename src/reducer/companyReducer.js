import { CLEAR_ERROR, GET_COMPANY, SET_COMPANY, SET_ERROR } from "../action/companyAction"



const initialState = { error: "", data: [] }
const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY: {
            return { ...state, data: [...state.data, action.payload], error: '' }
        }
        case GET_COMPANY: {
            return { ...state, data: action.payload, error: "" }
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
export default companyReducer