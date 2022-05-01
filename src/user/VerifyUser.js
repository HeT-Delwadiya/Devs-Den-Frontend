import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../core/components/Footer';
import Header from '../core/components/Header';
import { verifyUserEmail } from './helper/userapicalls';

function VerifyUser(props) {

       const userId = props.match.params.userId;
       const token = props.match.params.token;

       const [error, setError] = React.useState(false);
       const [success, setSuccess] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);

       const verifyUser = () => {
              verifyUserEmail(userId, token)
              .then(data => {
                     if (data.error)
                            setError(data.error);
                     else if (data.Message)
                            setError(data.Message);
                     else {
                            setSuccess(true);
                     }
              })
              .catch(err => console.log(err)); 
              setIsLoading(false);
       }

       React.useEffect(() => {
              verifyUser();
       }, []);

       const errorMsg = () => {
              return (
                     <div className="container mt-3 fw-bold">
                            <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                                   {error}
                            </div>
                     </div>
              );
       }

       const successMsg = () => {
              return (
                     <div className="container mt-3 fw-bold">
                            <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                                   Congratulations! Your account is now verified.<Link to={`/user/${userId}/profile`}> Click here</Link> to view your profile.
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
                            <div className="container mt-5 mb-5">
                                   <div className="p-3 card reounded-3">
                                          {errorMsg()}
                                          {successMsg()}
                                          {loading()}
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default VerifyUser;