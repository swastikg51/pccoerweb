import React from "react";
import Header from "../constant/Header/Header";
import BottomFooter from "./BottomFooter";
import firebase from "firebase";
import './Feed.css';
import StudentCard from "./cards/StudentCard";
import Error from "../constant/Error";

class StudentPanel extends React.Component {
  componentDidMount(){
    firebase.firestore().collection("placed-student")
    .where("type","==","placed")
    .get()
    .then(snapshot=>{
      let students=snapshot.docs.map(doc=>{
        const data=doc.data();
        const id=doc.id;
        return {id,...data}
      })
      console.log(students)
      this.setState({student:students})
    })
  }
  constructor(){
    super()
    this.state={
      student:[],
      menu:'Placed Students'
    }
    const arr=['Placed Student','2021-Topper Students','Compition winners'];
    this.getStudent=(type)=>{
      firebase.firestore().collection("placed-student")
    .where("type","==",type)
    .get()
    .then(snapshot=>{
      let students=snapshot.docs.map(doc=>{
        const data=doc.data();
        const id=doc.id;
        return {id,...data}
      })
      console.log(students)
      this.setState({student:students})
    })
      if(type=="placed"){this.setState({menu:arr[0]})}
      if(type=="winner"){this.setState({menu:arr[2]})}
      if(type=="topper"){this.setState({menu:arr[1]})}
    }
  }
    render() {
      if(!sessionStorage.getItem("user")){
        return <Error/>
      }
      else{
      return (
      <div>
      <Header/>
      <div className="container-fluid home-bg cardcss">
        <div className="container pt-5 ">
          <div className="row pt-5 pb-2">
            <div className="col-sm-12 col-lg-6 text-center m-auto mt-3 py-2 bg-dark rounded shadow-lg">
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                 {this.state.menu}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" 
            aria-labelledby="dropdownMenuButton2"
            >
                <li><a className="dropdown-item" onClick={()=>this.getStudent("placed")} >Top Placed Students</a></li>
                <li><a className="dropdown-item" onClick={()=>this.getStudent("topper")} >2021 - Toppers</a></li>
                <li><a className="dropdown-item" onClick={()=>this.getStudent("winner")} >Recent Compition Winners</a></li>
            </ul>
            </div>
            </div>
          </div>
          </div>
            
        <div className="container">
        <div className="row">
        {this.state.student.map(data=>(
                <StudentCard data={data} key={data.id}/>
              ))} 
        </div>
        </div>
      </div>
      <BottomFooter/>
      </div>
      )
    }
  }
}
  export default StudentPanel;