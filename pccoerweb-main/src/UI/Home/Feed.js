import React from "react";
import Header from "../constant/Header/Header";
import BottomFooter from "./BottomFooter";
import './Feed.css'
import TweetCard from "./cards/TweetCard";
import firebase from "firebase";
import Error from "../constant/Error";
class Feed extends React.Component {
    componentDidMount(){

    // Fetch user Posts 
     firebase.firestore()
            .collection("tweets")
            .orderBy("creation","desc").limit(30)
            .onSnapshot((snapshot) => {
                let allpost = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                this.setState({ post: allpost })
            })
    } 
    constructor(){
      super()
      this.state={
        post:[]
      }
    }
    render() {
      if(!sessionStorage.getItem("user")){
        return <Error/>
      }
     else{
      return (
      <div >
      <Header/>
      <div className="container-fluid home-bg pb-5">
        <div className="container pt-5 ">
          <div className="row pt-5 pb-2">
            <div className="col-sm-12 col-lg-6 m-auto mt-3 py-2 bg-dark rounded shadow-lg">
            <h4 className="text-center">Tweets</h4>
            </div>
          </div>
          </div>
           {this.state.post.map(data=>(
             <TweetCard data={data} key={data.id}/>
           ))}     
      </div>
      <BottomFooter/>
      </div>
      )
    }
  }
}

export default Feed;