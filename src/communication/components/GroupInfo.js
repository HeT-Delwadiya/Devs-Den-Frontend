import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import Footer from '../../core/components/Footer';
import Header from '../../core/components/Header';
import { deleteGroup, getGroupById, removeMemberFromGroup } from '../helper/comapicalls';

function GroupInfo(props) {

       const groupId = props.match.params.groupId;
       const {user, authtoken} = isAuthenticated();

       const [group, setGroup] = React.useState({});
       const [error, setError] = React.useState(false);
       const [success, setSuccess] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);
       const [isProcessing, setIsProcessing] = React.useState(false);
       const [mem, setMem] = React.useState("");

       const loadData = () => {
              getGroupById(groupId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsLoading(false);
                            setGroup(data);
                     }
              })
              .catch(err => console.log(err))
       }

       React.useEffect(() => {
              loadData();
       }, []);

       const handleLeave = (event) => {
              event.preventDefault();
              setIsProcessing(true);
              removeMemberFromGroup({adminId:group.groupadminId,userId:user._id}, groupId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsProcessing(false);
                            setGroup(data);
                            setSuccess("You left the group.");
                     }
              })
              .catch(err => console.log(err))
       }

       const handleRemoveMember = (event) => {
              event.preventDefault();
              setIsProcessing(true);
              removeMemberFromGroup({adminId:group.groupadminId,userId:mem}, groupId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsProcessing(false);
                            setGroup(data);
                            setSuccess("You removed group member successfully!");
                     }
              })
              .catch(err => console.log(err))
       }

       const handleDelGroup = (event) => {
              event.preventDefault();
              setIsProcessing(true);
              deleteGroup({adminId:user._id}, groupId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsProcessing(false);
                            setSuccess("Group deleted successfully!");
                     }
              })
              .catch(err => console.log(err))
       }

       const deleteConPopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteConPop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete this group?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDelGroup} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const deleteLeavePopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteLeavePop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to leave this group?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleLeave} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Leave</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const removeMemberPopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteMemberPop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to remove this member from group?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleRemoveMember} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Remove</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
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
                            <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                                   {success} <Link to={"/conversations/all"}>Click here</Link> to go back to conversations.
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
                     <Header msg={true} />
                            {group && (<div className="container bg-white rounded-3 shadow pt-3 pb-3 mb-5 mt-5">
                                   <div className="p-3">
                                          {errorMsg()}
                                          {successMsg()}
                                          {deleteConPopup()}
                                          {deleteLeavePopup()}
                                          {removeMemberPopup()}
                                          <div className="position-absolute top-50 start-50 translate-middle mt-1 ms-4 ps-4">{loading()}</div>
                                          <div className="theme-bg rounded col-5 mx-auto mb-4">
                                                 <h5 className="text-center fw-bold fs-5 text-white p-2 mb-3">Group Information</h5>
                                          </div>

                                          <div className="row col-8 mx-auto align-item-center mt-5 mb-5">
                                                 <div className="col-3 text-end pe-3">
                                                        <img src={group.groupLogo} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                                                 </div>
                                                 <div className="mb-4 col-9 mt-4 ps-5">
                                                        <h3 className="fw-bold">{group.groupName}</h3>
                                                        <h5>{group.groupDescription}</h5>
                                                 </div>
                                          </div>

                                          {group?.groupMembers?.map((member, index) => {
                                                 return (<div className="row col-5 mx-auto align-items-center m-3 text-white theme-bg rounded-3 shadow" key={member._id} >
                                                        {user._id!=group?.groupadminId ?(<>
                                                        <div className="col-4 text-end">
                                                               <img className="rounded-circle m-1" src={member.avatar} style={{height: "50px", width: "50px"}} />
                                                        </div>
                                                        <div className="col-8">
                                                               <h5 className="m-1 fw-bold" >{member.name} {member._id==group.groupadminId && (<span className="badge bg-dark ms-3">Admin</span>)}</h5>
                                                        </div>
                                                        </>):(<>
                                                        <div className="col-3 text-end">
                                                               <img className="rounded-circle m-1" src={member.avatar} style={{height: "50px", width: "50px"}} />
                                                        </div>
                                                        <div className="col-7">
                                                               <h5 className="m-1 fw-bold" >{member.name} {member._id==group.groupadminId && (<span className="badge bg-dark ms-3">Admin</span>)}</h5>
                                                        </div>
                                                        {member._id!=group?.groupadminId && (<div className="col-2">
                                                               <button className="btn btn-light rounded-3" onClick={() => setMem(member._id)} type="submit" data-bs-toggle="modal" data-bs-target="#deleteMemberPop"><i className="fas fa-trash"></i></button>
                                                        </div>)}
                                                        </>)}
                                                        
                                                 </div>)
                                          })}

                                          {user._id != group.groupadminId ? (<div className="col-8 mx-auto d-grid mt-5 mb-5">
                                                 <button data-bs-toggle="modal" data-bs-target="#deleteLeavePop" style={{borderRadius:"10px"}} className={success=="You left the group." ? "btn btn-danger rounded btn-login text-uppercase fw-bold disabled" : "btn btn-danger rounded btn-login text-uppercase fw-bold"} type="submit" >{success=="You left the group." ? "You Left" : isProcessing ? "Leaving..." : "Leave Group"}</button>
                                          </div>) : (<div className="col-8 mx-auto d-grid mt-5 mb-5">
                                                 <button data-bs-toggle="modal" data-bs-target="#deleteConPop" style={{borderRadius:"10px"}} className={success=="Group deleted successfully!" ? "btn btn-danger rounded btn-login text-uppercase fw-bold disabled" : "btn btn-danger rounded btn-login text-uppercase fw-bold"} type="submit" >{success=="Group deleted successfully!" ? "Group Deleted" : isProcessing ? "Deleting..." : "Delete Group"}</button>
                                          </div>)}
                                                 
                                   </div>
                            </div>)}
                     <Footer />
              </div>
       );
}

export default GroupInfo;