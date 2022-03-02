import React from 'react';
import { Redirect } from "react-router-dom";
import { updateComProfile, getCompanyById, uploadImage, deleteComAcc } from './helper/userapicalls';
import _ from 'lodash';
import { isAuthenticated, logout } from '../auth/helper';
import Header from '../core/components/Header';
import Footer from '../core/components/Footer';

function EditComProfile(props) {

       const companyId = props.match.params.companyId;
       const {authtoken} = isAuthenticated(); 

       const [values, setValues] = React.useState({
              type: 1,
              email: "",
              name: "",
              avatar: "https://res.cloudinary.com/dev-s-den/image/upload/v1641874500/6ebeb771b8714f3cc70c8da7c1308c11_kofinb.jpg",
              founded: "",
              size: "",
              website: "",
              location: "",
              specialities: "",
              bio: "",
              error: false,
              isLoading: false,
              didRedirect: false
       })

       const [image, setImage] = React.useState("");
       const [isUploading, setIsUploading] = React.useState(false);
       const [isUploaded, setIsUploaded] = React.useState(false);
       const [company, setCompany] = React.useState({});

       const {type, name, avatar, email, password, website, location, size, specialities, founded, bio, error, isLoading, didRedirect} = values;

       const loadCompanyData = () => {
              setValues({...values, isLoading:true});
              getCompanyById(companyId, authtoken).then(data => {
                     if(data.error)
                            setValues({...values, error:data.error});
                     else {
                            setCompany(data);
                            setValues({...values, email: data.email, name: data.name, avatar: data.avatar, founded: data.founded, size: data.size, website: data.website, location: data.location, specialities: data.specialities, bio: data.bio})
                     }
              })
              .catch(err => console.log(err));
              setValues({...values, isLoading:false});
       }

       React.useEffect(() => {
              loadCompanyData();
       }, [companyId]);

       const handleChange = name => event => {
              setValues({...values, error:false, [name]:event.target.value});
       }

       const handleFileChange = event => {
              event.preventDefault();
              setImage(event.target.files[0]);
              setIsUploaded(false);
       }

       const postImage = () => {
              if(image=="")
                     return setValues({...values, error:"Please select image before uploading!"});
              setIsUploading(true);
              const data = new FormData();
              data.append("file",image);
              data.append("upload_preset","devs-den");
              data.append("cloud_name","dev-s-den");
              uploadImage(data)
                     .then(info => {setValues({...values, error:false, avatar:info.secure_url}); setIsUploading(false); setIsUploaded(true)})
                     .catch(err => console.log(err))
       }

       const handleSubmit = event => {
              event.preventDefault();
              setValues({...values, isLoading:true});

              let tempSpecialities = _.split(specialities, ',');
              let tempSpecialitiesArr = _.toArray(tempSpecialities)
              let finalSpecialities = _.map(tempSpecialitiesArr, _.trim);
              setValues({...values, specialities: finalSpecialities, error: false, isLoading:true, didRedirect:false});

              const formdata = {
                     type: type,
                     name: name,
                     email: email,
                     avatar: avatar,
                     website: website,
                     location: location,
                     bio: bio,
                     size: size,
                     specialities: finalSpecialities,
                     founded: founded
              }

              updateComProfile(companyId, formdata, authtoken)
              .then(data => {
                     if (data.error)
                            setValues({...values, error: data.error, isLoading: false});
                     else if (data.Message)
                            return setValues({...values, error: data.Message, isLoading: false});
                     else {
                            setValues({...values, isLoading: false, didRedirect: true});
                     }
              })
              .catch(err => console.log(err));
       }

       const deleteAccount = () => {
              deleteComAcc(companyId, authtoken)
              .then(data => {
                     if (data.error)
                            setValues({...values, error: data.error, isLoading: false});
                     else {
                            logout(() => {
                                   props.history.push("/");
                            });
                     }
              })
              .catch(err => console.log(err));
       }

       const performRedirect = () => {
              if(didRedirect) {
                     return <Redirect to={`/company/${companyId}/profile`} />
              }
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

       const deleteAccPopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteAccPop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete your account?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={deleteAccount} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div>
                     <Header myAccount={true} />
                            <div className="container bg-white rounded">
                            <div className="row d-flex justify-content-center align-items-center h-100 card border-0 shadow rounded-3 my-5">
                            <div className="col-12 ">

                                   {errorMsg()}
                                   {performRedirect()}
                                   {deleteAccPopup()}
                                   <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loading()}</div>

                                   <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Update company profile</h5></div>

                                   <div className="row col-8 mx-auto">
                                   <div className="col-4">
                                   <img src={avatar} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                                   </div>
                                   <div className="mb-4 col-8 mt-5 pt-3">
                                   <input onChange={handleFileChange} class="form-control" type="file" id="formFile"/>
                                   <button type="button" onClick={postImage} className="btn btn-purple px-5 mt-3 rounded-3" ><strong>{isUploaded ? "Uploaded" : (isUploading ? "Uploading..." : "Upload Logo")}</strong></button>
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
                                   <select className="form-select ph-gray" defaultValue={"0-1 employees"} value={size} onChange={handleChange("size")} aria-label="Default select example">
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
                                   <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">{isLoading ? "Loading..." : "Update"}</button>
                            </div>

                            <div className="col-8 mx-auto d-grid mb-5">
                                   <button  style={{borderRadius:"10px"}} data-bs-toggle="modal" data-bs-target="#deleteAccPop" className="btn btn-danger rounded btn-login text-uppercase fw-bold" type="submit" >Delete Account</button>
                            </div>

                            </div>
                            </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default EditComProfile;