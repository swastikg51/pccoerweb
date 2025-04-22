import feedicon from './img/icons/feed.png';
import addpost from './img/icons/add-post.png';
import placed from './img/icons/placed.png';
import addfriend from './img/icons/add-friend.png';
import { Link } from 'react-router-dom';

const BottomFooter = ()=>{
    return(
        <div>
          <div className="container fixed-bottom py-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 m-auto bg-dark rounded shadow-lg py-1">
            <div className="row text-center">
            <div className="col-3">
            <Link to="/home">
            <img className="bg-white rounded px-2 py-2" src={feedicon} height={40}/>
            </Link>
            </div>
            <div className="col-3">
            <Link to="/home/addtweet">
            <img className="bg-white rounded px-2 py-2" src={addpost} height={40}/>
            </Link>
            </div>
            <div className="col-3">
            <Link to="/home/addfrd">
            <img className="bg-white rounded px-2 py-2" src={addfriend} height={40}/>
            </Link>
            </div>
            <div className="col-3">
            <Link to="/home/student">
            <img className="bg-white rounded px-2 py-2" src={placed} height={40}/>
            </Link>
            </div>
            </div>
            </div>
          </div>
          </div>
        </div>
    )
}

export default BottomFooter;