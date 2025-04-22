import firebase from "firebase"

const CheckLogin=async(data)=> {
    let err;
    const { email, password } = data;
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((results) => {
           console.log(results)
           const user=firebase.auth().currentUser
           console.log(user.emailVerified)
           if(user.emailVerified){
           sessionStorage.setItem("user",user.uid)
           sessionStorage.setItem("token",user.refreshToken)
            err="Login"
           }
           else{
               user.sendEmailVerification(()=>{
                console.log("Verify Your Email ..")
               })
               err="Verify Your Email .."
           }
        })
        .catch((error) => {
            if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                err="No User Found";
                //setLoading(false)
            }
            else if (error.message === "The email address is badly formatted.") {
                err="Please enter valid mail"
            }
            else {
                console.log(error.message)
                err=error.message;
                //setLoading(false)
            }
        })
        return err;
}

export default CheckLogin;