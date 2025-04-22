import firebase from "firebase"
import { USER_STATE_CHANGE,POSTS_STATE_CHANGE } from "../constant"

export const setUser=()=>{
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(sessionStorage.getItem("user"))
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    console.log("Snap shot data", snapshot.data())
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log("Does not work ")
                }
            })
    })
}

export function fetchPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("tweets")
            .onSnapshot((snapshot) => {
                let allpost = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                console.log(allpost)
                dispatch({ type: POSTS_STATE_CHANGE, allpost })
            })
    })
}

