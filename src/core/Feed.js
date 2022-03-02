import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Post from '../post/components/Post';
import { getPosts } from '../post/helper/postapicalls';
import Footer from './components/Footer';
import Header from './components/Header';

function Feed() {

       const [posts, setPosts] = React.useState(null);
       const [error, setError] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);
       const [refresh, setRefresh] = React.useState(false);

       const {user} = isAuthenticated();

       const loadPosts = () => {
              setIsLoading(true);
              getPosts()
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            setPosts(data.reverse());
                            setIsLoading(false);
                     }
              })
              .catch(err => console.log(err))
       }

       React.useEffect(() => {
              loadPosts();
       }, [refresh]);

       React.useEffect(() => {
              loadPosts();
       }, []);

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
                            <div className="container">
                                   <div className="row">
                                          <div className="col-8 mx-auto">
                                                 <div className="position-fixed top-50 start-50 translate-middle ms-5 ps-5">{loading()}</div>
                                                 <div><Link to={`/user/${user._id}/post/create`}><button className="btn btn-purple rounded-3 col-12 p-3 mx-auto mt-4 mb-5 fw-bold" type="submit"><i class="fas fa-plus"></i><strong>  New Post</strong></button></Link></div>
                                                 {posts && (posts.map((post) => {
                                                        return <Post postId={post._id} key={post._id} setRefresh={setRefresh} refresh={refresh} />
                                                 }))}
                                          </div>
                                   </div>
                            </div>
                     <Footer />
              </div>
       );
}

export default Feed;