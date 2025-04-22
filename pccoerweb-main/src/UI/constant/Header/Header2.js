import './Header.css'
import { Link } from "react-router-dom";

const Header2 =()=>{
    return(
        <div className="container-fluide header py-2">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand logo">
              PCCOER WEB
            </Link>  
              <li className="nav-item mb-1">
                <Link to="/login" className="nav-link active" href="www.google.com">
                  Login
                </Link>
              </li>
          </div>
          </nav>
        </div>
      </div>
    )
}

export default Header2;