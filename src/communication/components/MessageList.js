import React from 'react';
import { isAuthenticated } from '../../auth/helper';
import { getConversationById, sendMsg, deleteConversationById } from '../helper/comapicalls';
import { getCompanyById, getUserById } from '../../user/helper/userapicalls';
import { format, register } from 'timeago.js';
import enShort from "../components/TimeagoShort";

register('en_short', enShort);

function MessageList(props) {

       const {user, authtoken} = isAuthenticated();

       const [conversation, setConversation] = React.useState({});
       const [oUser, setOUser] = React.useState({});
       const [isLoading, setIsLoading] = React.useState(true);
       const [error, setError] = React.useState(false);
       const [newMsg, setNewMsg] = React.useState("");
       const [sendMsgLoading, setSendMsgLoading] = React.useState(false);
       const messagesEndRef = React.useRef(null);
       const [arrivalMessage, setArrivalMessage] = React.useState(null);
       const [messages, setMessages] = React.useState([]);

       const loadData = () => {
              
              getConversationById(props.conversationId, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error)
                     else {
                            setConversation(data);
                            const friendId = data.members.find(m => m !== user._id)
                            getUserById(friendId, authtoken)
                            .then(data => {
                                   if(data.err)
                                          setError(data.err)
                                   else if(data.Message) {
                                          getCompanyById(friendId, authtoken)
                                          .then(info => {
                                                 if(info.err)
                                                        setError(info.err)
                                                 else {
                                                        setOUser(info)
                                                        setIsLoading(false)
                                                 }
                                          })
                                          .catch(err => console.log(err))
                                   } else {
                                          setOUser(data)
                                          setIsLoading(false)
                                   }
                            })
                            .catch(err => console.log(err))
                     }
              })
              .catch(err => console.log(err))
       }

       React.useEffect(() => {
              loadData();
              setMessages(props.messages);
              props.socket?.current.on("getMessage", (data) => {
                     setArrivalMessage({
                            senderId: data.senderId,
                            text: data.text,
                            isGroup: conversation.isGroup,
                            createdAt: Date.now(),
                     });
              });
       }, []);

       React.useEffect(() => {
              loadData();
       }, [props.conversationId])

       React.useEffect(() => {
              arrivalMessage &&
                     conversation?.members.includes(arrivalMessage.senderId) &&
                     setMessages((prev) => [...prev, arrivalMessage]);
       }, [arrivalMessage, conversation]);

       React.useEffect(() => {
              setMessages(props.messages);
       }, [props.messages]);

       React.useEffect(() => {
              scrollToBottom();
       }, [messages]);

       const scrollToBottom = () => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
       }

       const handleSendNewMsg = (event) => {
              event.preventDefault();
              setSendMsgLoading(true);
              if (newMsg == "")
                     return setError("Please write something before sending!")
              const msgData = {
                     conversationId: props.conversationId,
                     senderId: user._id,
                     text: newMsg,
                     isGroup: conversation.isGroup
              }
              sendMsg(msgData, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error)
                     else {
                            setSendMsgLoading(false)
                            props.setMsgUpdated(!props.msgUpdated);
                            props.socket?.current.emit("sendMessage", {
                                   senderId: user._id,
                                   receiverId: conversation.members.find(m => m !== user._id),
                                   text: newMsg,
                            });
                            setNewMsg("")
                     }
              })
              .catch(err => console.log(err))
       }

       const handleEnter = (event) => {
              if (event.keyCode === 13) {
                     handleSendNewMsg(event);
              }
       }

       const deleteConversation = () => {
              deleteConversationById(props.conversationId, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setConversation(null);
                            setOUser(null);
                            props.setCurConversation("");
                            props.setConUpdated(!props.conUpdated);
                     }
              })
              .catch(err => console.log(err));
       }

       const deleteConPopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteConPop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete the entire conversation?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={deleteConversation} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
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
                     {errorMsg()}
                     {deleteConPopup()}
                     {oUser && (<div>
                            <div className="d-flex flex-row align-items-center m-3 text-white theme-bg rounded-3 shadow">
                                   <img className="m-2 ms-4 rounded-circle m-1" src={oUser.avatar} style={{height: "50px", width: "50px"}} />
                                   <h5 className="m-1 ms-3 fw-bold" >{oUser.name}</h5>
                                   <button className="btn btn-light rounded-3 position-absolute end-0 me-5" type="submit" data-bs-toggle="modal" data-bs-target="#deleteConPop"><i className="fas fa-trash"></i></button>
                            </div>
                     </div>)}
                     <div className="mt-3 overflow-auto mb-5" style={{maxHeight: "600px"}}>
                            {messages.length>0 ? messages.map((msg, index) => {
                                   return (<div key={index} ref={messagesEndRef}>
                                          {user._id != msg.senderId ? (<div className="d-inline-flex position-relative pb-3">
                                          <div className="d-flex flex-row align-items-center">
                                                 <img src={msg.senderId==user._id ? user.avatar : oUser.avatar} className="rounded-circle mt-2 ms-2" style={{height: "30px", width: "30px"}} />
                                                 <h6 className="mt-2 ms-2 theme-bg text-white p-2 text-wrap text-center" style={{borderRadius: "20px", maxWidth: "500px", minWidth: "100px"}}>{msg.text}</h6>
                                                 <small className="fw-lighter text-muted font-monospace position-absolute bottom-0 ps-5">{format(msg.createdAt, 'en_short')}</small>
                                          </div>
                                          
                                          </div>) : (<div className="d-inline-flex-reverse position-relative pb-3">
                                          <div className="d-flex justify-content-end">
                                                 <h6 className="m-2 p-2 text-wrap text-center" style={{borderRadius: "20px", maxWidth: "500px", minWidth: "100px", backgroundColor:"lightgray"}}>{msg.text}</h6>
                                                 <img src={msg.senderId==user._id ? user.avatar : oUser.avatar} className="rounded-circle m-2" style={{height: "30px", width: "30px"}} />
                                                 <small className="fw-lighter text-muted font-monospace position-absolute bottom-0 pe-5 me-2">{format(msg.createdAt, 'en_short')}</small>
                                          </div>
                                          
                                          </div>)}
                                   </div>)
                            }) : (<div className="position-absolute top-50 start-50 translate-middle text-center theme-bg text-white rounded-3 p-3 fs-4">No messages to display.</div>)}
                     </div>
                     {conversation && (<div className={messages.length>7 ? "row bottom-0 w-100 ms-3" : "row position-absolute bottom-0 w-100 ms-3 pe-3"} style={{flexWrap: "nowrap"}}>
                            <div className="mb-4 col-11">
                                   <input type="text" onKeyDown={handleEnter} onChange={(e) => {setNewMsg(e.target.value); setError(false)}} value={newMsg} className="form-control" id="floatingInput" placeholder="Enter message..."/>
                            </div>
                            <div className="col-1">
                                   <button onClick={handleSendNewMsg} style={{borderRadius:"10px"}} className="btn btn-purple rounded" type="submit" ><i className="fa-regular fa-paper-plane"></i></button>
                            </div>
                     </div>)}
                     
              </div>
       );
}

export default MessageList;
