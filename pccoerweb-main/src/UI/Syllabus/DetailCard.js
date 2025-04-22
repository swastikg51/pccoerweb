import { useState } from "react";
import Error from "../constant/Error";
        
const DetailCard=(data)=>{
    const subject=data.data
    const [toggle,setToggle]=useState(false)
    if(!sessionStorage.getItem("user")){
        return <Error/>
      }
     else{
    return(
        <>
        <div className="accordion py-3" id="accordionExample">
            <div className="accordion-item bg-dark">
                <h2 className="accordion-header" id="headingOne">
                <button
                    className="accordion-button bg-dark text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={()=>setToggle(!toggle)}
                >
                  {subject.branch} {subject.sem} {subject.subject_name}
                </button>
                </h2>
                {toggle ?
                <div
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
                >
                <div className="accordion-body">
                    <strong>Syllabus Drive Link :- </strong>
                </div>
                </div>
                :""}
                </div>
            </div>
        </>
    )
                }
}
export default DetailCard;