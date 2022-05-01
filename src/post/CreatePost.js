import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Footer from '../core/components/Footer';
import Header from '../core/components/Header';
import { uploadImage } from '../user/helper/userapicalls';
import { Link } from "react-router-dom";
import { createPost } from './helper/postapicalls';


function CreatePost() {

       const [description, setDescription] = React.useState("")
       const [image, setImage] = React.useState("")
       const [imageUrl, setImageUrl] = React.useState("")
       const [isUploading, setIsUploading] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(false);
       const [isUploaded, setIsUploaded] = React.useState(false);
       const [success, setSuccess] = React.useState(false);
       const [error, setError] = React.useState(false);

       const {user, authtoken} = isAuthenticated();

       const handleChange = (event) => {
              setDescription(event.target.value);
              setError(false);
              setIsLoading(false);
       }

       const handleFileChange = event => {
              event.preventDefault();
              setIsUploaded(false);
              setImage(event.target.files[0]);
              setError(false);
              setIsLoading(false);
       }

       const postImage = () => {
              if(image=="")
                     return setError("Please select image before uploading!")
              setIsUploading(true);
              const data = new FormData();
              data.append("file",image);
              data.append("upload_preset","devs-den-posts");
              data.append("cloud_name","dev-s-den");
              uploadImage(data)
                     .then(info => {setImageUrl(info.secure_url); setIsUploading(false); setIsUploaded(true)})
                     .catch(err => setError(err))
       }

       const handleSubmit = (event) => {
              event.preventDefault();
              setIsLoading(true);

              var userType;
              if(user.type) {
                     userType = "Company";
              } else {
                     userType = "User";
              }
              const data = {
                     description: description,
                     userType: userType,
                     imageUrl: imageUrl,
                     user: user._id
              }
              createPost(data, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setSuccess(true); 
                                   setDescription("");
                                   setImageUrl("");
                                   setImage("");
                                   setIsUploaded(false)
                            }
                     })
                     .catch(err => setError(err))
              setIsLoading(false);
              window.scrollTo({
                     top: 0, 
                     behavior: 'smooth'
              });
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
                                   Congratulations! Post created successfully. <Link to={user.type==0 ? `/user/${user._id}/profile`:`/company/${user._id}/profile`}>Click here</Link> to goto your profile.
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
                     <Header />
                            <div className="container">
                            {errorMsg()}
                            {successMsg()}
                                   <div className="bg-white mx-3 mb-5 borderRadius-10" style={{borderRadius: "25px"}}>
                                          <div className="row">

                                                 <div className="theme-bg col-4 text-white text-center rounded-3 d-inline mt-4 ms-5 mb-5"><h1 className="pt-2">Create new post</h1></div>

                                                 <div className="form-floating col-8 ms-5 mb-5">
                                                        <textarea onChange={handleChange} value={description} className="form-control" id="floatingInput" placeholder="John Cena" rows="5" style={{height:"150px"}}></textarea>
                                                        <label htmlFor="floatingInput" className="ps-4">Description</label>
                                                 </div>
                                                 <div className="position-fixed top-40 start-50 translate-middle">{loading()}</div>
                                                 <div className="mb-4 col-8 ms-5 pt-3">
                                                        {isUploaded && (<img src={imageUrl} className="mb-3" style={{height: "200px", width: "200px"}} />)}
                                                        <div className="row">
                                                               <div className="col-8">
                                                                      <input onChange={handleFileChange} className="form-control" type="file" id="formFile"/>
                                                               </div>
                                                               <div className="col-4">
                                                                      <button type="button" onClick={postImage} className="btn btn-purple px-5 rounded-3"><strong>{isUploaded ? "Uploaded" : (isUploading ? "Uploading..." : "Upload Image")}</strong></button>
                                                               </div>
                                                        </div>
                                                 </div>

                                                 {success ? (<div className="col-8 ms-5 mt-5 d-grid mb-5">
                                                        <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" disabled>Posted</button>
                                                 </div>) : (<div className="col-8 ms-5 mt-5 d-grid mb-5">
                                                        <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" >{isLoading ? "Posting..." : "Post"}</button>
                                                 </div>)}

                                          </div>
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default CreatePost;