import { Link } from "react-router-dom"
const ShowComment=(data)=>{
    data=data.data
    console.log(data)
    return(
        <>
        <div className="row py-2">
        <div className="col-2">
        <img className="rounded-circle" src={data.profile} height={50} width={50}/>
        </div>
        <div className="col-10"> 
        <Link to={`/profile/${data.uid}`} className="link text-white text-decoration-none">
        <h6>{data.username}</h6>
        </Link>
        <p>{data.comment} </p>
        </div>
        </div>
        </>
    )

}
export default ShowComment;