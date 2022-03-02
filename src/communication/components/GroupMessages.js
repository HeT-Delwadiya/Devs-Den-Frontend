import React from 'react';
import { isAuthenticated } from '../../auth/helper';
import { sendMsg, getGroupById } from '../helper/comapicalls';
import { format, register } from 'timeago.js';
import enShort from "../components/TimeagoShort";
import { Link } from 'react-router-dom';

register('en_short', enShort);

function GroupMessages(props) {

       const {user, authtoken} = isAuthenticated();

       const [group, setGroup] = React.useState(null);
       const [error, setError] = React.useState(false);
       const [newMsg, setNewMsg] = React.useState("");
       const [sendMsgLoading, setSendMsgLoading] = React.useState(false);
       const messagesEndRef = React.useRef(null);
       const [arrivalMessage, setArrivalMessage] = React.useState(null);
       const [messages, setMessages] = React.useState([]);

       const loadData = () => {
              getGroupById(props.curGrpConversation, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err);
                     else {
                            setGroup(data);
                     }
              })
              .catch(err => console.log(err))
       }

       React.useEffect(() => {
              loadData();
              setMessages(props.grpMessages);
              props.socket?.current.on("getGrpMessage", (data) => {
                     setArrivalMessage({
                            senderId: data.senderId,
                            text: data.text,
                            isGroup: true,
                            createdAt: Date.now(),
                     });
              });
       }, []);

       React.useEffect(() => {
              loadData();
       }, [props.curGrpConversation]);

       React.useEffect(() => {
              let m = []
              group?.groupMembers.map(mem => m.push(mem._id));
              arrivalMessage && m.includes(arrivalMessage.senderId._id) && setMessages((prev) => [...prev, arrivalMessage]);
       }, [arrivalMessage, group]);

       React.useEffect(() => {
              setMessages(props.grpMessages);
       }, [props.grpMessages]);

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
                     groupId: group._id,
                     senderId: user._id,
                     text: newMsg,
                     isGroup: true
              }
              sendMsg(msgData, authtoken)
              .then(data => {
                     if(data.error)
                            setError(data.error)
                     else {
                            setSendMsgLoading(false);
                            props.setGrpMsgUpdated(!props.grpMsgUpdated);
                            let receiversObj = group.groupMembers.filter(m => m._id != user._id);
                            let receivers = []
                            receiversObj.map(rec => receivers.push(rec._id));
                            props.socket?.current.emit("sendGrpMessage", {
                                   senderId: {_id:user._id, avatar: user.avatar, name: user.name},
                                   receiverIds: receivers,
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
                     {group && (<div>
                            <div className="d-flex flex-row align-items-center m-3 text-white theme-bg rounded-3 shadow">
                                   <img className="m-2 ms-4 rounded-circle m-1" src={group.groupLogo} style={{height: "50px", width: "50px"}} />
                                   <h5 className="m-1 ms-3 fw-bold" >{group.groupName}</h5>
                                   <Link className="btn btn-light rounded-3 position-absolute end-0 me-5" to={`/conversations/group/${group._id}/info`} ><i class="fa-solid fa-info px-1"></i></Link>
                            </div>
                     </div>)}
                     <div className="mt-3 overflow-auto mb-5" style={{maxHeight: "600px"}}>
                            {messages.length>0 ? messages.map((msg, index) => {
                                   return (<div key={index} ref={messagesEndRef}>
                                          {user._id != msg.senderId._id ? (<div className="d-inline-flex position-relative pb-3">
                                          <div className="d-flex flex-row align-items-center">
                                                 <img src={msg.senderId.avatar} className="rounded-circle mt-4 ms-2" style={{height: "30px", width: "30px"}} />
                                                 <h6 className="mt-2 ms-2 theme-bg p-2 text-wrap ps-3 pe-3" style={{borderRadius: "20px", maxWidth: "500px", minWidth: "100px", lineHeight: "1.5"}}><small className="fw-lighter mb-2 fst-italic" style={{textSize: "0.1rem", color: "#fff"}}>{msg.senderId.name}</small><br /><span className="text-white fw-bolder">{msg.text}</span></h6>
                                                 <small className="fw-lighter text-muted font-monospace position-absolute bottom-0 ps-5">{format(msg.createdAt, 'en_short')}</small>
                                          </div>
                                          
                                          </div>) : (<div className="d-inline-flex-reverse position-relative pb-3">
                                          <div className="d-flex justify-content-end">
                                                 <h6 className="mt-4 p-2 text-wrap text-end pe-3 ps-3" style={{borderRadius: "20px", maxWidth: "500px", minWidth: "50px", lineHeight: "1.5", backgroundColor: "lightgray"}}><small className="fw-lighter mb-2 fst-italic" style={{textSize: "0.1rem", color: "gray"}}>{msg.senderId.name}</small><br /><span><h6 className="fw-bolder">{msg.text}</h6></span></h6>
                                                 <img src={user.avatar} className="rounded-circle m-2 mt-5" style={{height: "30px", width: "30px"}} />
                                                 <small className="fw-lighter text-muted font-monospace position-absolute bottom-0 pe-5 me-2">{format(msg.createdAt, 'en_short')}</small>
                                          </div>
                                          
                                          </div>)}
                                   </div>)
                            }) : (<div className="position-absolute top-50 start-50 translate-middle text-center theme-bg text-white rounded-3 p-3 fs-4">No messages to display.</div>)}
                     </div>
                     {group && (<div className={messages.length>4 ? "row bottom-0 w-100 ms-3" : "row position-absolute bottom-0 w-100 ms-3 pe-3"} style={{flexWrap: "nowrap"}}>
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

export default GroupMessages;
