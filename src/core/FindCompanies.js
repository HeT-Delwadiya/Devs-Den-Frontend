import React from 'react';
import { getAllCompanies, getCompanyBySpeciality, getCompanyByName } from '../user/helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
import Footer from './components/Footer';
import Header from './components/Header';
import UserCard from './components/UserCard';

function FindCompanies() {

       const [companies, setCompanies] = React.useState([]);
       const [error, setError] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);
       const [isSpecialities, setIsSpecialities] = React.useState(false);
       const [search, setSearch] = React.useState("");

       const {authtoken} = isAuthenticated();

       const loadCompanies = () => {
              setIsLoading(true);
              getAllCompanies(authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error);
                            else {
                                   setCompanies(data);
                                   setIsLoading(false);
                            }  
                     })
                     .catch(err => setError(err))
       }

       React.useEffect(() => {
              loadCompanies();
       }, []);

       const handleChange = (event) => {
              setSearch(event.target.value);
       }

       const handleSearch = (event) => {
              event.preventDefault();
              setIsLoading(true);
              if(isSpecialities) {
                     getCompanyBySpeciality({speciality: search}, authtoken)
                            .then(data => {
                                   if(data.error)
                                          setError(data.error)
                                   else {
                                          setCompanies(data)
                                          setIsLoading(false);
                                   }
                            })
                            .catch(err => console.log(err));
              } else {
                     getCompanyByName({name: search}, authtoken)
                            .then(data => {
                                   if(data.error)
                                          setError(data.error)
                                   else {
                                          setCompanies(data)
                                          setIsLoading(false);
                                   }
                            })
                            .catch(err => console.log(err));
              }
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
                     <Header find={true} />
                            <div className="container">
                                   <div className="row mt-5 mb-5">
                                          <div className="col-10 mx-auto">
                                                 <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                               <select className="form-select text-white theme-bg" defaultValue={"name"} onChange={(e) => e.target.value=="name" ? setIsSpecialities(false) : setIsSpecialities(true)} aria-label="Default select example">
                                                                      <option value="name">Name</option>
                                                                      <option value="specialities">Specialities</option>
                                                               </select>
                                                        </div>
                                                        <input type="text" className="form-control" value={search} onChange={handleChange} aria-label="Text input with dropdown button"/>
                                                 </div>
                                          </div>
                                          <div className="col-2">
                                                 <button type="submit" className="btn btn-purple rounded" onClick={handleSearch}>{isLoading ? (<><i class="fas fa-search"></i>  Searching...</>) : (<><i class="fas fa-search"></i>  Search</>)}</button>
                                          </div>
                                   </div>
                                   <div className="position-absolute top-40 start-50 translate-middle ms-5 ps-4">{loading()}</div>
                                   <div className="row mb-5">
                                          {companies.map((company, index) => {
                                                 return <UserCard user={company} type={1} key={index} />
                                          })}
                                          {companies.length==0 && (<div className="col-8 bg-white mx-auto text-center p-5">
                                                 <h3><strong>No companies found!</strong></h3>
                                          </div>)}
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default FindCompanies;