
import React from "react";
import Header from "../constant/Header/Header";
import { Link } from "react-router-dom";
import Error from "../constant/Error";
class Menu extends React.Component {
    render() {
      if(!sessionStorage.getItem("user")){
        return <Error/>
      }
     else{
      return (
      <div>
      <Header/>
      <div className="container-fluid home-bg cardcss py-5">
      <div className="container py-5">
      <h1 className="py-4 text-center">Syllabus</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card bg-dark">
        <Link to="/syllabus/CS">
          <img src="https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fcs.jpg?alt=media&token=0a1466d5-777e-4d06-b723-84d286386762" className="card-img-top" alt="Computer" 
          />
          </Link>
          <div className="card-body">
            <h3 className="card-title text-center">Computer Enginnering</h3>
          </div>
        </div>
      </div>
  <div className="col">
    <div className="card bg-dark">
    <Link to="/syllabus/CE">
      <img src="https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fce.jpg?alt=media&token=598963ee-61be-4efb-a11f-84b907c36796" className="card-img-top" alt="..."
    />
    </Link>
      <div className="card-body">
      <h3 className="card-title text-center">Civil Enginnering</h3>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card bg-dark">
    <Link to="/syllabus/EE">
      <img src="https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fee.jpg?alt=media&token=d968b298-1369-4aa1-83f6-fa26a8669d88" className="card-img-top" alt="..."
    />
    </Link>
      <div className="card-body">
      <h3 className="card-title text-center">Electrical Enginnering</h3>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card bg-dark">
    <Link to="/syllabus/E&TC">
      <img src="https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fe%26tc.jpg?alt=media&token=c449bb3f-d284-486e-8b25-6b5cc2cf88b0" className="card-img-top" alt="..."
        />
    </Link>
      <div className="card-body">
      <h3 className="card-title text-center">Electronic Enginnering</h3>
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
}

  export default Menu;