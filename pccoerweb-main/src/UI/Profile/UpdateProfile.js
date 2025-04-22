import React from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

class UpdateProfile extends React.Component {
  componentDidMount(){
    firebase.firestore().collection("users")
    .doc(sessionStorage.getItem("user"))
    .onSnapshot((snapshot)=>{
      const data=snapshot.data()
      this.setState({username:data.username,name:data.name,branch:data.branch,bio:data.bio,website:data.website,img:data.profile_pic})
    })
  }

  constructor(props){
    super(props)
    this.state={
      //user:[],
      username:"",
      name:"",
      branch:"",
      bio:"",
      img:"",
      new_pic:'',
      website:"",
      error:""
    }
  }
  render() {
    const update=async(e)=>{
      e.preventDefault()

      if(this.state.new_pic){
        const imgUrl = `profile/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const fileMetaData = { contentType: 'image/jpeg' };
    
        const task = firebase.storage().ref(imgUrl)
        const uploadTask = task.put(this.state.new_pic,fileMetaData);
        uploadTask.on("state_changed",console.log(),console.error(),()=>{
            task.getDownloadURL()
            .then((link)=>{
                console.log(link)
                this.setState({"img":link})
                console.log("Profile uploaded");
                firebase.firestore()
                .collection('users')
                .doc(sessionStorage.getItem("user"))
                .update(
                    {
                        uid:firebase.auth().currentUser.uid,
                        profile_pic: this.state.img,
                        username: this.state.username,
                        name: this.state.name,
                        bio: this.state.bio,
                        website:this.state.website,
                        branch:this.state.branch
                    }
                )
                .then(function () {
                    console.log("Data Updated");
                }
                )
            })
        })
    
    }
    else{
      console.log(this.state)
        var err=await firebase.firestore()
        .collection('users')
        .doc(sessionStorage.getItem("user"))
        .update(
            {
                uid:firebase.auth().currentUser.uid,
                profile_pic: this.state.img,
                username: this.state.username,
                name: this.state.name,
                bio: this.state.bio,
                website:this.state.website,
                branch:this.state.branch
            }
        )
        .then(function(){
            console.log("Data Updated");
             return "Data Updated"
        }
        )
        this.setState({error:err})
}
}
      return (
      <div>
        <a
            className=" col m-3 px-5 py-2 btn btn-primary"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
        >
        EDIT
        </a>
  <div
    className="offcanvas offcanvas-start bg-dark"
    tabIndex={-1}
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasExampleLabel">
        Update Profile
      </h5>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>
    </div>
    {this.state.error==="Data Updated" ?
        <>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </symbol>
                <symbol
                id="exclamation-triangle-fill"
                fill="currentColor"
                viewBox="0 0 16 16"
                >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
            </svg>
            <div className="alert alert-success d-flex align-items-center" role="alert">
                <svg
                className="bi flex-shrink-0 me-1"
                width={24}
                height={24}
                role="img"
                aria-label="Success:"
                >
                <use xlinkHref="#check-circle-fill" />
                </svg>
                <div>{this.state.error}</div>
            </div>
            </>
      :''
       }
    <div className="offcanvas-body row">
      <div className="col-10 col-lg-10 m-auto">
      <form onSubmit={update}>
                <div className="text-center">
                <img className="m-auto rounded-circle" src={this.state.img} height={100} width={100} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="file" accept=".jpg,.gif,.png" 
                    onChange={event=>this.setState({new_pic:event.target.files[0]})}
                    />
                </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" id="Username"
                    value={this.state.username}
                    onChange={(event) => this.setState({ username: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name"
                    value={this.state.name}
                    onChange={(event) => this.setState({ name: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Branch</label>
                    <input type="text" className="form-control" id="Branch"
                    value={this.state.branch}
                    onChange={(event) => this.setState({ branch: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <input type="text" className="form-control" id="bio"
                    value={this.state.bio}
                    onChange={(event) => this.setState({ bio: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input type="text" className="form-control" id="Branch"
                    value={this.state.website}
                    onChange={(event) => this.setState({ website: event.target.value })}
                     />
                  </div>
                  
                  <div className="text-center">
                  <button disabled={this.state.loading} type="submit" className="btn btn-primary my-2 mx-5 px-5 py-2">Update</button>
                  <div className="row">
                    <div className=" col-10">
                    <Link className="m-3 px-5 btn btn-primary" to="/forgetpassword" >Reset Password</Link>
                    </div>
                    </div>
                  </div>
                </form>
      </div>
    </div>
  </div>

            
    </div>
      )
    }
  }
  export default UpdateProfile

