import React from 'react';
import { isAuthenticated } from '../../auth/helper/index';
import { getPost, likePost, dislikePost, addComment, removeComment, removePost } from '../helper/postapicalls';
import { v1 as uuidv1 } from 'uuid';
import { Link } from 'react-router-dom';

function Post(props) {

       const [post, setPost] = React.useState({});
       const [posterId, setPosterId] = React.useState("");
       const [error, setError] = React.useState(false);
       const [isLiked, setIsLiked] = React.useState(false);
       const [isComment, setIsComment] = React.useState(false);
       const [userDetails, setUserDetails] = React.useState({});
       const [comment, setComment] = React.useState("");
       const [commentId, setCommentId] = React.useState(null);

       const {user, authtoken} = isAuthenticated();
       

       const loadPost = () => {
              getPost(props.postId)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setPost(data);
                                   setPosterId(data.user._id);
                                   setUserDetails(data.user);
                                   data.likes.map((like) => {
                                          if(like==user._id)
                                                 setIsLiked(true);
                                   })
                            }  
                     })
                     .catch(err => setError(err))
       }

       React.useEffect(() => {
              loadPost();
       }, [])

       const handleLike = event => {
              event.preventDefault();
              if (isLiked) {
                     dislikePost(post._id, {userId:user._id}, authtoken)
                            .then(data => {
                                   if(data.error)
                                          setError(data.error)
                                   else {
                                          setPost(data)
                                          setIsLiked(false)
                                   }
                            })
                            .catch(err => console.log(err))
              } else {
                     likePost(post._id, {userId:user._id}, authtoken)
                            .then(data => {
                                   if(data.error)
                                          setError(data.error)
                                   else {
                                          setPost(data)
                                          setIsLiked(true)
                                   }
                            })
                            .catch(err => console.log(err))
              }
       }

       const handleComment = event => {
              event.preventDefault();
              setIsComment(!isComment);
       }

       const onPostComment = event => {
              event.preventDefault();
              if (comment != "") {
                     const info = {
                            commentId : uuidv1(),
                            userId : user._id,
                            avatar : user.avatar,
                            text: comment,
                            name: user.name
                     }
                     addComment(post._id, info, authtoken)
                            .then(data => {
                                   if(data.error)
                                          setError(data.error)
                                   else {
                                          setPost(data)
                                          setComment("")
                                   }
                            })
                            .catch(err => console.log(err))
              }
       }

       const deleteComment = () => {
              removeComment(post._id, {commentId}, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   setPost(data)
                            }
                     })
                     .catch(err => console.log(err))
       }

       const deletePost = () => {
              removePost(post._id, authtoken)
                     .then(data => {
                            if(data.error)
                                   setError(data.error)
                            else {
                                   props.setRefresh(!props.refresh);
                            }
                     })
                     .catch(err => console.log(err))
       }

       const deletePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deletePostPop${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete this post?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={deletePost} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const deleteComPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deleteComPop${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete this comment?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={deleteComment} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div>
                     {deletePostPopup()}
                     {deleteComPopup()}
                     {post.user && (<div className="mx-3 mb-5 pb-3 shadow theme-bg rounded-3" >
                            <div className="row align-items-center">
                                   <div className="col-1 mt-3 ms-3">
                                          <img src={userDetails.avatar} className="rounded-circle"  style={{height: "50px", width: "50px"}}/>
                                   </div>
                                   <div className="col-9 mt-4 text-white">
                                          <Link className="text-white" to={post.userType=="User" ? `/user/${posterId}/profile` : `/company/${posterId}/profile`}><h5><strong>{userDetails.name}</strong></h5></Link>
                                   </div>
                                   <div className="col-1 mt-3 ms-3">
                                          {user._id==posterId && (<button data-bs-toggle="modal" data-bs-target={`#deletePostPop${post._id}`} className="btn btn-light rounded-3" type="submit"><i className="fas fa-trash"></i></button>)}
                                   </div>
                            </div>
                            <hr className="text-white"/>
                            <h4 className="ms-5 me-5 text-white">{post.description}</h4>
                            <div className="m-3">
                                   <img src={post.imageUrl} className="rounded-3 img-fluid w-100 h-100" />
                            </div>
                            <div className="row m-1">
                                   <div className="col-6 d-grid">
                                         {<button onClick={handleLike} className={isLiked ? "btn btn-light rounded-3 fw-bold" : "btn btn-outline-light rounded-3"} type="submit"><i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i> Like {"("+post.likes.length+")"}</button>} 
                                   </div>
                                   <div className="col-6 d-grid">
                                          {<button onClick={handleComment} className={isComment ? "btn btn-light rounded-3 fw-bold" : "btn btn-outline-light rounded-3"} type="submit"><i className={isComment ? "fas fa-comment-dots" : "far fa-comment-dots"}></i> Comment {"("+post.comments.length+")"}</button>} 
                                   </div>
                                   {isComment && (<div>
                                          <div className="row">
                                                 <div className="form-floating mt-3 col-10">
                                                        <textarea onChange={(event) => setComment(event.target.value)} value={comment} className="form-control" id="floatingInput" placeholder="John Cena" rows="5" style={{height:"100px"}}></textarea>
                                                        <label htmlFor="floatingInput" className="ph-gray ms-3">Comment</label>
                                                 </div>
                                                 <div className="form-floating mt-3 col-2">
                                                        <button onClick={onPostComment} style={{borderRadius:"10px"}} className="btn btn-light rounded btn-login text-uppercase fw-bold" type="submit">Post</button>
                                                 </div>
                                          </div>
                                          <div className="white-bg">
                                                 {post.comments.map((comment, index) => {
                                                        return (<div key={comment.commentId}>
                                                               <div className="row align-items-center ms-3">
                                                                      <div className="col-1 mt-1 ms-3">
                                                                             <img src={comment.avatar} className="rounded-circle"  style={{height: "50px", width: "50px"}}/>
                                                                      </div>
                                                                      <div className="col-9 mt-3 text-white">
                                                                             <h5><strong>{comment.name}</strong></h5>
                                                                             <p>{comment.text}</p>
                                                                      </div>
                                                                      <div className="col-1 mt-1 ms-3">
                                                                             {user._id==comment.userId && (<button onClick={() => setCommentId(comment.commentId)} data-bs-toggle="modal" data-bs-target={`#deleteComPop${post._id}`} className="btn btn-light rounded-3" type="submit"><i className="fas fa-trash"></i></button>)}
                                                                      </div>
                                                               </div>
                                                        </div>)
                                                 })}
                                          </div>
                                   </div>)}
                            </div>
                     </div>)}
              </div>
       );
}

export default Post;