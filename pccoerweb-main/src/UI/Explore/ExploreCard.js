import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Error from "../constant/Error";
const ExploreCard =(props)=>{
    const [data,setData] =useState(props.data)
    console.log(data)
    if(!sessionStorage.getItem("user")){
        return <Error/>
      }
     else{
    return(
        <div className="row py-3"> 
        <div className="col-sm-12 col-lg-6 m-auto">
        <div className="card bg-dark">
        <div className="card-body">
                <div className='d-flex'>
                <img src={data.pic} height={50} /> 
                <h6 className="px-2 py-1 fw-bold">{data.title} {data.ctitle}</h6>
                </div>
                <div className="d-flex justify-content-between pt-2">
                <p> </p>
                <Link className="btn py-2" 
                to={`/explore/detail/${data.type}/${data.id}`}
                >Apply
                </Link>
                </div>
        </div>
        </div>
        </div>
        </div>
    )
}
}
export default ExploreCard;