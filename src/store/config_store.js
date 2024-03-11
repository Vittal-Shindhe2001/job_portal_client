import { applyMiddleware } from "redux";
import { createStore, combineReducers } from "redux";
import thunk from 'redux-thunk';
import userReducer from "../reducer/userReducer";
import companyReducer from "../reducer/companyReducer";
import jobReducer from "../reducer/jobReducer";
import jobApplicationReducer from "../reducer/jobApplicationReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
const configStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        company: companyReducer,
        job: jobReducer,
        applications: jobApplicationReducer
    }), composeWithDevTools(applyMiddleware(thunk)))
    return store
}

export default configStore