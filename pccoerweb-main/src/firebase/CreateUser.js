import firebase from "firebase"
require('firebase/firestore')

 const CreateUser=(props)=> {
    console.log(props);
    let err=''
         const { username, name,email, password1 ,error,loading } = props;
         console.log(username, name,email, password1,error,loading)
        
        err= firebase.auth().createUserWithEmailAndPassword(email, password1)
              .then((usercredential) => {
                // Create the user 
                const user=firebase.auth().currentUser
                console.log("Somethis is going on - ")
                 firebase.firestore().collection("users")
                      .doc(firebase.auth().currentUser.uid)
                      .set(
                          {
                              uid:firebase.auth().currentUser.uid,
                              profile_pic: "https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fprofile.png?alt=media&token=20ea9a22-db9b-421f-a48c-8d379cf23bee",
                              email: email,
                              username: username,
                              name: name,
                              bio: "",
                              website: "",
                          }
                      )
                 console.log(user)
                 user.sendEmailVerification().then(()=>{
                     console.log("Check email")
                 })
                 console.log(firebase.auth().currentUser.emailVerified)
                 //return "Account Created"
                return "Please Verify your Email.."
              })
          .catch((error) => {
             console.log(error.message)
             return error.message
           }) 
           return err;
        }

export default CreateUser;