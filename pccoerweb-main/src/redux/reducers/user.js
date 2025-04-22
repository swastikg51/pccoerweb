import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, POSTS_STATE_CHANGE } from "../constant"

const INITIAL_STATE ={
    curretUser:null,
    allpost:[],
}

const user=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case POSTS_STATE_CHANGE:
            return{
                ...state,
                allpost:action.allpost
            }
        default:
            return state;
    }
}

export default user;