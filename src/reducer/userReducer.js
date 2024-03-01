import { EDIT_USER, SET_USER } from "../action/userAction"

const initial = { error: "", data: {}}

const userReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_USER:{
            return{...state,data:action.payload}
        }
        case EDIT_USER:{
            return {...state,data:{...state.data,...action.payload}}
        }
        default: {
            return { ...state }
        }


    }
}

export default userReducer