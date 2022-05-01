import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Header from '../core/components/Header';
import Conversation from "./components/Conversation";
import MessageList from "./components/MessageList";
import { getAllConversations, getMessages, getMessagesOfGroup } from './helper/comapicalls';
import { io } from "socket.io-client";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getUserById } from '../user/helper/userapicalls';
import GroupList from './components/GroupList';
import GroupMessages from './components/GroupMessages';

function Communication(props) {

       const {user, authtoken} = isAuthenticated();

       const [conversations, setConversations] = React.useState([]);
       const [messages, setMessages] = React.useState([]);
       const [grpMessages, setGrpMessages] = React.useState([]);
       const [curConversation, setCurConversation] = React.useState("");
       const [curGrpConversation, setCurGrpConversation] = React.useState("");
       const [isLoading, setIsLoading] = React.useState(true);
       const [msgLoading, setMsgLoading] = React.useState(false);
       const [error, setError] = React.useState(false);
       const [msgUpdated, setMsgUpdated] = React.useState(false);
       const [grpMsgUpdated, setGrpMsgUpdated] = React.useState(false);
       const [conUpdated, setConUpdated] = React.useState(false);
       const [groups, setGroups] = React.useState(null);
       const socket = React.useRef();

       const loadAllData = () => {
              setIsLoading(true)
              getAllConversations({userId:user._id}, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err);
                     else {
                            setConversations(data);
                     }
              })
              .catch(err => console.log(err));

              getUserById(user._id, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err)
                     else {
                            setGroups(data.groups)
                     }
              })
              setIsLoading(false);
       }

       const loadMessages = () => {
              setMsgLoading(true);
              getMessages({conversationId:curConversation}, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err);
                     else {
                            setMessages(data);
                            setMsgLoading(false);
                     }
              })
              .catch(err => console.log(err))
       }

       const loadGrpMessages = () => {
              setMsgLoading(true);
              getMessagesOfGroup({groupId:curGrpConversation}, authtoken)
              .then(data => {
                     if(data.err)
                            setError(data.err);
                     else {
                            setGrpMessages(data);
                            setMsgLoading(false);
                     }
              })
              .catch(err => console.log(err));
       }

       React.useEffect(() => {
              loadAllData();
              socket.current = io(process.env.REACT_APP_SOCKET_URL);
       }, []);

       React.useEffect(() => {
              loadMessages();
       }, [curConversation, msgUpdated]);

       React.useEffect(() => {
              loadGrpMessages();
       }, [curGrpConversation, grpMsgUpdated]);

       React.useEffect(() => {
              loadAllData();
              loadMessages();
       }, [conUpdated]);

       React.useEffect(() => { 
              socket?.current.emit("addUser", user._id);
       }, [user]);

       React.useEffect(() => {
              return () => {
                     socket?.current.emit("disconnectUser", user._id);
              };
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

       const loadingMsg = () => {
              return <div className="custom-loading" style={{display: msgLoading ? "" : "none"}}>
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
                     <Header msg={true} />
                     
                     <div className="container mb-4 mt-5">
                            <div className="row bg-white h-100 rounded-3 shadow" style={{minHeight: "700px"}}>
                                   <div className="col-3">
                                          {conversations?.length>0 || groups?.length>0 ? (conversations.map((con, index) => {
                                                 return <Conversation key={index} conversation={con} curConversation={curConversation} setCurConversation={setCurConversation} setCurGrpConversation={setCurGrpConversation}/>
                                          })) : (<div className="position-absolute top-50 start-50 translate-middle text-center theme-bg text-white rounded-3"><h4 className="p-3">No conversations found</h4></div>)}
                                          {groups && groups.map((grp, index) => {
                                                 return <GroupList key={index} group={grp} curGrpConversation={curGrpConversation} setCurConversation={setCurConversation} setCurGrpConversation={setCurGrpConversation} />
                                          })}
                                          {user?.type==0 && (<Link to={"/conversations/group/create"}><div className="row align-items-center m-3 border p-3 theme-bg text-white">
                                                 <h5 className="m-1 fw-bold" ><i className="fa-solid fa-plus"></i><i className="fa-solid fa-user-group"></i>    Create group</h5>
                                          </div></Link>)}
                                   </div>
                                   <div className="col-9 position-relative">
                                          <div className="position-absolute top-40 start-50 translate-middle ms-5 ps-3 mt-5">{loading()}{loadingMsg()}</div>
                                          {curConversation=="" && curGrpConversation=="" ? (
                                                 <div className="position-absolute top-50 start-50 translate-middle text-center theme-bg text-white rounded-3" style={{display: conversations.length>0 ? "" : "none"}}><h4 className="p-3">Select any conversation to start communication</h4></div>
                                                 ) : (curGrpConversation=="" ? 
                                                 <MessageList messages={messages} conversationId={curConversation} setCurConversation={setCurConversation} msgUpdated={msgUpdated} setMsgUpdated={setMsgUpdated} history={props.history} conUpdated={conUpdated} setConUpdated={setConUpdated} socket={socket} /> : 
                                                 <GroupMessages grpMessages={grpMessages} setGrpMessages={setGrpMessages} grpMsgUpdated={grpMsgUpdated} setGrpMsgUpdated={setGrpMsgUpdated} curGrpConversation={curGrpConversation} setCurGrpConversation={setCurGrpConversation} socket={socket} /> )}
                                   </div>
                            </div>
                     </div>
                     
              </div>
       );
}

export default withRouter(Communication);
