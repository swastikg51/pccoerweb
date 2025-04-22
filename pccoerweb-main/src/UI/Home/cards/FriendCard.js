import { Link } from 'react-router-dom';

const FriendCard =(data)=>{
    data=data.data
    return(
        <div className="row py-3"> 
        <div className="col-sm-12 col-lg-6 m-auto">
        <div className="card bg-dark">
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <div className='d-flex'>
                <img className='rounded-circle' src={data.profile_pic} height={40} width={40}/> 
                <Link to={`/profile/${data.uid}`} className="link text-white text-decoration-none">
                <h5 className="px-2 py-1">{data.username}</h5>
                </Link>
                </div>
            </div>
            <p>{data.branch }|| PCCOER Pune</p>
        </div>
        </div>
        </div>
        </div>
    )
}

export default FriendCard;