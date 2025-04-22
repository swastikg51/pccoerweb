
import React from "react";
import Header from "../constant/Header/Header";
import ExploreCard from "./ExploreCard";
import firebase from "firebase";
import Error from "../constant/Error";
class Explore extends React.Component {
    componentDidMount(){
      console.log(this.state.menu)
      firebase.firestore().collection(this.state.menu).get().then((snapshot)=>{
        let internship=snapshot.docs.map(doc=>{
          const data=doc.data();
          const id=doc.id;
          return {id,...data}
        })
        console.log(internship)
        this.setState({internships:internship})
      }
      )
    }
    constructor(){
      super()
      this.state={
        internships:[],
        menu:'internships'
      }
     const arr=['compitions','internships']

      this.getInternships=()=>{
        firebase.firestore().collection("internships").get().then((snapshot)=>{
          let internship=snapshot.docs.map(doc=>{
            const data=doc.data();
            const id=doc.id;
            return {id,...data}
          })
          this.setState({internships:internship})
        }
        )
        this.setState({menu:arr[1]})
      }
      this.getCompition=()=>{
        firebase.firestore().collection("compitions").get().then((snapshot)=>{
          let internship=snapshot.docs.map(doc=>{
            const data=doc.data();
            const id=doc.id;
            return {id,...data}
          })
          this.setState({internships:internship})
        }
        )
        this.setState({menu:arr[0]})
      }
    }

    render() {
      console.log(this.state.internships)
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
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" onClick={()=>this.getCompition()}>Compition's </a></li>
                <li><a className="dropdown-item" onClick={()=>this.getInternships()}>Internships </a></li>
            </ul>
            </div>
            </div>
          </div>
          </div>
            
        <div className="container-fluid">
        <div className="row">
        {this.state.internships.map(data=>(
          <ExploreCard data={data} key={data.id}/>
        ))}
        </div>
        </div>
      </div>
      </div>
      )
    }
  }
}
  export default Explore;