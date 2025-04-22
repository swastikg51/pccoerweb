import React from "react";
import './Landing.css';
import profile from './img/profile.png'
import graduate from './img/graduates.png'
import scholarship from './img/scholarship.png'
import Header from "../constant/Header/Header2";
class Landing extends React.Component {
    render() {
      return(
      <div>
        <Header/>
      <div className="container-fluide">
      <div className="bg">
      <div>
      <h2 className="heading">
          A New Way To Meet 
          <br/>
           People At  <span>PCCOER </span>
          <br/>
          
      </h2>
      </div>
      </div>
      </div>

      <div className="container-fluid">
        <h2 className="text-center py-4 headline">Features</h2>
        <div className="container">
          <div className="row py-5">
          <div className="col-sm-6 text-center">
            <img src={profile} className="img-fluid" style={{height: 200}}/>
          </div>
          <div className="col-sm-6">
            <h3 className="font-weight-bold py-2">Get In Touch With PCCOER Alumni</h3>
            <h5 className="py-3">
              Improve Your Professional Profile by Developing Professional Relationships with Alumni 
              <br/>And share your accomplishments/ideas here .
            </h5>
          </div>
          </div>
        </div>
        </div>

        <div className="container-fluid bg-dark text-white">
        <div className="container">
          <div className="row py-5">
          <div className="col-sm-6">
          <h3 className="font-weight-bold py-2">
          Get Roadmap of your B.E Journey </h3>
          <h5 className="py-3">
          You will find a copy of your whole semester's syllabus here. 
          Teachers' notes for the entire semester Other relevant materials are included in the reference book.
            </h5>
          </div>
          <div className="col-sm-6 text-center">
            <img src={scholarship} className="img-fluid" style={{height: 200}}/>
          </div>
          </div>
        </div>
        </div>

        <div className="row py-5">
        <div className="col-sm-6 text-center">
          <img src={graduate} className="img-fluid" style={{height: 200}}/>
        </div>
        <div className="col-sm-6">
          <h3 className="font-weight-bold py-2 text-center">
            Explore Opportunity
          </h3>
          <h5 className="py-3 px-3">
          You can get real-time internship and competition alerts here, which can help students stand out in a crowded field..
          </h5>
        </div>
        </div>

        <div className="container-fluid bg-dark">
        <h2 className="text-center py-4 headline">About US</h2>
        <div className="container text-white">
          <div className="row py-5">
          <div className="col-sm-6">
            <h2>PCCOER</h2>
            <h5 className="py-2">https://www.pccoer.com</h5>
            <h6>
            PCP, PCCOE and SBPIM are operational in Pradhikaran, Nigdi, in
            more than 10 Acres of land and having more than 4500 students on board.
            </h6>
            <h5 className="py-2">pccoer.ravet@gmail.com</h5>
          </div>
          <div className="col-sm-6">
            <h2>DEVELOPED BY</h2>
            <a className="text-info text-decoration-none" href="https://www.linkedin.com/in/jitesh-rajput-916076215/" target="_blank">Jitesh Rajput</a> <br/>
            <a className="text-decoration-none" target="_blank" href="https://www.linkedin.com/in/nikita-badhekar-b551841aa/">Nikita Badhekar</a> <br/>
            <a className="text-decoration-none" target="_blank" href="https://www.linkedin.com/in/someshbhandare/">Swastik Ghonsikar</a> <br/>
            <a className="text-decoration-none" target="_blank" href="https://www.linkedin.com/in/shraddha-warade-b8a921230/">Shraddha warade</a> <br/>
            <h5>Guided By :- Prof. Mahendra Salunke</h5>
          </div>
          </div>
        </div>
        </div>
        
</div>
      );
    }
  }

  export default Landing;