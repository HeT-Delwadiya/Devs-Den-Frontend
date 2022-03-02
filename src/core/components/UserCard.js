import React from 'react';
import { Link } from 'react-router-dom';

function UserCard(props) {

       const [isHover, setIsHover] = React.useState(false);

       return (<div className="col-lg-3 col-md-6 col-sm-12">
                     <div className={isHover ? "text-center bg-white rounded-3 shadow-lg" : "text-center bg-white rounded-3 shadow"} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                            <div>
                                   <img src={props.user.avatar} className="rounded-circle ms-5 mt-4 mb-4 me-5"  style={{height: "125px", width: "125px"}}/>
                            </div>
                            <div className="mb-3 pb-4">
                                   <h4 className=""><strong>{props.user.name}</strong></h4>
                                   <h5 className="">{props.user.field}</h5>
                                   {props.type==0 ? (<h6 className="mt-3">{props.user.following.length+props.user.followingCompanies.length}   <span className="fw-lighter"><small>Followings</small></span>    {props.user.followers.length}   <span className="fw-lighter"><small>Followers</small></span></h6>) : (<h6 className="mt-3">{props.user.followers.length}   <span className="fw-lighter"><small>Followers</small></span></h6>)}
                                   {props.type==0 ? (<Link to={`/user/${props.user._id}/profile`}><button type="button" className="btn btn-purple px-5 mt-3" style={{borderRadius: "25px"}}><strong>View Profile</strong></button></Link>) : <Link to={`/company/${props.user._id}/profile`}><button type="button" className="btn btn-purple px-5 mt-3" style={{borderRadius: "25px"}}><strong>View Profile</strong></button></Link>}
                            </div>
                     </div>
              </div>
       );
}

export default UserCard;