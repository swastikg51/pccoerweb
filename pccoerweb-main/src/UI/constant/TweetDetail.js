import React from "react";
import Header from "./Header/Header";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import like from './../Home/img/icons/like.png'
import download from './../Home/img/icons/download.png'
import send from './../Home/img/icons/send.png'
import comment from './../Home/img/icons/comment.png'
import { Link } from "react-router-dom";
import ShowComment from "./ShowComment";
import { saveAs } from "file-saver";

const TweetDetail =(props) => {
    const params = useParams();
      return(
          <Deatail {...props} params={params} />
      )
  }

class Deatail extends React.Component{
    componentDidMount(){
        // Fetch Tweet Details
        const id=this.props.params.id
        firebase.firestore()
        .collection("tweets")
        .doc(`${id}`)
        .onSnapshot((snapshot) => {
            let data = snapshot.data();
            this.setState({postid:snapshot.id})
            this.setState({post:data })
            console.log(this.state.post)
        })
        // Fetch Likes Details
        console.log(this.state.postid)
        firebase.firestore().collection("tweets")
        .doc(`${id}`)
        .collection("likes")
        .get()
        .then((snapshot)=>{
            let like=snapshot.docs.map(doc=>{
            const id=doc.id;
            return id
        })
        this.setState({isLiked:like.includes(sessionStorage.getItem("user"))})
        this.setState({likes:like})
        this.setState({count:like.length})
        })
        //Fetch Current User
        firebase.firestore().collection("users")
        .where("uid","==",sessionStorage.getItem("user"))
        .get().then((snapshot)=>{
          console.log(snapshot)
          let users=snapshot.docs.map((doc)=>{
          return (doc.data())
          })
          console.log(users[0])
          this.setState({currentuser:users[0]})
        })
        // Fetch All Comments 
        firebase.firestore()
        .collection("tweets")
        .doc(`${id}`)
        .collection("comments")
        .onSnapshot((snapshot)=>{
            let comments=snapshot.docs.map(doc=>{
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
           this.setState({allcomments:comments})
           this.setState({count2:comments.length})
        })
    }
    constructor(){
        super()
        this.state={
            currentuser:'',
            post:[],
            postid:'',
            likes:[],
            isLiked:'',
            count:0,
            count2:0,
            comment:'',
            allcomments:null
        }
    }
    render(){
        const likeTweet=(e)=>{
            e.preventDefault();
            if(this.state.isLiked){
                // Unlike the post
                firebase.firestore()
                .collection("tweets")
                .doc(`${this.state.postid}`)
                .collection("likes")
                .doc(sessionStorage.getItem("user"))
                .delete()
                .then(()=>{
                this.setState({isLiked:false})
                this.setState({count:this.state.count-1})
                }
                )
                .catch((error)=>{
                    console.log("Error :",error)
                })
            }
            else{
                // Like the post
             firebase.firestore()
                  .collection("tweets")
                  .doc(`${this.state.postid}`)
                  .collection("likes")
                  .doc(sessionStorage.getItem("user"))
                  .set({
                  }).then(()=>{
                  this.setState({isLiked:true})
                  this.setState({count:this.state.count+1})
                  }
                  )
            }
        }
            const addcomment=()=>{
                if(this.state.comment!=""){
                    //Add Comments
                firebase.firestore()
                  .collection("tweets")
                  .doc(`${this.state.postid}`)
                  .collection("comments")
                  .doc()
                  .set({
                    uid:this.state.currentuser.uid,
                    profile:this.state.currentuser.profile_pic,
                    username:this.state.currentuser.username,
                    comment:this.state.comment,
                    creation:firebase.firestore.FieldValue.serverTimestamp()
                  })
                  .then(()=>{
                  console.log("Comment added ..")
                  }
                  )
                }
                else{
                    console.log("Comment Does't Upload")
                }
            }
            
            const downloadImg=()=>{
                if(this.state.post.post){
                saveAs(this.state.post.post,'img.jpg') 
                }   
            };

            // Show Likes 
         
        return(
            <div className="pt-5">
                <Header/>
                <div className="home-bg cardcss pt-5">
                <div className="pt-5">
                <div className="px-3">
                <div className="row">
                <div className="col-sm-12 col-lg-6 m-auto">
                    <div className="card bg-dark">
                    <div className="d-flex card-header">
                        <img className="rounded-circle" src={this.state.post.profile} height={40} width={40} />
                        <Link to={`/profile/${this.state.post.uid}`} className="link text-white text-decoration-none">
                        <h5 className="px-2 py-1">{this.state.post.username}</h5>
                        </Link>              
                        </div>
                    <div className="card-body">
                        <p className="card-text">{this.state.post.caption}</p>
                        <a href={`${this.state.post.url}`} target="_blank">{this.state.post.url}</a>
                        {this.state.post.post ?
                        <img src={this.state.post.post} className="card-img-top"  height={400} width={500}/> :''}
                    </div>
                    <div className="card-footer">
                        <div className='row text-center'>
                        <div className='col-4 text-center d-flex'>
                        <img className={this.state.isLiked ? 'btn' :'bg-white rounded'} src={like} height={30} onClick={likeTweet}/>
                        <h6 className="px-3">{this.state.count} </h6>
                        </div>
                        <div className='col-4 text-center d-flex'>
                        <img  src={comment} height={30} />
                        <p className="px-2">{this.state.count2} </p>
                        </div>
                        <div className='col-4 text-center d-flex'>
                        <img  src={download} height={30} onClick={downloadImg}/>
                        </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-10"> 
                            <input type="text" className="bg-dark text-white form-control" 
                            value={this.state.comment}
                            onChange={(e)=>this.setState({comment:e.target.value})}
                             required/>
                            </div>
                            <div className="col-2">
                            <img className="rounded" src={send} height={25}
                                onClick={addcomment}
                            />
                            </div>
                        </div>
                        { this.state.allcomments ?
                        this.state.allcomments.map(data=>(
                         <ShowComment data={data} key={data.id}/>
                         )) :""} 
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default TweetDetail;