import React from 'react';
import { Redirect } from "react-router-dom";
import { createDevProfile, uploadImage } from './helper/userapicalls';
import _ from 'lodash';
import { authenticate } from '../auth/helper';
import { v4 as uuidv4 } from 'uuid';

function CreateDevProfile(props) {

       const [values, setValues] = React.useState({
              type: props.data.type,
              name:"",
              email: props.data.email,
              password: props.data.pass,
              avatar: "https://res.cloudinary.com/dev-s-den/image/upload/v1641874500/6ebeb771b8714f3cc70c8da7c1308c11_kofinb.jpg",
              field: "Software Developer",
              company: "",
              website: "",
              location: "",
              skills: "",
              github: "",
              bio: "",
              education: {},
              experience: {},
              error:"",
              success: false,
              didRedirect: false,
              isLoading: false,
              userId: "",
              token: ""
       });

       const [education, setEducation] = React.useState({
              college: "",
              degree: "",
              fieldofstudy: "",
              locationClg: "",
              from: "",
              to: ""
       });

       const [experience, setExperience] = React.useState({
              jobtitle: "",
              jobcompany: "",
              jobposition: "",
              joblocation: "",
              jobfrom: "",
              jobto: ""
       });

       const [cur, setCur] = React.useState(false);
       const [curJob, setCurJob] = React.useState(false);
       const [image, setImage] = React.useState("");
       const [isUploading, setIsUploading] = React.useState(false);

       const {college, degree, fieldofstudy, locationClg, from, to} = education;

       const {jobtitle, jobcompany, jobposition, joblocation, jobfrom, jobto} = experience;

       const {type, name, email, password, avatar, field, company, website, location, skills, github, bio, error, success, isLoading, didRedirect, userId, token} = values;

       const handleChange = name => event => {
              setValues({...values, error:false, [name]:event.target.value});
       }

       const handleFileChange = event => {
              event.preventDefault();
              setImage(event.target.files[0]);
       }

       const handleEduChange = name => event => {
              setEducation({...education, [name]:event.target.value});
       }

       const handleExpChange = name => event => {
              setExperience({...experience, [name]:event.target.value});
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
                     .then(info => {setValues({...values, error:false, avatar:info.secure_url}); setIsUploading(false)})
                     .catch(err => console.log(err))
       }

       const handleSubmit = event => {
              event.preventDefault();
              setValues({...values, isLoading: true})
              if (cur) {
                     setEducation({...education, to: "current"});
              }
              if (curJob) {
                     setExperience({...experience, jobto: "current"});
              }
              let tempSkills = _.split(skills, ',');
              let tempSkillsArr = _.toArray(tempSkills)
              let finalSkills = _.map(tempSkillsArr, _.trim);
              setValues({...values, skills: finalSkills, education: education, experience: experience, error: false, didRedirect:false});

              const genToken = uuidv4();

              const formdata = {
                     type: type,
                     name: name,
                     email: email,
                     password: password,
                     avatar: avatar,
                     field: field,
                     company: company,
                     website: website,
                     location: location,
                     skills: finalSkills,
                     github: github,
                     bio: bio,
                     education: education,
                     experience: experience,
                     token: genToken
              }

              createDevProfile(formdata)
              .then(data => {
                     if (data.error)
                            setValues({...values, error: data.error, isLoading: false});
                     else if (data.Message)
                            setValues({...values, error: data.Message, isLoading: false});
                     else {
                            // authenticate(data, () => {
                            //        setValues({...values, isLoading:false, userId:data.user._id, didRedirect: true});
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
       //               return <Redirect to={`/user/${userId}/profile`} />
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
                            {/*performRedirect()*/}
                            <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loading()}</div>

                            <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Create your profile</h5></div>
                            {/* <div className="col-8 mx-auto theme-color"><small>Your full name:</small></div> */}

                            <div className="row col-8 mx-auto">
                                   <div className="col-4">
                                   <img src={avatar} className="rounded-circle mb-4" style={{height: "200px", width: "200px"}} />
                                   </div>
                                   <div className="mb-4 col-8 mt-5 pt-3">
                                   <input onChange={handleFileChange} class="form-control" type="file" id="formFile"/>
                                   <button type="button" onClick={postImage} className="btn btn-purple px-5 mt-3 rounded-3"><strong>{isUploading ? "Uploading..." : "Upload avatar"}</strong></button>
                                   </div>
                            </div>
                            <div className="form-floating mb-4 col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("name")} value={name} className="form-control" id="floatingInput" placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Full name*</label>
                            </div>

                            <div className="col-8 mx-auto theme-color mb-4">
                                   
                                   <select className="form-select" defaultValue={field} value={field} onChange={handleChange("field")} aria-label="Default select example">
                                   <option value="Software Developer">Software Developer</option>
                                   <option value="Web Developer">Web Developer</option>
                                   <option value="AI Specialist">AI Specialist</option>
                                   <option value="Data Scientist">Data Scientist</option>
                                   <option value="FrontEnd Developer">FrontEnd Developer</option>
                                   <option value="BackEnd Developer">BackEnd Developer</option>
                                   <option value="Full Stack Developer">Full Stack Developer</option>
                                   <option value="UI/UX Designer">UI/UX Designer</option>
                                   <option value="Mobile App Developer">Mobile App Developer</option>
                                   <option value="Game Developer">Game Developer</option>
                                   <option value="Cyber Security Specialist">Cyber Security Specialist</option>
                                   </select>
                                   <small>Give us an idea of your area of speciality</small>
                            </div>

                            
                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("company")} value={company} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Company</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>could be your company or a company you work for.</small></div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("website")} value={website} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Website URL</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>your web portfolio or personal website</small></div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("location")} value={location} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Location*</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>city & state eg. Rajkot, Gujarat</small></div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("skills")} value={skills} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Skills*</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>please add a comma after each skill.</small></div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleChange("github")} value={github} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label htmlFor="floatingInput" className="ph-gray">Github username</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>Your github username to display repos.</small></div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <textarea onChange={handleChange("bio")} value={bio} className="form-control" id="floatingInput" placeholder="John Cena" rows="5" style={{height:"150px"}}></textarea>
                                   <label htmlFor="floatingInput" className="ph-gray">Bio*</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>A short bio of yourself.</small></div>
                            <hr className="my-4 col-8 mx-auto"/>


                            <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Education</h5></div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleEduChange("college")} value={college} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label htmlFor="floatingInput" className="ph-gray">college</label>
                            </div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleEduChange("degree")} value={degree} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Degree</label>
                            </div>
                            
                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleEduChange("fieldofstudy")} value={fieldofstudy} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Field of study</label>
                            </div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleEduChange("locationClg")} value={locationClg} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Location</label>
                            </div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleEduChange("from")} value={from} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">DD / MM / YYYY</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>*Date you started college.</small></div>

                            <div className="form-check col-8 mx-auto mb-4">
                                   <input className="form-check-input" type="checkbox" value={cur} name="Current college ?" id="flexCheckChecked" onChange={() => setCur(!cur)} checked={cur}/>
                                   <label className="form-check-label" htmlFor="flexCheckChecked">
                                   Current college ?
                                   </label>
                            </div>

                            {!cur && (<div><div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleEduChange("to")} value={to} className="form-control" id="floatingInput"  placeholder="John Cena" />
                                   <label className="ph-gray" htmlFor="floatingInput">DD / MM / YYYY</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>*Date you finished college.</small></div></div>)}
                            <hr className="my-4 col-8 mx-auto"/>


                            <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Experience</h5></div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleExpChange("jobtitle")} value={jobtitle} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Job title</label>
                            </div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleExpChange("jobcompany")} value={jobcompany} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Job company</label>
                            </div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleExpChange("jobposition")} value={jobposition} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Job position</label>
                            </div>

                            <div className="form-floating col-8 mx-auto mb-4">
                                   
                                   <input type="text" onChange={handleExpChange("joblocation")} value={joblocation} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">Job location</label>
                            </div>

                            <div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleExpChange("jobfrom")} value={jobfrom} className="form-control" id="floatingInput"  placeholder="John Cena"/>
                                   <label className="ph-gray" htmlFor="floatingInput">DD / MM / YYYY</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>*Date you started job.</small></div>

                            <div className="form-check col-8 mx-auto mb-4">
                                   <input className="form-check-input" type="checkbox" value={curJob} name="Current job ?" id="flexCheckChecked1" onChange={() => setCurJob(!curJob)} checked={curJob}/>
                                   <label className="form-check-label" htmlFor="flexCheckChecked1">
                                   Current job ?
                                   </label>
                            </div>

                            {!curJob && (<div><div className="form-floating col-8 mx-auto">
                                   
                                   <input type="text" onChange={handleExpChange("jobto")} value={jobto} className="form-control" id="floatingInput1"  placeholder="John Cena" />
                                   <label className="ph-gray" htmlFor="floatingInput1">DD / MM / YYYY</label>
                            </div>
                            <div className="col-8 mx-auto theme-color mb-4"><small>*Date you finished job.</small></div></div>)}
                            <hr className="my-4 col-8 mx-auto"/>

                            <div className="col-8 mx-auto d-grid mb-5">
                                   <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit" >{isLoading ? "Loading..." : "Submit"}</button>
                            </div>
                            
                     </div>
                     </div>
                     </div>
              </div>
       );
}

export default CreateDevProfile;