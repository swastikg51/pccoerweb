
import React from "react";
import Header from "../constant/Header/Header";
import BottomFooter from "./BottomFooter";
import ShareTweet from "../../firebase/ShareTweet";
import Error from "../constant/Error";
import './Feed.css'
import firebase from "firebase";

class AddTweet extends React.Component {
    componentDidMount(){
      if(sessionStorage.getItem("user")){
      firebase.firestore().collection("users")
      .doc(sessionStorage.getItem("user"))
      .onSnapshot((snapshot)=>{
        this.setState({username:snapshot.data().username,profile:snapshot.data().profile_pic})
      })
    }
    }
    constructor(props){
      super(props)
    this.state={
        caption:'',
        img:'',
        url:'',
        error:'',
        username:'' ,
        profile:'',
        upload:false
      }
    }
    
    render() {
      const setError=(err)=>{
        this.setState({error:err})
      }
      if(!sessionStorage.getItem("user")){
        return <Error/>
      }
      else{
        const Share=async(e)=>{
          e.preventDefault();
          this.setState({upload:true})
          //this.setState({error: await ShareTweet(this.state)});
          console.log(await ShareTweet(this.state,setError))
        }
        console.log(this.state.error)
      return (
      <div>
      <Header/>
      <div className="container-fluid home-bg addtweetbg">
        <div className="container pt-5 ">
          <div className="row pt-5 pb-2">
            <div className="col-sm-12 col-lg-6 m-auto mt-3 py-2 bg-dark rounded shadow-lg">
            <h4 className="text-center">Share Tweet</h4>
            </div>
          </div>
          </div>
        
        <div className="container">
        <div className="row py-4"> 
        {this.state.error==="Post uploaded" ?
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
        <div className="col-sm-12 col-lg-6 m-auto">
            <form onSubmit={Share}>
            <div className="mb-3">
            <label className="form-label"> Write Tweet</label>
            <textarea className="form-control" rows="3"
            value={this.state.caption}
            onChange={event => this.setState({ caption: event.target.value })}
            ></textarea>
            </div>
            <div className="mb-3">
            <label className="form-label">Share Image </label>
            <input className="form-control" type="file" accept=".jpg,.gif,.png" 
              onChange={event=>this.setState({img:event.target.files[0]})}
            />
            </div>
            <div className=" mb-3">
            <label className="form-label">Add URL</label>
            <input type="text" className="form-control" aria-describedby="basic-addon3"
              value={this.state.url}
              onChange={event=>this.setState({url:event.target.value})}
            />
            </div>
            <button type="submit" disabled={this.state.upload} className=" my-3 btn btn-primary">Share Tweet</button>
            </form>
        </div>
        </div>
        </div>

      </div>
      <BottomFooter/>
      </div>
      )
    }
  }
}

 export default AddTweet