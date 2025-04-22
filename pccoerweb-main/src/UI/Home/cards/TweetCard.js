import like from './../img/icons/like.png'
import { Link } from 'react-router-dom';
const TweetCard =(data)=>{
    data=data.data
    var PosdDate=new Date(data.creation.seconds*1000)
    var month=PosdDate.getMonth()+1
    PosdDate=PosdDate.getDate()+"/"+month+"/"+PosdDate.getFullYear()
    return(
        <div className="py-3">
        <div className="row">
        <div className="col-sm-12 col-lg-6 m-auto">
            <div className="card bg-dark">
              <div className="d-flex card-header">
                <img className='rounded-circle' src={data.profile} height={35} width={35} />
                <Link to={`/profile/${data.uid}`} className="link text-white text-decoration-none">
                <h5 className="px-2 py-1">{data.username}</h5>
                </Link>              
                </div>
              <Link to={`/home/${data.id}`} className="text-white text-decoration-none">
              <div className="card-body">
                <p className="card-text">{data.caption}</p>
                {data.post ?
                <img src={data.post} className="card-img-top"  height={400} width={500}/> :''}
              </div>
              </Link>
              <div className="card-footer text-muted">
                <div className='row'>
                  <div className='col-8'>
                  <a href={`${data.url}`} target="_blank">{data.url}</a>
                  </div>
                  <div className='col-4'>
                    <p>{PosdDate}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
    )
}

export default TweetCard;