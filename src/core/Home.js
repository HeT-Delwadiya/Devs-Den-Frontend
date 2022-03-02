import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Link} from "react-router-dom";
import { isAuthenticated } from '../auth/helper';

function Home() {

       const {user} = isAuthenticated();

       return (
              <div>
                     <Header />

                            <section id="title">
                                   <div className="container-fluid header-container">

                                   <div className="row title-section">
                                          <div className="col-lg-6">
                                                 <h1 id="title-text" style={{fontWeight: "700", letterSpacing: "2px"}}>Dev's Den</h1>
                                                 <h4 className="text-white ms-3">A plateform for developers</h4>
                                                 <div className="text-start ms-4">
                                                        <Link to={user?._id ? (user.type==1 ? `/company/${user._id}/profile` : `/user/${user._id}/profile`) : "/register"}><button type="button" className="btn btn-dark btn-lg download-btn rounded-3"><i className="fa-solid fa-user-plus"></i>  Register</button></Link>
                                                        <Link to={user?._id ? (user.type==1 ? `/company/${user._id}/profile` : `/user/${user._id}/profile`) : "/login"}><button type="button" className="btn btn-light btn-lg download-btn rounded-3"><i className="fa-solid fa-arrow-right-to-bracket"></i>  Login</button></Link>
                                                 </div>
                                          </div>
                                          <div className="col-lg-6 iphone">
                                                 <img id="title-img" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645967966/developer-img_o4cx4l.png" alt="iphone-mockup"/>
                                          </div>
                                   </div>
                            </div>
                            </section>

                            <section id="features">

                                   <div className="row">
                                          <div className="col-lg-4 feature-box">
                                                 <i className="fas fa-check-circle fa-4x icon"></i>
                                                 <h3>Easy to use.</h3>
                                                 <p>So easy to use, even any newbie could do it.</p>
                                          </div>
                                          <div className="col-lg-4 feature-box">
                                                 <i className="fas fa-bullseye fa-4x icon"></i>
                                                 <h3>All in one</h3>
                                                 <p>One platform for all your needs. No need to go elsewhere.</p>
                                          </div>
                                          <div className="col-lg-4 feature-box">
                                                 <i className="fas fa-heart fa-4x icon"></i>
                                                 <h3>Free to use.</h3>
                                                 <p>All features are free to use for everyone.</p>
                                          </div>
                                   </div>

                            </section>

                            <section id="testimonials">

                                   <div id="carouselControls" className="carousel slide" data-bs-ride="carousel" data-pause="hover">
                                          <div className="carousel-inner">
                                                 <div className="carousel-item active">
                                                        <h2 className="testimonial-title">I no longer have to goto other websites to compile my code and for documentations of various libraries and programming languages.</h2>
                                                        <img className="testimonial-image" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645961968/unknown_ir7r2o.png" alt="dog-profile"/>
                                                        <em>Jacob, New York</em>
                                                 </div>
                                                 <div className="carousel-item">
                                                        <h2 className="testimonial-title">I have found lots of developers like me to collaborate with. They have amazing skills.</h2>
                                                        <img className="testimonial-image" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645974535/lady-img_ozpi8g.jpg" alt="lady-profile"/>
                                                        <em>Charlotte, Illinois</em>  
                                                 </div>
                                          </div>
                                          <button className="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                                                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                 <span className="visually-hidden">Previous</span>
                                          </button>
                                          <button className="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                                                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                 <span className="visually-hidden">Next</span>
                                          </button>
                                   </div>

                            </section>

                            <section id="press">
                                   <img className="press-img" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645967913/google_gqrn1w.png" alt="tc-logo" height="100px" width="350px"/>
                                   <img className="press-img" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645967920/meta_cghcu0.png" alt="biz-insider-logo" height="100px" width="350px"/>
                                   <img className="press-img" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645967924/microsoft_qp4rcb.png" alt="tnw-logo" height="100px" width="450px"/>
                                   <img className="press-img" src="https://res.cloudinary.com/dev-s-den/image/upload/v1645967916/ibm_ocafjk.png" alt="mashable-logo" height="100px" width="350px"/>
                            </section>

                            <section id="features">

                                   <div className="row">
                                          <div className="col-lg-4 feature-box">
                                                 <img src="https://res.cloudinary.com/dev-s-den/image/upload/v1645964829/speaker-icon_ajfmb8.png" className="mb-3"/>
                                                 <h3>Express yourself</h3>
                                                 <p>Have a problem or an idea? voice it and have disucssions or help with other programmers.</p>
                                          </div>
                                          <div className="col-lg-4 feature-box">
                                                 <img src="https://res.cloudinary.com/dev-s-den/image/upload/v1645964877/employment_to0zzp.png" className="mb-3"/>
                                                 <h3>Find eager devs</h3>
                                                 <p>Are you looking for devs to hire? Just look through their profile to find out their education and employment history!</p>
                                          </div>
                                          <div className="col-lg-4 feature-box">
                                                 <img src="https://res.cloudinary.com/dev-s-den/image/upload/v1645964949/connect_mqpoqi.png" className="mb-3"/>
                                                 <h3>Link with devs</h3>
                                                 <p>Link with a developer on other different platforms from devtree by viewing their profile links.</p>
                                          </div>
                                   </div>

                            </section>

                            <section id="cta">

                                   <h3 className="cta-text">Explore The Ocean Of Amazing Developers Today.</h3>
                                   <Link to={user?._id ? (user.type==1 ? `/company/${user._id}/profile` : `/user/${user._id}/profile`) : "/register"}><button type="button" className="btn btn-dark btn-lg download-btn rounded-3"><i className="fa-solid fa-user-plus"></i>  Register</button></Link>
                                   <Link to={user?._id ? (user.type==1 ? `/company/${user._id}/profile` : `/user/${user._id}/profile`) : "/login"}><button type="button" className="btn btn-light btn-lg download-btn rounded-3"><i className="fa-solid fa-arrow-right-to-bracket"></i>  Login</button></Link>

                            </section>
                            <hr className="deep-purple accent-2 m-0" style={{color: "#000", height: "5px"}} />

                     <Footer />
              </div>
       );
}

export default Home;
