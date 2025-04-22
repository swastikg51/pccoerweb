import React from "react";
import Header from "../constant/Header/Header";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { Link} from 'react-router-dom';
import Error from "../constant/Error";

function Card({branch,sem}){
  return(
    <div className="col-6 col-sm-3">
          <div className="card test-white bg-dark text-center">
           <Link to={`/syllabus/${branch}/${sem}`} className="link text-white text-decoration-none">
            <div className="card-body my-5">
              <h5 className="card-title"> {sem} SEM</h5>
            </div>
            </Link>
          </div>
        </div>
  )
}

const MenuCards =(props) => {
  const params = useParams();
  console.log(params)
  if(params.branch==="CS" || params.branch==="EE" || params.branch==="CE" || params.branch==="E&TC" ){
    if(!sessionStorage.getItem("user")){
      return <Error/>
    }
   else{
  return (
    <MCards {...props} params={params} />
  )
   }
  }
  else{
    return(
      <Error/>
    )
  }
}

class MCards extends React.Component {
  componentDidMount(){
    this.setState({branch:this.props.params.branch})
  }
  constructor(){
  super()
  this.state={
    branch:''
  }
  }
    render() {
      return (
      <div>
      <Header/>
      <div className="container-fluid home-bg pt-5">
        <div className="container pt-5 h">
        <h1 className="text-center py-3">Select Semester</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4">
       
        <Card branch={this.state.branch} sem="1"/>
        <Card branch={this.state.branch} sem="2"/>
        <Card branch={this.state.branch} sem="3"/>
        <Card branch={this.state.branch} sem="4"/>
        <Card branch={this.state.branch} sem="5"/>
        <Card branch={this.state.branch} sem="6"/>
        <Card branch={this.state.branch} sem="7"/>
        <Card branch={this.state.branch} sem="8"/>
        </div>
      </div>
      </div>
      </div>
      )
    }
  }

  export default MenuCards;