import { combineReducers } from "redux";
import user from "./user";

const rootReducers =combineReducers({
    userState:user,
})

export default rootReducers;