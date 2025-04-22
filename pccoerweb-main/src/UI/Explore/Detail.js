import React from "react";
import Header from "../constant/Header/Header";
import firebase from "firebase";
import Error from "../constant/Error";
import { useParams } from "react-router-dom";

const Detail =(props) => {
  const params = useParams();
  if(!sessionStorage.getItem("user")){
    return <Error/>
  }
 else{
  return (
    <ShowDetail {...props} params={params} />
  );
 }
}

class ShowDetail extends React.Component{
  componentDidMount(){
    console.log(this.props.params.id)
    console.log(this.props.params.type)
    const type=this.props.params.id
    const id=this.props.params.type
  
    firebase.firestore().collection(`${type}`)
    .doc(id)
    .get().then(snapshot=>{
      console.log(snapshot.data())
      const data =snapshot.data()
      this.setState({detail:data})
})
  }
  constructor(){
    super()
    this.state={
      detail:[]
    }
  }
  render(){
    return(
    <div>
      <Header/>
      <div className="container-fluid home-bg cardcss py-5">
        <div className="container pt-5 ">
        <div className="row py-3">
            <div className="col-sm-6 col-12 py-3">
            <h1>
                {this.state.detail.company}
                {this.state.detail.ctitle}
            </h1>
            <h2>
              {this.state.detail.title}
            </h2>
            </div>
            <div className="col-sm-6 col-12">
            <img height={250} width={250} src={this.state.detail.pic} className="img-fluid"/>
            </div>
        </div>
            <h4>
                {this.state.detail.cdesc}
            </h4>
            <div className="row pt-5">
                  <div className="col-12">
                  <h6>Location :- {this.state.detail.location}</h6>
                  </div>
                  <div className="col-12">
                  <h6>Duration :- {this.state.detail.duration}</h6>
                  </div>
            </div>
            <div className="row py-2">
                  <div className="col-12">
                  <h6>Date Of Join :- {this.state.detail.date}</h6>
                  </div>
                  <div className="col-12">
                  <h6>Apply By :- {this.state.detail.apply_by}</h6>
                  </div>
            </div>
            <div className="row py-2">
                  <div className="col-12">
                  <h6>Location :- {this.state.detail.location}</h6>
                  </div>
                  <div className="col-12">
                  <h6>Stipend :- {this.state.detail.stipend}</h6>
                  </div>
            </div>
            <h6> Apply Link  :- 
            {this.state.detail.apply_link ? 
            <a href={`${this.state.detail.apply_link}`} target="_blank">
            {this.state.detail.apply_link}
            </a>
            : 
            <a href={`${this.state.detail.clink}`} target="_blank">
            {this.state.detail.clink}
            </a>
            }
            </h6>
          </div>
        </div>
      </div>
    )    
    }
}


  export default Detail;