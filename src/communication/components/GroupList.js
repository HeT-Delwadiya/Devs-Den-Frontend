import React from 'react';

function GroupList(props) {

       const [isHover, setIsHover] = React.useState(false);

       const handleChangeConversion = (event) => {
              event.preventDefault();
              props.setCurConversation("");
              props.setCurGrpConversation(props.group._id)
       }

       return (
              <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={handleChangeConversion} >
                     
                     {props.group._id && 
                            (<div className={ props.curGrpConversation == props.group._id ? "row align-items-center m-3 text-white theme-bg rounded-3 shadow-lg" : isHover ? "row align-items-center m-3 text-white theme-bg rounded-3 shadow" : "row align-items-center m-3 border"}>
                                   <div className="col-3 text-right">
                                          <img className="rounded-circle m-1" src={props.group.groupLogo} style={{height: "50px", width: "50px"}} />
                                   </div>
                                   <div className="col-9">
                                          <h5 className="m-1 fw-bold" >{props.group.groupName}</h5>
                                   </div>
                     </div>)}
                     
              </div>
       );
}

export default GroupList;
