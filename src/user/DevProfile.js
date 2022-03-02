import React from 'react';
import Header from "../core/components/Header";
import Footer from "../core/components/Footer";
import { getUserById, getUserRepos, unfollow, follow } from './helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
import { Link } from "react-router-dom";
import Post from '../post/components/Post';
import { getConversationByMemberId, createConversation } from '../communication/helper/comapicalls';

function DevProfile(props) {

       const userId = props.match.params.userId;
       const {user: mUser, authtoken} = isAuthenticated();

       const [user, setUser] = React.useState({});
       const [repos, setRepos] = React.useState([]);
       const [showRepos, setShowRepos] = React.useState(false);
       const [error, setError] = React.useState(false);
       const [isDetails, setIsDetails] = React.useState(true);
       const [isFollowing, setIsFollowing] = React.useState(false);
       const [isFollowable, setIsFollowable] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);
       const [refresh, setRefresh] = React.useState(false);

       const loadUser = () => {
              setIsLoading(true);
              getUserById(userId, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error);
                     else {
                            setUser(data);
                            if (data.github!="") {
                                   getUserRepos(data.github)
                                   .then(data2 => {
                                          if(data2.error)
                                                 setError(data2.error);
                                          else {
                                                 setRepos(data2);
                                          }
                                   })
                                   .catch(err => console.log(err));
                            }
                            if(mUser._id == data._id) {
                                   setIsFollowable(false)
                            } else if (mUser.type==1) {
                                   setIsFollowable(false);
                            } else {
                                   setIsFollowable(true)
                            }
                            data.followers.map((follower) => {
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
              loadUser();
       }, []);

       React.useEffect(() => {
              loadUser();
       }, [userId, refresh]);

       React.useEffect(() => {
              repos.length>0 ? setShowRepos(true) : setShowRepos(false);
       }, [repos]);

       const onClickFollowBtn = (event) => {
              event.preventDefault();
              setIsLoading(true);
              let data = {
                     mUserId: mUser._id,
                     mUserType: mUser.type,
                     userId: user._id,
                     userType: user.type
              }
              if(isFollowing) {
                     unfollow(data, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setIsFollowing(false)
                                   setUser(data)
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
                                   setUser(data)
                            }
                     })
                     .catch(err => console.log(err));
              }
              setIsLoading(false);
       }

       const handleSendMsg = (event) => {
              event.preventDefault();
              getConversationByMemberId({userId, otherId:mUser._id}, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error)
                     else if (!data._id) {
                            createConversation({members: [mUser._id, userId], isGroup: false}, authtoken)
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
                     <Header myAccount={props.match.params.userId==mUser._id ? true : false} />
                            <div className="container mt-4">
                            {errorMsg()}
                            <div className="position-fixed top-50 start-50 translate-middle">{loading()}</div>
                            {user._id && (<div>
                            <div className="theme-bg mx-3 mb-5 borderRadius-10" style={{borderRadius: "25px"}}>
                                   <div className="row">
                                   <div className="col-lg-3 col-md-5 col-sm-12">
                                          <img src={user.avatar} className="rounded-circle ms-5 mt-5 mb-5 me-5"  style={{height: "200px", width: "200px"}}/>
                                   </div>
                                   <div className="col-lg-4 col-md-6 col-sm-12 my-auto">
                                          <h1 className="text-white fw-bold">{user.name}</h1>
                                          <h3 className="text-white">{user.field}</h3>
                                          <h5 className="text-white mt-3">{user.following.length+user.followingCompanies.length}   <span className="fw-lighter"><small>Followings</small></span>      {user.followers.length}   <span className="fw-lighter"><small>Followers</small></span></h5>
                                          {isFollowable && (<button type="button" onClick={onClickFollowBtn} className="btn btn-light px-5 mt-3" style={{borderRadius: "25px"}}><strong>{isFollowing ? "Unfollow" : "Follow"}</strong></button>)}
                                          {mUser._id && userId && userId==mUser._id ? "" : (<button type="button" onClick={handleSendMsg} style={{borderRadius: "25px"}} class={isFollowable ? "btn btn-dark px-3 mt-3 ms-3":"btn btn-dark px-3 mt-3"}><strong><i class="fa-solid fa-paper-plane"></i> Send Message</strong></button>)}
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
                                   <p className="h5 mx-5"><strong><i className="fas fa-user me-5 mb-4" style={{color: "#6351ce"}}></i> {user.name}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-map-marker-alt me-5 mb-4" style={{color: "#6351ce"}}></i> {user.location}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-building me-5 mb-4" style={{color: "#6351ce"}}></i> {user.field} {user.company && " at " + user.company}</strong></p>
                                   <p className="h5 mx-5"><strong><i className="fas fa-info-circle me-5 mb-4" style={{color: "#6351ce"}}></i> {user.bio}</strong></p>
                                   <h1 className="py-4 mx-5">Skills</h1>
                                   <div className="skills-section">
                                          <ul className="ms-5 pb-4 d-flex flex-wrap align-content-between">
                                          {user.skills.map((skill, index) => {
                                                 return <li className="m-2" key={index}>{skill}</li>;
                                          })}
                                          </ul>
                                   </div>
                     
                                   <div className="row ms-2">
                                   <div className="col-5 bg-white mx-3 mb-5 borderRadius-10 shadow pb-5" style={{borderRadius: "25px"}}>
                                          <h1 className="py-5 mx-5 theme-color">Experience</h1>
                                          <p className="h5 mx-5"><strong>{user.experience.jobtitle} at {user.experience.jobcompany}</strong></p>
                                          <p className="h5 mx-5">Position: {user.experience.jobposition}</p>
                                          <p className="h5 mx-5">{user.experience.jobfrom} - {user.experience.jobto=="" ? "Current" : user.experience.jobto}, {user.experience.joblocation}</p>
                                   </div>
                                   <div className="col-5 bg-white mx-3 mb-5 borderRadius-10 shadow pb-5" style={{borderRadius: "25px"}}>
                                          <h1 className="py-5 mx-5 theme-color">Education</h1>
                                          <p className="h5 mx-5"><strong>{user.education.degree} at {user.education.college}</strong></p>
                                          <p className="h5 mx-5">Field: {user.education.fieldofstudy}</p>
                                          <p className="h5 mx-5">{user.education.from} - {user.education.to=="" ? "Current" : user.education.to}, {user.education.locationClg}</p>
                                   </div>
                                   </div>
                            </div>


                            {repos?.length>0 && (<div className='github-repos m-3 pb-3'>
                                   <h3 className='p-5'>
                                   <i className='fab fa-github'></i> Github Repos 
                                   </h3>
                                   
                                   {repos?.map((repo) => {
                                          return (
                                                 <div className='repo ms-5 me-5' key={repo._id}>
                                                 <div className='row mb-3'>
                                                 
                                                 <div className='col-8 m-5'>
                                                 <h5 className='mt-2'>
                                                        <a
                                                               style={{ color: '#000', textDecoration: 'none' }}
                                                               href={repo.html_url}
                                                               target='_blank'
                                                               rel='noopener noreferrer'
                                                               >
                                                               {' '}
                                                               {repo.name}
                                                        </a>
                                                 </h5>
                                                 <p>{repo.description}</p>
                                                 
                                                 </div>
                                          
                                                 <div className='col-2 m-5'> 
                                                 <ul>
                                                        <li>
                                                               <strong>Stars: </strong>
                                                               {repo.stargazers_count}
                                                        </li>
                                                        <li>
                                                               <strong>Forks: </strong>
                                                               {repo.forks_count}
                                                        </li>
                                                        <li>
                                                               <strong>Watchers: </strong>
                                                               {repo.watchers_count}
                                                        </li>
                                                 </ul>
                                                 </div>

                                                 </div>
                                                 </div>
                                          );
                                   })}
                            </div>)}</React.Fragment>)}


                            {!isDetails && (<React.Fragment>
                                   
                                   {user.posts.length>0 ? 
                                   (<div className="col-8 mx-auto">
                                          {mUser._id==user._id && (<div><Link to={`/user/${user._id}/post/create`}><button className="btn btn-purple rounded-3 col-12 p-3 mx-auto mb-5" type="submit"><i class="fas fa-plus"></i><strong>  New Post</strong></button></Link></div>)}
                                          {user.posts.reverse().map((post) => {
                                                 return <Post postId={post._id} key={post._id} refresh={refresh} setRefresh={setRefresh} />
                                          })}
                                   </div>) 
                                   
                                   : (<div className="bg-white m-5 text-center p-5" style={{borderRadius: "25px"}}>
                                          <h1>No posts yet</h1>
                                          {mUser._id==user._id && (<Link to={`/user/${user._id}/post/create`}><button type="button" className="btn btn-purple px-5 mt-3" style={{borderRadius: "25px"}}><strong>New Post</strong></button></Link>)}
                                   </div>)}
                            </React.Fragment>)}


                            </div>)}
                            </div>
                     <Footer />
              </div>
       );
}

export default DevProfile;