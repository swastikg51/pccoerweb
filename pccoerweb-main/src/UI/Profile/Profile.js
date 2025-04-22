import React from "react";
import Header from "../constant/Header/Header";
import TweetCard from "../Home/cards/TweetCard";
import firebase from "firebase";
import UpdateProfile from "./UpdateProfile";
import { Link, Navigate } from "react-router-dom";
import Error from "../constant/Error";

class Profile extends React.Component {
  componentDidMount(){
    // Get Current User
    if(sessionStorage.getItem("user")){
    firebase.firestore().collection("users")
    .doc(sessionStorage.getItem("user"))
    .onSnapshot((snapshot)=>{
      this.setState({user:snapshot.data()})
    })

    // Get User Following
    firebase.firestore().collection("Following")
    .doc(sessionStorage.getItem("user"))
    .collection("userFollowing")
    .get()
    .then((snapshot)=>{
      let users=snapshot.docs.map(doc=>{
        const id=doc.id; 
        return id
    })
    this.setState({following:users.length})
  })

    firebase.firestore().collection("tweets")
    .where('uid',"==",sessionStorage.getItem("user"))
    .get().then(snapshot=>{
      let userpost = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    })
     this.setState({posts:userpost})
    })
  }
}
  constructor(){
    super()
    this.state={
      user:'',
      posts:[],
      following:0,
      logout:false
    }
    console.log(this.state.user)
  }
    render() {
      const LogOut=(e)=>{
        e.preventDefault();
        sessionStorage.clear();
        firebase.auth().signOut();
        console.log("User Signed Out !")
        this.setState({logout:true})
      }
      if(this.state.logout){
        return(<Navigate to="/login" replace={true} />)
      }
      else{
        if(!sessionStorage.getItem("user")){
          return <Error/>
        }
       else{
      return (
      <div>
      <Header/>
      <div className="container-fluid home-bg cardcss">
        <div className="container-fluid pt-5 ">
          <div className="row pt-5 pb-2">
            <div className="col-sm-12 col-lg-4 mt-3 py-2 m-auto bg-dark text-white">
              <div className="text-center">
                <img className="rounded-circle" src={this.state.user.profile_pic} height={150} width={150}/>
              </div>
              
              <div className="px-5 py-3">
                <h6 className="px-3"> Username :- <span>{this.state.user.username}</span></h6>
                <h6 className="px-5"> Name :- <span>{this.state.user.name}</span></h6>            
                <h6 className="px-5"> Branch :- <span>{this.state.user.branch}</span></h6>
                <Link className="link text-white text-decoration-none" to={`/profile/${this.state.user.uid}/userFollowing`}>
                <h6 className="px-5" > Friend :- <span>{this.state.following}</span></h6>            
                </Link>
                <h6 className="px-5"> Bio :- <span>{this.state.user.bio}</span></h6>
                <h6 className="px-5"> email :- <span>{this.state.user.email}</span></h6>
                <h6 className="px-5"> website :- <span><a href={`${this.state.user.website}`} target="_blank">{this.state.user.website}</a></span></h6>
                
                <div className="row">
                <div className="col-lg-6">
                  <UpdateProfile/>
                </div>
                <div className="col-lg-6" >
                <a className="col m-3 px-5 py-2 btn btn-primary" onClick={LogOut}>LogOut</a>
                </div>
                </div>

              </div>
            </div>
          </div>
          {this.state.posts.map(data=>(
            <TweetCard data={data} key={data.id}/>
           ))}
        </div>
      </div>
    </div>
      )
    }
    }
  }
}
  export default Profile

