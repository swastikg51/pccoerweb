import { Link } from "react-router-dom";

const StudentCard =(data)=>{
    data=data.data
    return(
        <div className="col-sm-6 col-lg-4 py-3">
        <div className="card bg-dark ">
            <div className="card-header">
            <div className="d-flex">
                <img className='rounded-circle' src={data.profile_pic} height={35} width={35}/> 
                <Link to={`/profile/${data.uid}`} className="link text-white text-decoration-none">
                <h5 className="px-2 py-1">{data.username}</h5>
                </Link>
            </div>
            </div>
            <div className="card-body text-center">
                <img src={data.pic} className="img-fluid" />
                <p className="card-text">{data.branch} {data.comname}{data.company}</p>
            </div>
            <div className="card-footer">
            <div className="d-flex justify-content-between">
                <h6 className="fw-bold">{data.cgp}{data.rank}{data.lpa}</h6>
                <button className="btn py-2" >Connect</button>
            </div>
            </div>
            </div>
        </div>
    )
}
export default StudentCard;