import React from "react";
import './Registeration.css';
import Header from "../constant/Header/Header2";
import CreateUser from "../../firebase/CreateUser";
import Alert from "../constant/Alert";

class Registeration extends React.Component {
    constructor(props){
      super(props)
      this.state={
        username:'',
        name:'',
        email:'',
        password1:'',
        password2:'',
        loading:false,
        error:''
      }
      const setloading =()=>{
        this.setState({loading:true})
      }
      this.createAccount=async(event)=>{
        event.preventDefault();
        if(this.state.password1!==this.state.password2){
          this.setState({error:"Password Must Be Same ..!"})
        }
        else{
         this.setState({error: await CreateUser(this.state)}) 
        }
      }

    }
    render() {
      return(
          <div>
            <Header/>
            <div className="sign-bg">
          <div className="row py-2">
            <div className="text-center py-2">
              <h2>Sign Up</h2>
            </div>

            <div>
            {this.state.error?<Alert error={this.state.error}/>:'' }
            </div>
            
            <div className="col-10 col-sm-6 col-lg-4 m-auto">
            <form onSubmit={this.createAccount}>
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
                    <label  className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={(event) => this.setState({ email: event.target.value })}
                  required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password1"
                    value={this.state.password1}
                    onChange={(event) => this.setState({ password1: event.target.value })}
                    required
                   />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Re-Enter Password</label>
                    <input type="password" className="form-control" id="Password2"
                    value={this.state.password2}
                    onChange={(event) => this.setState({ password2: event.target.value })}
                    required
                    />
                  </div>
                  <div className="text-center">
                  <button disabled={this.state.loading} type="submit" className="btn btn-primary my-2 mx-5 px-5 py-2">Submit</button>
                  </div>
                </form>
            </div>
        </div>
      </div>
      </div>
        
)
}}

export default Registeration;