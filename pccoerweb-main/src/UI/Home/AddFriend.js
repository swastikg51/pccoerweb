import React from "react";
import Header from "../constant/Header/Header";
import BottomFooter from "./BottomFooter";
import './Feed.css'
import FriendCard from "./cards/FriendCard";
import firebase from "firebase";

class AddFriend extends React.Component {
    componentDidMount(){
      
      firebase.firestore().collection("Following")
      .doc(sessionStorage.getItem("user"))
      .collection("userFollowing")
      .get()
      .then((snapshot)=>{
        let users=snapshot.docs.map(doc=>{
          const id=doc.id; 
          return id
      })
      //console.log("UserFollowing",users)
      if(users[0]){
        firebase.firestore().collection("users")
        .where("uid","not-in",users)
        .get().then((snapshot)=>{
          console.log(snapshot)
          let users=snapshot.docs.map(doc=>{
              const data=doc.data();
              const id=doc.id;
              return {id,...data}
          })        
          this.setState({allusers:users})
        })
      }
      else{
      firebase.firestore().collection("users")
      .where("uid","!=",sessionStorage.getItem("user"))
      .get().then((snapshot)=>{
        console.log(snapshot)
        let users=snapshot.docs.map(doc=>{
            const data=doc.data();
            const id=doc.id;
            return {id,...data}
        })
        console.log(users)
        this.setState({allusers:users})
      })
      }
    })
    }

    constructor(){
      super()
      this.state={
        allusers:[],
        search:""
      }
      
      this.searchUser=(e)=>{
        e.preventDefault()
        console.log(this.state.search)
        firebase.firestore()
                .collection('users')
                .where('username', '>=', this.state.search)
                .get()
                .then((snapshot) => {
                    let user = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    this.setState({ allusers: user })
                })
      }
    }
    render() {
      return (
        <div>
          <Header/>
            <div className="container-fluid home-bg addtweetbg">
              <div className="container pt-5 ">
                <div className="row pt-5 pb-2">
                  <div className="col-sm-12 col-lg-6 m-auto mt-3 py-2 bg-dark rounded shadow-lg text-center">
                    <div className="container-fluid">
                      <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                          onChange={event => this.setState({ search: event.target.value })}
                          value={this.state.search}
                        />
                        <button className="btn btn-outline-success" 
                        onClick={this.searchUser}
                        type="submit">
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                
              </div>
              {this.state.allusers.map(data=>(
                <FriendCard data={data} key={data.id}/>
              ))} 
      </div>
      <BottomFooter/>
    </div>
      )
    }
  }

  export default AddFriend;