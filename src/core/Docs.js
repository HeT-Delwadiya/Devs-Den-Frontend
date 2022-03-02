import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

function Docs() {
       return (
              <div>
                     <Header tools={true} />
                            <div className="container-fluid">
                                   <iframe src="https://docs.w3cub.com/" sandbox="allow-scripts allow-same-origin allow-top-navigation" className="w-100" style={{height: "1000px"}}/>
                                   <div className="d-flex justify-content-end me-3 mt-3">
                                          <p className="text-right"><strong>This docs function is built by <a href="https://github.com/w3cub">W3cub</a>.</strong></p>
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default Docs;