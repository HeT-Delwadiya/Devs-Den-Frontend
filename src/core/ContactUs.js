import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { sendContactMsg } from './helper/coreapicalls';

function ContactUs() {

       const [values, setValues] = React.useState({
              name: "",
              email: "",
              subject: "",
              message: ""
       });
       const [error, setError] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(false);
       const [success, setSuccess] = React.useState(false);

       const {name, email, subject, message} = values;

       const handleChange = name => event => {
              setValues({...values, [name]:event.target.value});
              setSuccess(false);
              setError(false);
       }

       const handleSubmit = (event) => {
              event.preventDefault();
              if(name=="" || email=="" || subject=="" || message=="")
                     return setError("Please fill all required details!")
              setIsLoading(true);
              sendContactMsg(values)
              .then(data => {
                     if(data.err)
                            return setError(data.err)
                     setValues({ name: "", email: "", subject: "", message: "" }); 
                     setIsLoading(false);
                     setSuccess(true);
              })
              .catch(err => console.log(err))
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
                     <div className="container mt-2">
                            <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                                   Congratulations! Your message sent successfully. We will get back to you soon.
                            </div>
                     </div>
              );
       }

       const loading = () => {
              return <div className="custom-loading" style={{display: isLoading ? "" : "none"}}>
                     <ul className="">
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
                            <div className="container bg-white rounded">
                                   
                                   <div className="row d-flex justify-content-center align-items-center h-100 card border-0 shadow rounded-3 my-5">
                                          <div className="col-12 ">

                                          <div className="theme-bg rounded mt-5 col-5 mx-auto"><h5 className="card-title text-center mb-5 fw-bold fs-5 text-white p-2">Contact Us</h5></div>
                                          {successMsg()}
                                          {errorMsg()}
                                          <div className="position-absolute top-40 start-50 translate-middle ms-5 ps-4">{loading()}</div>
                                          
                                          
                                          <div className="col-lg-10 mx-auto mb-5">
                                          <div className="wrapper img" style={{backgroundImage: "url(https://res.cloudinary.com/dev-s-den/image/upload/v1645944571/img_p39lia.jpg)", backgroundSize:"cover"}}>
                                          <div className="row">
                                          <div className="col-md-9 col-lg-7">
                                          <div className="contact-wrap w-100 p-md-5 p-4">
                                          <h3 className="mb-4 fw-bolder">Get in touch with us</h3>
                                          <form id="contactForm" name="contactForm" className="contactForm">
                                          <div className="row">
                                          <div className="col-md-6">
                                          <div className="form-group">
                                          <label className="label mt-3 mb-2" style={{color :"#000", fontSize: "12px", fontWeight:"600"}} htmlFor="name">FULL NAME</label>
                                          <input type="text" style={{border: "none"}} className="form-control shadow mb-3" value={name} onChange={handleChange("name")} name="name" id="name" placeholder="Name"/>
                                          </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div className="form-group">
                                          <label className="label mt-3 mb-2" style={{color :"#000", fontSize: "12px", fontWeight:"600"}} htmlFor="email">EMAIL ADDRESS</label>
                                          <input type="email" style={{border: "none"}} className="form-control shadow mb-3" value={email} onChange={handleChange("email")} name="email" id="email" placeholder="Email"/>
                                          </div>
                                          </div>
                                          <div className="col-md-12">
                                          <div className="form-group">
                                          <label className="label mt-3 mb-2" style={{color :"#000", fontSize: "12px", fontWeight:"600"}} htmlFor="subject">SUBJECT</label>
                                          <input type="text" style={{border: "none"}} className="form-control shadow mb-3" value={subject} onChange={handleChange("subject")} name="subject" id="subject" placeholder="Subject"/>
                                          </div>
                                          </div>
                                          <div className="col-md-12">
                                          <div className="form-group">
                                          <label className="label mt-3 mb-2" style={{color :"#000", fontSize: "12px", fontWeight:"600"}} htmlFor="#">MESSAGE</label>
                                          <textarea name="message" style={{border: "none"}} className="form-control shadow mb-3" value={message} onChange={handleChange("message")} id="message" cols="30" rows="4" placeholder="Message"></textarea>
                                          </div>
                                          </div>
                                          <div className="col-md-12">
                                          <div className="form-group">
                                          <button onClick={handleSubmit} className="btn btn-purple mt-4 rounded-3 shadow">Send Message</button>
                                          <div className="submitting"></div>
                                          </div>
                                          </div>
                                          </div>
                                          </form>
                                          </div>
                                          </div>
                                          </div>
                                          </div>
                                          </div>


                                          </div>
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default ContactUs;