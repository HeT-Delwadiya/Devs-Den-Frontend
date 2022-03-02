import React from 'react';
import Footer from '../core/components/Footer';
import Header from '../core/components/Header';
import { getGroupById, addMemberToGroup } from './helper/comapicalls';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

function JoinGroup(props) {

       const groupId = props.match.params.groupId;
       const {user, authtoken} = isAuthenticated();

       const [group, setGroup] = React.useState({});
       const [isLoading, setIsLoading] = React.useState(true);
       const [error, setError] = React.useState(false);
       const [isJoined, setIsJoined] = React.useState(false);
       const [members, setMembers] = React.useState([]);

       const loadGroupDetails = () => {
              getGroupById(groupId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setGroup(data);
                            setMembers(data.groupMembers);
                            data.groupMembers.map((member) => {
                                   if(member._id==user._id)
                                          setIsJoined(true)
                            })
                            setIsLoading(false);
                     }
              })
              .catch(err => console.log(err))
              setIsLoading(false)
       }

       React.useEffect(() => {
              loadGroupDetails();
       }, []);

       const handleJoin = (event) => {
              event.preventDefault();
              setIsLoading(true);
              addMemberToGroup(groupId, {userId:user._id}, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsJoined(true);
                            setGroup(data);
                            setMembers(data.groupMembers);
                            setIsLoading(false);
                     }
              })
              .catch(err => console.log(err))
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

       const successMsg = () => {
              return (
                     <div className="container">
                            <div className="alert alert-success text-center" style={{display: isJoined ? "" : "none"}}>
                                   You are in {group.groupName}. <Link to={"/conversations/all"}>Click here</Link> to check out the group activity. 
                            </div>
                     </div>
              );
       }

       const loading = () => {
              return <div className="custom-loading" style={{display: isLoading ? "" : "none"}}>
                     <ul className="ms-5">
                            <li> </li>
                            <li> </li>
                            <li> </li>
                            <li> </li>
                     </ul>
              </div>
       }

       return (
              <div>
                     <Header  msg={true} />
                            {group._id!="" && (<div className="container bg-white rounded-3 shadow pt-3 pb-3 mb-5 mt-5">
                                          <div className="p-3 text-center">
                                                 {errorMsg()}
                                                 {successMsg()}
                                                 <div className="position-absolute top-50 start-50 translate-middle mt-5 ms-4 ps-4 pt-4">{loading()}</div>
                                                 <div className="theme-bg rounded col-5 mx-auto">
                                                        <h5 className="text-center fw-bold fs-5 text-white p-2">Join group</h5>
                                                 </div>

                                                 <div className="row col-8 mx-auto align-item-center">
                                                        <div className="mt-4">
                                                               <img src={group.groupLogo} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                                                        </div>
                                                 </div>

                                                 <div className="form-floating mb-4 mt-3 col-8 mx-auto">
                                                        <h4 className="fw-800"><strong>{group.groupName}</strong></h4>
                                                 </div>

                                                 <div className="form-floating col-8 mx-auto mb-4">
                                                        <h6>{group.groupDescription}</h6>
                                                 </div>

                                                 <div className="form-floating col-8 mx-auto mb-5">
                                                        <h6>Total members: {members.length}</h6>
                                                 </div>

                                                 {isJoined ? (<div className="col-8 mx-auto d-grid mb-5">
                                                        <button onClick={handleJoin} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" disabled>Already Joined</button>
                                                 </div>) :(<div className="col-8 mx-auto d-grid mb-5">
                                                        <button onClick={handleJoin} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" >{isLoading ? "Loading..." : "Join"}</button>
                                                 </div>)}
                                          </div>
                                   </div>)}
                     <Footer />
              </div>
       );
}

export default JoinGroup;