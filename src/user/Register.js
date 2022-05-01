import React from "react";
import {isAuthenticated} from "../auth/helper/index";
import {Redirect } from "react-router-dom";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import CreateDevProfile from "./CreateDevProfile";
import CreateComProfile from "./CreateComProfile";
import { checkUserEmail } from "./helper/userapicalls";

function Register() {

       const [values, setValues] = React.useState({
              type: 0,
              name:"",
              email:"",
              password:"",
              error:"",
              success: false,
              isLoading: false,
              didRedirect: false
       });

       const {type, name, email, password, error, success, didRedirect, isLoading} = values;

       const handleChange = name => event => {
              setValues({...values, error:false, [name]:event.target.value});
       }
       const handleBtnDev = event => {
              event.preventDefault();
              setValues({...values, error:false, type: 0});
       }
       const handleBtnCompany = event => {
              event.preventDefault();
              setValues({...values, error:false, type: 1});
       }

       const handleSubmit = event => {
              event.preventDefault();
              if(email=="")
                     return setValues({...values, error: "Please enter valid email!"});
              if(password=="")
                     return setValues({...values, error: "Please enter a password!"});
              setValues({...values, error:false, isLoading:true});
              checkUserEmail({email:email, type:type})
                     .then(data => {
                            if(data.error)
                                   setValues({...values, error: data.error, success: false, isLoading:false})
                            else if (data.Message)
                                   setValues({...values, error: "Email is already used in another account!", success: false, isLoading:false})
                            else {
                                   setValues({...values, didRedirect: true});
                            }
                     })
                     .catch(err => console.log(err));
       }

       const errorMsg = () => {
              return (
                     <div className="container">
                     <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                            {error}
                     </div>
                     </div>
              );
       }

       const loadingMsg = () => {
              return <div className="custom-loading" style={{display: isLoading ? "" : "none"}}>
                     <ul className="position-absolute top-50 start-50 mt-5">
                            <li> </li>
                            <li> </li>
                            <li> </li>
                            <li> </li>
                     </ul>
              </div>
       }

       const performRedirect = () => {
              const data = {
                     type: type,
                     email: email,
                     pass: password
              }
              if(didRedirect) {
                     if(type) {
                            return <CreateComProfile data={data}/>
                     } else {
                            return <CreateDevProfile data={data} /> 
                     }
              }
              if (isAuthenticated()) {
                     return <Redirect to={isAuthenticated().user.type==0?`/user/${isAuthenticated().user._id}/profile`:`/company/${isAuthenticated().user._id}/profile`} />
              }
       }

       return (
              <div>
                     <Header title="Register" isTitleCenter="true" />
                     {errorMsg()}
                     {performRedirect()}
                     <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loadingMsg()}</div>

                     {!didRedirect && (<div className="container">
                     <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                   <div className="card border-0 shadow rounded-3 my-5">
                                          <div className="card-body p-4 p-sm-5">
                                          <div className="theme-bg rounded"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Register an account</h5></div>
                                          <form>
                                          <div className="row">
                                                 <div className="col-lg-6 text-center mb-4 d-grid">
                                                        <button onClick={handleBtnDev} style={{borderRadius:"10px"}} className={type==0 ? "btn btn-purple rounded btn-login text-uppercase fw-bold" : "btn btn-off rounded btn-login text-uppercase fw-bold"} type="submit">Developer</button>
                                                 </div>
                                                 <div className="col-lg-6 text-center mb-4 d-grid">
                                                        <button onClick={handleBtnCompany} style={{borderRadius:"10px"}} className={type==1 ?  "btn btn-purple rounded btn-login text-uppercase fw-bold" : "btn btn-off rounded btn-login text-uppercase fw-bold"} type="submit">Company</button>
                                                 </div>
                                          </div>
                                          <div className="form-floating mb-3">
                                                 <input type="email" onChange={handleChange("email")} value={email} className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                                 <label htmlFor="floatingInput">Email address</label>
                                          </div>
                                          <div className="form-floating mb-3">
                                                 <input type="password" onChange={handleChange("password")} value={password} className="form-control" id="floatingPassword" placeholder="Password"/>
                                                 <label htmlFor="floatingPassword">Password</label>
                                          </div>

                                          <div className="form-check mb-3">
                                                 <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                                                 <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                 Remember password
                                                 </label>
                                          </div>
                                          <div className="d-grid">
                                                 <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">Register</button>
                                          </div>
                                          <hr className="my-4"/>
                                          </form>
                                          </div>
                                   </div>
                            </div>
                     </div>
                     </div>)}

                     <Footer />
              </div>
       );
}

export default Register;