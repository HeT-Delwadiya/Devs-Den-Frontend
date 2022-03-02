import React from 'react';
import { isAuthenticated } from '../../auth/helper/index';
import { getCompanyById, getUserById } from '../../user/helper/userapicalls';

function Conversation(props) {

       const [oUser, setOUser] = React.useState({});
       const [error, setError] = React.useState(false);
       const [isLoading, setIsLoading] = React.useState(true);
       const [isHover, setIsHover] = React.useState(false);

       const {user, authtoken} = isAuthenticated();
       const friendId = props.conversation.members.find(m => m !== user._id)

       const loadFriendsData = () => {
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

       React.useEffect(() => {
              loadFriendsData();
       }, []);

       const handleChangeConversion = (event) => {
              event.preventDefault();
              props.setCurGrpConversation("")
              props.setCurConversation(props.conversation._id)
       }

       return (
              <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={handleChangeConversion} >
                     
                     {oUser._id && 
                            (<div className={ props.curConversation == props.conversation._id ? "row align-items-center m-3 text-white theme-bg rounded-3 shadow-lg" : isHover ? "row align-items-center m-3 text-white theme-bg rounded-3 shadow" : "row align-items-center m-3 border"}>
                                   <div className="col-3 text-right">
                                          <img className="rounded-circle m-1" src={oUser.avatar} style={{height: "50px", width: "50px"}} />
                                   </div>
                                   <div className="col-9">
                                          <h5 className="m-1 fw-bold" >{oUser.name}</h5>
                                   </div>
                     </div>)}
                     
              </div>
       );
}

export default Conversation;
