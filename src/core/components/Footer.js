import React from "react";
import {Link} from "react-router-dom";

function Footer() {
       return (
              <div>
                     
                     <footer className="page-footer font-small unique-color-dark">

                     <div style={{backgroundColor: "#6351ce"}}>
                     <div className="container">

                     
                     <div className="row py-4 d-flex align-items-center">

                     
                     <div className="col-md-6 col-lg-5 text-left text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0">Get connected with us on social networks!</h6>
                     </div>
                     

                     
                     <div className="col-md-6 col-lg-7 text-center text-md-end">

                            
                            <a className="fb-ic" href="https://facebook.com">
                            <i className="fab fa-facebook-f white-text me-4"> </i>
                            </a>
                            
                            <a className="tw-ic" href="https://twitter.com">
                            <i className="fab fa-twitter white-text me-4"> </i>
                            </a>
                            
                            <a className="li-ic" href="https://linkedin.com">
                            <i className="fab fa-linkedin-in white-text me-4"> </i>
                            </a>
                            
                            <a className="ins-ic" href="https://instagram.com">
                            <i className="fab fa-instagram white-text"> </i>
                            </a>

                     </div>
                     

                     </div>
                     

                     </div>
                     </div>

                     
                     <div className="container text-left text-md-left mt-5">

                     
                     <div className="row mt-3">

                     
                     <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                     
                            <h6 className="text-uppercase font-weight-bold">Dev's Den</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                                   consectetur
                                   adipisicing elit.</p>

                     </div>
                     

                     
                     <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                     
                            <h6 className="text-uppercase font-weight-bold">Features</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                            <p>
                                   <a href="/compiler">Compiler</a>
                            </p>
                            <p>
                                   <a href="/docs">Docs</a>
                            </p>
                            <p>
                                   <a href="/find/developers">Find Developers</a>
                            </p>
                            <p>
                                   <a href="/find/companies">Find Companies</a>
                            </p>

                     </div>
                     
                     <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                     
                            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                            <p>
                                   <Link to="/">Home</Link>
                            </p>
                            <p>
                                   <Link to="/contact">Contact Us</Link>
                            </p>
                            <p>
                                   <Link to="/about">About Us</Link>
                            </p>
                            <p>
                                   <a href="https://www.freeprivacypolicy.com/live/f39e5517-604c-4eeb-aa66-4aef506343dc">Privacy Policy</a>
                            </p>

                     </div>
                     
                     <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                     
                            <h6 className="text-uppercase font-weight-bold">Contact</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                            <p>
                                   <i className="fas fa-home mr-3"></i>  New York, NY 10012, US</p>
                            <p>
                                   <i className="fas fa-envelope mr-3"></i>  info@devsden.com</p>
                            <p>
                                   <i className="fas fa-phone mr-3"></i>  + 01 234 567 88</p>
                            <p>
                                   <i className="fas fa-print mr-3"></i>  + 01 234 567 89</p>

                     </div>
                     

                     </div>
                     

                     </div>
                     

                     
                     <div className="footer-copyright text-center py-3">© 2022 Copyright | <a href="/"> Dev's Den</a></div>      

                     </footer>
                     
              </div>
       );
}

export default Footer;