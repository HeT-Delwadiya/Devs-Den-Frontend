import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Footer from '../core/components/Footer';
import Header from '../core/components/Header';
import { uploadImage } from '../user/helper/userapicalls';
import { createGroup } from './helper/comapicalls';

function CreateGroup() {

       const {user, authtoken} = isAuthenticated();

       const [values, setValues] = React.useState({
              groupName: "",
              groupLogo: "https://res.cloudinary.com/dev-s-den/image/upload/v1641897603/group_placeholder_bscdhj.png",
              groupDescription: "",
              groupInviteLink: "",
              groupadminId: user._id,
              groupMembers: [user._id]
       })
       const [image, setImage] = React.useState("");
       const [isUploading, setIsUploading] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(false);
       const [error, setError] = React.useState(false);
       const [isCopied, setIsCopied] = React.useState(false);

       const {groupName, groupLogo, groupDescription, groupInviteLink, groupadminId} = values;

       const handleChange = name => event => {
              setValues({...values, [name]:event.target.value});
              setError(false);
              setIsCopied(false);
       }

       const handleFileChange = event => {
              event.preventDefault();
              setImage(event.target.files[0]);
              setError(false);
              setIsCopied(false);
       }

       const postImage = () => {
              if(image=="")
                     return setError("Please select image before upload!")
              setIsUploading(true);
              const data = new FormData();
              data.append("file",image);
              data.append("upload_preset","devs-den");
              data.append("cloud_name","dev-s-den");
              uploadImage(data)
                     .then(info => {setValues({...values, groupLogo:info.secure_url}); setIsUploading(false)})
                     .catch(err => console.log(err))
       }

       const handleSubmit = (event) => {
              event.preventDefault();
              if (isUploading)
                     return setError("Please wait, Logo is uploading...")
              if (groupName=="" || groupDescription=="")
                     return setError("Please fill required details!")
              setIsLoading(true);
              createGroup(values, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setIsLoading(false);
                            setValues({...values, groupName: "", groupDescription: "", groupInviteLink: data.groupInviteLink});
                     }
              })
              .catch(err => console.log(err))
       }

       const handleCopy = () => {
              var copyText = document.getElementById("sharelink");
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              navigator.clipboard.writeText(copyText.value);
              setIsCopied(true);
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
                            <div className="alert alert-success text-center" style={{display: isCopied ? "" : "none"}}>
                                   InviteLink copied to clipboard successfully.
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
                            <div className="container bg-white rounded-3 shadow pt-3 pb-3 mb-5 mt-5">
                                   <div className="p-3">
                                          {errorMsg()}
                                          {successMsg()}
                                          
                                          <div className="theme-bg rounded col-5 mx-auto">
                                                 <h5 className="text-center fw-bold fs-5 text-white p-2">Create new group</h5>
                                          </div>

                                          <div className="row col-8 mx-auto align-item-center">
                                                 <div className="col-4 mt-4">
                                                        <img src={groupLogo} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                                                 </div>
                                                 <div className="mb-4 col-8 mt-5 pt-3">
                                                        <input onChange={handleFileChange} class="form-control" type="file" id="formFile"/>
                                                        <button type="button" onClick={postImage} className="btn btn-purple px-5 mt-3 rounded-3"><strong>{isUploading ? "Uploading..." : "Upload logo"}</strong></button>
                                                 </div>
                                          </div>
                                          <div className="position-absolute top-50 start-50">{loading()}</div>
                                          <div className="form-floating mb-4 mt-5 col-8 mx-auto">
                                                 <input type="text" onChange={handleChange("groupName")} value={groupName} className="form-control" id="floatingInput" placeholder="John Cena"/>
                                                 <label className="ph-gray" htmlFor="floatingInput">Group name*</label>
                                          </div>

                                          <div className="form-floating col-8 mx-auto mb-5">
                                                 <textarea onChange={handleChange("groupDescription")} value={groupDescription} className="form-control" id="floatingInput" placeholder="John Cena" rows="5" style={{height:"150px"}}></textarea>
                                                 <label htmlFor="floatingInput" className="ph-gray">Group Description*</label>
                                          </div>

                                          <div className="col-8 mx-auto d-grid mb-5">
                                                 <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" >{groupInviteLink ? "Created" : isLoading ? "Loading..." : "Create"}</button>
                                          </div>

                                          <div className="col-8 mx-auto mb-5">
                                                 {!groupInviteLink=="" &&(<div className="d-flex d-flex-row">
                                                 <div className="mb-4 mx-auto w-100 me-3">
                                                        <input type="text" value={groupInviteLink} className="form-control p-3" id="sharelink" placeholder="John Cena" disabled/>
                                                 </div>
                                                 <div className="mx-auto mb-5">
                                                        <button onClick={handleCopy} style={{borderRadius:"10px"}} className="btn btn-purple rounded p-3 text-uppercase fw-bold" type="submit"><i class="fas fa-copy"></i></button>
                                                 </div>
                                                 </div>)}
                                          </div>
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default CreateGroup;