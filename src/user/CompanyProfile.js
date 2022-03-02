import React from 'react';
import Header from "../core/components/Header";
import Footer from "../core/components/Footer";
import { getCompanyById, unfollow, follow } from './helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
import { Link } from "react-router-dom";
import { getConversationByMemberId, createConversation } from '../communication/helper/comapicalls';
import Post from '../post/components/Post';

function CompanyProfile(props) {

       const companyId = props.match.params.companyId;

       const [company, setCompany] = React.useState({});
       const [error, setError] = React.useState(false);
       const [isDetails, setIsDetails] = React.useState(true);
       const [isFollowing, setIsFollowing] = React.useState(false);
       const [isFollowable, setIsFollowable] = React.useState(false);
       const [refresh, setRefresh] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(false);

       const {user: mUser, authtoken} = isAuthenticated();

       const loadCompany = () => {
              setIsLoading(true)
              getCompanyById(companyId, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error);
                     else {
                            setCompany(data);
                            if (mUser.type==1) {
                                   setIsFollowable(false);
                            } else {
                                   setIsFollowable(true);
                            }
                            data.followers.map((follower, index) => {
                                   if(mUser._id==follower._id) {
                                   return setIsFollowing(true)
                                   }
                            })
                     }
              })
              .catch(err => console.log(err));
              setIsLoading(false);
       }

       React.useEffect(() => {
              loadCompany();
       }, [refresh])

       React.useEffect(() => {
              loadCompany();
       }, [companyId]);

       const onClickFollowBtn = (event) => {
              event.preventDefault();
              setIsLoading(true);
              let data = {
                     mUserId: mUser._id,
                     mUserType: mUser.type,
                     userId: company._id,
                     userType: company.type
              }
              if(isFollowing) {
                     unfollow(data, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setIsFollowing(false)
                                   setCompany(data)
                            }
                     })
                     .catch(err => console.log(err));
              } else {
                     follow(data, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setIsFollowing(true)
                                   setCompany(data)
                            }
                     })
                     .catch(err => console.log(err));
              }
              setIsLoading(false);
       }

       const handleSendMsg = (event) => {
              event.preventDefault();
              getConversationByMemberId({userId: companyId, otherId:mUser._id}, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error)
                     else if (!data._id) {
                            createConversation({members: [mUser._id, companyId], isGroup: false}, authtoken)
                            .then(info => {
                                   if(info.error)
                                          setError(info.error)
                                   else {
                                          return props.history.push('/conversations/all');
                                   }
                            })
                            .catch(err => console.log(err));
                     }
                     else {
                            return props.history.push('/conversations/all');
                     }
              })
              .catch(err => console.log(err));
       }

       const errorMsg = () => {
              return (
                     <div className="container mt-3">
                            <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                                   {error}
                            </div>
                     </div>
              );
       }

       const loading = () => {
              return <div className="custom-loading" style={{display: isLoading ? "" : "none"}}>
                     <ul className="position-absolute top-50 start-50 mt-5">
                            <li> </li>
                            <li> </li>
                            <li> </li>
                            <li> </li>
                     </ul>
              </div>
       }


       return (
              <div>
                     <Header myAccount={props.match.params.companyId==mUser._id ? true : false} />
                     {errorMsg()}
                     <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loading()}</div>

                     {company._id && (<div className="container">
                            <div className="theme-bg mx-3 mb-5 borderRadius-10" style={{borderRadius: "25px"}}>
                                   <div className="row">
                                   <div className="col-lg-3 col-md-5 col-sm-12">
                                          <img src={company.avatar} className="rounded-circle ms-5 mt-5 mb-5 me-5"  style={{height: "200px", width: "200px"}}/>
                                   </div>
                                   <div className="col-lg-4 col-md-6 col-sm-12 my-auto">
                                          <h1 className="text-white fw-bold">{company.name}</h1>
                                          <h3 className="text-white">{company.field}</h3>
                                          <h5 className="text-white mt-3">{company.followers.length}   <span className="fw-lighter"><small>Followers</small></span></h5>
                                          {isFollowable && (<button type="button" onClick={onClickFollowBtn} className="btn btn-light px-5 mt-3" style={{borderRadius: "25px"}}><strong>{isFollowing ? "Unfollow" : "Follow"}</strong></button>)}
                                          {mUser._id && companyId && companyId==mUser._id ? "" : (<button type="button" onClick={handleSendMsg} style={{borderRadius: "25px"}} class={isFollowable ? "btn btn-dark px-3 mt-3 ms-3" : "btn btn-dark px-3 mt-3"}><strong><i class="fa-solid fa-paper-plane"></i> Send Message</strong></button>)}
                                   </div>
                                   </div>
                            </div>

                            <div className="row m-5">
                                   <div className="col-lg-6 text-center mb-4 d-grid">
                                          <button onClick={() => setIsDetails(true)} style={{borderRadius:"10px"}} className={isDetails==1 ? "btn btn-purple rounded btn-login text-uppercase fw-bold" : "btn btn-off rounded btn-login text-uppercase fw-bold"} type="submit">Details</button>
                                   </div>
                                   <div className="col-lg-6 text-center mb-4 d-grid">
                                          <button onClick={() => setIsDetails(false)} style={{borderRadius:"10px"}} className={isDetails==0 ?  "btn btn-purple rounded btn-login text-uppercase fw-bold" : "btn btn-off rounded btn-login text-uppercase fw-bold"} type="submit">Posts</button>
                                   </div>
                            </div>


                            {isDetails && (<React.Fragment><div className="bg-white mx-3 mb-5 borderRadius-10" style={{borderRadius: "25px"}}>
                                   <h1 className="py-5 mx-5">Details</h1>
                                   <p className="h5 mx-5"><strong><i className="fas fa-briefcase me-5 mb-4" style={{color: "#6351ce"}}></i> {company.name}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-map-marker-alt me-5 mb-4" style={{color: "#6351ce"}}></i> {company.location}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-globe me-5 mb-4" style={{color: "#6351ce"}}></i> {company.website}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-building me-5 mb-4" style={{color: "#6351ce"}}></i> {company.size}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-envelope me-5 mb-4" style={{color: "#6351ce"}}></i> {company.email}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-info-circle me-5 mb-4" style={{color: "#6351ce"}}></i> {company.bio}</strong></p>
                                   <h1 className="py-4 mx-5">Specialities</h1>
                                   <div className="skills-section">
                                          <ul className="ms-5 pb-4 d-flex flex-wrap align-content-between">
                                          {company.specialities.map((speciality, index) => {
                                          return <li className="m-2" key={index}>{speciality}</li>;
                                          })}
                                          </ul>
                                   </div>
                            </div>
                            </React.Fragment>)}


                            {!isDetails && (<React.Fragment>
                                   {company.posts.length>0 ? 
                                   (<div className="col-8 mx-auto">
                                          {mUser._id==company._id && (<div><Link to={`/user/${company._id}/post/create`}><button className="btn btn-purple rounded-3 col-12 p-3 mx-auto mb-5" type="submit"><i class="fas fa-plus"></i><strong>  New Post</strong></button></Link></div>)}
                                          {company.posts.reverse().map((post) => {
                                                 return <Post postId={post._id} key={post._id} refresh={refresh} setRefresh={setRefresh} />
                                          })}
                                   </div>) 
                                   
                                   : (<div className="bg-white m-5 text-center p-5" style={{borderRadius: "25px"}}>
                                          <h1>No posts yet</h1>
                                          {mUser._id==company._id && (<Link to={`/user/${company._id}/post/create`}><button type="button" className="btn btn-purple px-5 mt-3" style={{borderRadius: "25px"}}><strong>New Post</strong></button></Link>)}
                                   </div>)}
                            </React.Fragment>)}


                            </div>)}
                     <Footer />
              </div>
       );
}

export default CompanyProfile;