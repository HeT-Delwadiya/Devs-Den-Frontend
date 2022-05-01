import React from 'react';
import { Redirect } from "react-router-dom";
import { createCompanyProfile, uploadImage } from './helper/userapicalls';
import _ from 'lodash';
import { authenticate } from '../auth/helper';
import { v4 as uuidv4 } from 'uuid';

function CreateComProfile(props) {

       const [values, setValues] = React.useState({
              type: props.data.type,
              email: props.data.email,
              password: props.data.pass,
              name: "",
              avatar: "https://res.cloudinary.com/dev-s-den/image/upload/v1641874500/6ebeb771b8714f3cc70c8da7c1308c11_kofinb.jpg",
              founded: "",
              size: "0-1 employees",
              website: "",
              location: "",
              specialities: "",
              bio: "",
              error: false,
              isLoading: false,
              userId: "",
              didRedirect: false,
              success: false,
              token: ""
       })

       const [image, setImage] = React.useState("");
       const [isUploading, setIsUploading] = React.useState(false);

       const {type, name, avatar, email, password, website, location, size, specialities, founded, bio, error, isLoading, didRedirect, userId, success, token} = values;

       const handleChange = name => event => {
              setValues({...values, error:false, [name]:event.target.value});
       }

       const handleFileChange = event => {
              event.preventDefault();
              setImage(event.target.files[0]);
       }

       const postImage = () => {
              setIsUploading(true);
              if(image=="")
                     return setValues({...values, error:"Please select image before uploading!"});
              const data = new FormData();
              data.append("file",image);
              data.append("upload_preset","devs-den");
              data.append("cloud_name","dev-s-den");
              uploadImage(data)
                     .then(info => {setValues({...values, error:false, avatar:info.secure_url}); setIsUploading(false)})
                     .catch(err => console.log(err))
       }

       const handleSubmit = event => {
              event.preventDefault();
              setValues({...values, isLoading:true});

              let tempSpecialities = _.split(specialities, ',');
              let tempSpecialitiesArr = _.toArray(tempSpecialities)
              let finalSpecialities = _.map(tempSpecialitiesArr, _.trim);
              setValues({...values, specialities: finalSpecialities, error: false, isLoading:true, didRedirect:false});

              const genToken = uuidv4();

              const formdata = {
                     type: type,
                     name: name,
                     email: email,
                     password: password,
                     avatar: avatar,
                     website: website,
                     location: location,
                     bio: bio,
                     size: size,
                     specialities: finalSpecialities,
                     founded: founded,
                     token: genToken
              }

              createCompanyProfile(formdata)
              .then(data => {
                     if (data.error)
                            setValues({...values, error: data.error, isLoading: false});
                     else if (data.Message)
                            setValues({...values, error: data.Message, isLoading: false});
                     else {
                            // authenticate(data, () => {
                            //        setValues({...values, isLoading: false, userId: data.user._id, didRedirect: true});
                            // });
                            setValues({...values, success: true})
                     }
              })
              .catch(err => console.log(err));
              window.scrollTo({
                     top: 0, 
                     behavior: 'smooth'
              });
       }

       // const performRedirect = () => {
       //        if(didRedirect) {
       //               return <Redirect to={`/company/${userId}/profile`} />
       //        }
       // }

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
                     <div className="container mt-3">
                            <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                                   Verification email sent to your account. Please verify your email.
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
                     <div className="container bg-white rounded">
                     <div className="row d-flex justify-content-center align-items-center h-100 card border-0 shadow rounded-3 my-5">
                     <div className="col-12 ">

                            {errorMsg()}
                            {successMsg()}
                            {/* {performRedirect()} */}
                            <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loading()}</div>

                            <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-light fs-5 text-white p-2">Create company profile</h5></div>

                            <div className="row col-8 mx-auto">
                            <div className="col-4">
                            <img src={avatar} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                            </div>
                            <div className="mb-4 col-8 mt-5 pt-3">
                            <input onChange={handleFileChange} class="form-control" type="file" id="formFile"/>
                            <button type="button" onClick={postImage} className="btn btn-purple px-5 mt-3 rounded-3" ><strong>{isUploading ? "Uploading..." : "Upload Logo"}</strong></button>
                            </div>
                            </div>

                            <div className="form-floating mb-4 col-8 mx-auto">
                            <input type="text" onChange={handleChange("name")} value={name} className="form-control" id="floatingInput" placeholder="John Cena"/>
                            <label className="ph-gray" htmlFor="floatingInput">Company name*</label>
                            </div>

                            <div className="form-floating mb-4 col-8 mx-auto">
                            <input type="text" onChange={handleChange("website")} value={website} className="form-control" id="floatingInput" placeholder="John Cena"/>
                            <label className="ph-gray" htmlFor="floatingInput">Company's website*</label>
                            </div>

                            <div className="form-floating mb-4 col-8 mx-auto">
                            <input type="text" onChange={handleChange("location")} value={location} className="form-control" id="floatingInput" placeholder="John Cena"/>
                            <label className="ph-gray" htmlFor="floatingInput">Company's location*</label>
                            </div>

                            <div className="form-floating col-8 mx-auto">
                            <input type="text" onChange={handleChange("founded")} value={founded} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                            <label className="ph-gray" htmlFor="floatingInput">founded in*</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>year in which your company is founded.</small></div>

                            <div className=" col-8 mx-auto theme-color mb-4">
                            <select className="form-select" defaultValue={"0-1 employees"} value={size} onChange={handleChange("size")} aria-label="Default select example">
                            <option value="0-1 employees">0-1 employees</option>
                            <option value="2-10 employees">2-10 employees</option>
                            <option value="11-50 employees">11-50 employees</option>
                            <option value="51-200 employees">51-200 employees</option>
                            <option value="200+ employees">200+ employees</option>
                            </select>
                     </div>

                     <div className="form-floating col-8 mx-auto">
                            <input type="text" onChange={handleChange("specialities")} value={specialities} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                            <label className="ph-gray" htmlFor="floatingInput">Specialities*</label>
                     </div>
                     <div className="col-8 mx-auto theme-color mb-4"><small>Give us an idea of your area of specialities. please add a comma after each technologies.</small></div>

                     <div className="form-floating col-8 mx-auto">
                            <textarea onChange={handleChange("bio")} value={bio} className="form-control" id="floatingInput" placeholder="John Cena" rows="5" style={{height:"150px"}}></textarea>
                            <label htmlFor="floatingInput" className="ph-gray">Bio*</label>
                     </div>
                     <div className="col-8 mx-auto theme-color mb-4"><small>tagline of your company.</small></div>
                     <hr className="my-4 col-8 mx-auto"/>

                     <div className="col-8 mx-auto d-grid mb-5">
                            <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">{isLoading ? "Loading..." : "Submit"}</button>
                     </div>

                     </div>
                     </div>
                     </div>
              </div>
       );
}

export default CreateComProfile;