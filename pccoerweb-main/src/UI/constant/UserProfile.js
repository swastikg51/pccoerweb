import React from "react";
import Header from "../constant/Header/Header";
import TweetCard from "../Home/cards/TweetCard";
import userprofile from "../Home/img/profile.png";
import firebase from "firebase";
import { Link, Navigate, useParams } from "react-router-dom";
 const UserProfile =(props) => {
    const params = useParams();
    return (
      <Pro {...props} params={params} />
    );
  }

class Pro extends React.Component {
  componentDidMount(){
    const id=this.props.params.id
    firebase.firestore().collection("users")
    .doc(id)
    .onSnapshot((snapshot)=>{
      this.setState({user:snapshot.data()})
    })

    firebase.firestore().collection("tweets")
    .where('uid',"==",id)
    .get().then(snapshot=>{
      let userpost = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    })
     this.setState({posts:userpost})
    })
     // Get User Following
     firebase.firestore().collection("Following")
     .doc(id)
     .collection("userFollowing")
     .get()
     .then((snapshot)=>{
       let users=snapshot.docs.map(doc=>{
         const id=doc.id; 
         return id
     })
     this.setState({following:users.length})
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
  this.setState({isFollowing:users.includes(id)})
})
  }
  constructor(){
    super()
    this.state={
      user:'',
      posts:[],
      isFollowing:false,
      following:0
    }
  }
    render() {
      if(sessionStorage.getItem("user")==this.state.user.uid){
        return(
          <Navigate to="/profile"/>
        )
      }
      else{
      /* const userFollowing=(uid)=>{
        firebase.firestore()
                  .collection("Following")
                  .doc(firebase.auth().currentUser.uid)
                  .collection("userFollowing")
                  .doc(uid)
                  .set({
                  }).then(()=>{
                  this.setState({isFollowing:true})
                  }
                  )
      }
      */

      const userFollowing=(uid)=>{
        console.log(uid)
        if(this.state.isFollowing){
            // UnFollow the User 
            firebase.firestore()
            .collection("Following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(uid)
            .delete()
            .then(()=>{
            this.setState({isFollowing:false})
            }
            )
            .catch((error)=>{
                console.log("Error :",error)
            })
        }
        else{
          firebase.firestore()
          .collection("Following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .doc(uid)
          .set({
          }).then(()=>{
          this.setState({isFollowing:true})
          }
          )
        }
      }

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
                <Link className="text-white text-decoration-none link" to={`/profile/${this.state.user.uid}/userFollowing`}>
                <h6 className="px-5" > Friend :-{this.state.following} <span></span></h6> 
                </Link>           
                <h6 className="px-5"> Bio :- <span>{this.state.user.bio}</span></h6>
                <h6 className="px-5"> website :- <span><a href={`${this.state.user.website}`} target="_blank" className="link">{this.state.user.website}</a></span></h6>
                <div className="row">
                <div className="col-lg-5 text-center" >
                <button className="btn py-2" onClick={()=>userFollowing(this.state.user.uid)} >{this.state.isFollowing ?'Following':"Connect"}</button>
                </div>
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
      )
    }
  }
}
export default UserProfile