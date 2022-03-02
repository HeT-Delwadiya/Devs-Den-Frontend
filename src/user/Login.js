import React from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, login } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";

function Login() {

       const [values, setValues] = React.useState({
              type: 0,
              email:"",
              password:"",
              error:"",
              isLoading: false,
              didRedirect: false
       });

       const {type,email,password,error,isLoading,didRedirect} = values;

       const {user} = isAuthenticated();

       const scope = ["email", "public_profile"];

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
              setValues({...values, error: false, isLoading:true, didRedirect:false});
              login({type,email,password})
              .then(data => {
                     if (data.error)
                            setValues({...values, error: data.error, isLoading: false});
                     else if (data.Message)
                            return setValues({...values, error: data.Message, isLoading: false});
                     else {
                            authenticate(data, () => {
                                   setValues({...values, didRedirect: true});
                            });
                     }
              })
              .catch(err => console.log(err));
       }

       const performRedirect = () => {
              if(didRedirect) {
                     if(user && user.role===33) {
                            return <Redirect to="/admin/dashboard" />
                     } else if (user && user.role===1) {
                            return <Redirect to= {`/company/${isAuthenticated().user._id}/profile`} />
                     } else {
                            return <Redirect to= {`/user/${isAuthenticated().user._id}/profile`} />
                     }
              }
              if (isAuthenticated()) {
                     return <Redirect to={isAuthenticated().user.type==0?`/user/${isAuthenticated().user._id}/profile`:`/company/${isAuthenticated().user._id}/profile`} />
              }
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

       const errorMsg = () => {
              return (
                     <div className="container mt-3">
                            <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                                   {error}
                            </div>
                     </div>
              );
       }

       return (
              <div>
                     <Header title="Login" isTitleCenter="true" />
                     <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "100"}}>{loadingMsg()}</div>
                     {errorMsg()}
                     {performRedirect()}
                     
                     <div className="container">
                     <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                   <div className="card border-0 shadow rounded-3 my-5">
                                          <div className="card-body p-4 p-sm-5">
                                          <div className="theme-bg rounded"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Login to your account</h5></div>
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
                                                 <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">Login</button>
                                          </div>
                                          <hr className="my-4"/>
                                                 
                                          </form>
                                          </div>
                                   </div>
                            </div>
                     </div>
                     </div>
                     <Footer />
              </div>
       );
}

export default Login;