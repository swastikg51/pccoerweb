import React from "react"
import Header from "./Header/Header";
import FriendCard from "../Home/cards/FriendCard";
import { useParams } from "react-router-dom";
import firebase from "firebase";

const ShowFollowing =(props) => {
  const params = useParams();
  console.log(params)
    return(
        <Following {...props} params={params} />
    )
}
class Following extends React.Component{
    componentDidMount(){
      console.log(this.props.params.id)
        firebase.firestore().collection("Following")
        .doc(this.props.params.id)
        .collection("userFollowing")
        .get()
        .then((snapshot)=>{
          console.log("jksdf")
          let users=snapshot.docs.map(doc=>{
            const id=doc.id; 
            return id
        })
        console.log(users)
        if(users[0]){
            firebase.firestore().collection("users")
            .where("uid","in",users)
            .get().then((snapshot)=>{
              console.log(snapshot)
              let users=snapshot.docs.map(doc=>{
                  const data=doc.data();
                  const id=doc.id;
                  return {id,...data}
              })        
              this.setState({userFollowing:users})
            })
          }
    })
    }
    constructor(props){
        super(props)
        this.state={
            userFollowing:[]
        }
    }
    render(){
        return(
                <>
                <Header/>
                <div className="container-fluid home-bg cardcss pt-5">
                <h3 className="text-center pt-5">Following</h3>
                <div className="container-fluid pt-5">

                {
                  this.state.userFollowing[0]?
                  this.state.userFollowing.map(data=>(
                <FriendCard data={data} key={data.id}/>
              ))
              :<h4 className="text-center">No Following</h4>
              }
                </div>
                </div>
                </>
        )
        }
}

export default ShowFollowing;