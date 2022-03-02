import React from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, logout} from "../../auth/helper/index"

const currentTab = (history, path) => {
       if (history.location.pathname === path)
              return {color: "#6351ce",backgroundColor:"#ffffff",borderRadius:"25px",fontWeight:"700", fontSize: "1.1rem"};
       else
              return {color: "#ffffff", fontWeight:"500", fontSize: "1.1rem"}
}

function Header(props) {

       return (
              <div>
                     
                     <nav className="navbar navbar-expand-lg navbar-light px-3 py-3" style={{backgroundColor: "#6351ce"}}>

                     <div className="mx-5"> <img  className="navbar-brand text-white mx-5" src="https://res.cloudinary.com/dev-s-den/image/upload/v1642483423/oie_png_1_so6cm6.png" alt="logo" height="60" width="70" /></div>
                     
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                     </button>

                     
                     <div className="collapse navbar-collapse mx-4 px-5 justify-content-end" id="basicExampleNav">
                     <ul className="navbar-nav">

                            <li className="nav-item active mx-3 fs-5">
                                   <Link style={currentTab(props.history,"/")} className="nav-link" to="/">Home</Link>
                            </li>

                            {isAuthenticated() && (isAuthenticated().user.role===0 || isAuthenticated().user.role===1) && (
                                   <li className="nav-item mx-3">
                                          <Link style={currentTab(props.history,"/user/feed")} className={props.userRoute ? "nav-link active-menu-style" : "nav-link" } to="/user/feed">Feed</Link>
                                   </li>
                            )}

                            {isAuthenticated() && isAuthenticated().user.role===33 && (
                                   <li className="nav-item mx-3">
                                          <Link style={currentTab(props.history,"/admin/dashboard")} className={props.adminRoute ? "nav-link active-menu-style" : "nav-link" } to="/admin/dashboard">Admin Dashboard</Link>
                                   </li>
                            )}

                            {!isAuthenticated() && (
                                   <React.Fragment>
                                          <li className="nav-item mx-3">
                                                 <Link style={currentTab(props.history,"/register")} className="nav-link" to="/register">Register</Link>
                                          </li>
                                          <li className="nav-item mx-3">
                                                 <Link style={currentTab(props.history,"/login")} className="nav-link" to="/login">Login</Link>
                                          </li>
                                   </React.Fragment>
                            )}

                            {isAuthenticated() && (<li className="nav-item dropdown mx-3">
                                   <a className={props.find ? "nav-link active-menu-style dropdown-toggle text-white" : "nav-link dropdown-toggle text-white"} style={{fontWeight:"500", fontSize: "1.1rem"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   Find
                                   </a>
                                   <ul className="dropdown-menu text-center ps-1 pe-1" aria-labelledby="navbarDropdown">
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to="/find/developers"><li className="admin-option pt-2 pb-2">Developers</li></Link>
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to="/find/companies"><li className="admin-option pt-2 pb-2">Companies</li></Link>
                                   </ul>
                            </li>)}

                            {isAuthenticated() && (<li className="nav-item dropdown mx-3">
                                   <a className={props.tools ? "nav-link active-menu-style dropdown-toggle text-white" : "nav-link dropdown-toggle text-white"} style={{fontWeight:"500", fontSize: "1.1rem"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   Tools
                                   </a>
                                   <ul className="dropdown-menu text-center ps-1 pe-1" aria-labelledby="navbarDropdown">
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to="/compiler"><li className="admin-option pt-2 pb-2">Compiler</li></Link>
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to="/docs"><li className="admin-option pt-2 pb-2">Docs</li></Link>
                                   </ul>
                            </li>)}

                            <li className="nav-item active mx-3 fs-5">
                                   <Link style={currentTab(props.history,"/contact")} className="nav-link" to="/contact">Contact Us</Link>
                            </li>

                            <li className="nav-item active mx-3 fs-5">
                                   <Link style={currentTab(props.history,"/about")} className="nav-link" to="/about">About Us</Link>
                            </li>

                            {isAuthenticated() && (isAuthenticated().user.role===0 || isAuthenticated().user.role===1) && (<li className="nav-item dropdown mx-3">
                                   <a className={props.myAccount ? "nav-link active-menu-style dropdown-toggle text-white" : "nav-link dropdown-toggle text-white"} style={{fontWeight:"500", fontSize: "1.1rem"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   My Account
                                   </a>
                                   <ul className="dropdown-menu text-center ps-1 pe-1" aria-labelledby="navbarDropdown">
                                          {isAuthenticated() && (isAuthenticated().user.role===0) && (
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to={`/user/${isAuthenticated().user._id}/profile`} >
                                                 <li className="nav-item admin-option pt-2 pb-2">My Profile</li>
                                          </Link>
                                          )}
                                          {isAuthenticated() && (isAuthenticated().user.role===1) && (
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to={`/company/${isAuthenticated().user._id}/profile`} >
                                                 <li className="nav-item admin-option pt-2 pb-2">My Profile</li>
                                          </Link>
                                          )}
                                          {isAuthenticated() && (isAuthenticated().user.role===0) && (
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to={`/user/${isAuthenticated().user._id}/profile/edit`}><li className="admin-option pt-2 pb-2">Edit Profile</li></Link>
                                          )}
                                          {isAuthenticated() && (isAuthenticated().user.role===1) && (
                                          <Link className="theme-color admin-option" style={{fontWeight:"500", fontSize: "1.1rem"}} to={`/company/${isAuthenticated().user._id}/profile/edit`}><li className="admin-option pt-2 pb-2">Edit Profile</li></Link>
                                          )}
                                          {isAuthenticated() && (
                                                 <span style={{fontWeight:"500", fontSize: "1.1rem"}} onClick={() => {
                                                        logout( () => {
                                                               props.history.push("/");
                                                        });
                                                 }} className="theme-color admin-option"><li className="nav-item admin-option pt-2 pb-2">Logout</li></span>
                                          )}
                                   </ul>
                            </li>)}

                            {isAuthenticated() && (
                                   <li className="nav-item mx-3">
                                          <Link style={currentTab(props.history,"/conversations/all")} className={props.msg ? "nav-link active-menu-style" : "nav-link" } to="/conversations/all"><i className="fa-solid fa-paper-plane"></i></Link>
                                   </li>
                            )}

                     </ul>
                     </div>

                     </nav>

                     {props.title &&(<div className={props.isTitleCenter ? "text-center" : "ms-5"}>
                            <div className="theme-bg rounded-3 d-inline-flex text-center p-2 mx-auto mb-4 mt-5" ><h1 className="text-white px-3">{props.title}</h1></div>
                     </div>)}

              </div>
       );
}

export default withRouter(Header);