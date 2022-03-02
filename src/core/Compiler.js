import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Footer from './components/Footer';
import Header from './components/Header';
import { executeCode, fetchResult, saveCode, updateCode, deleteCode } from './helper/coreapicalls';
import MonacoEditor from '@uiw/react-monacoeditor';

function Compiler() {

       const [language, setLanguage] = React.useState("java");
       const [code, setCode] = React.useState("");
       const [input, setInput] = React.useState("");
       const [isLoading, setIsLoading] = React.useState(false);
       const [error, setError] = React.useState("");
       const [sid, setSid] = React.useState("");
       const [output, setOutput] = React.useState("");
       const [savedCode, setSavedCode] = React.useState({});
       const [isGenerating, setIsGenerating] = React.useState(false);
       const [codeLink, setCodeLink] = React.useState("");
       const [isCopied, setIsCopied] = React.useState(false);
       const [isChangesSaved, setIsChangesSaved] = React.useState(false);
       const [isDeleting, setIsDeleting] = React.useState(false);

       const {user} = isAuthenticated();

       const useTab = (e) => {
              if ( e.key === 'Tab' && !e.shiftKey ) {
                     document.execCommand('insertText', false, "\t");
                     e.preventDefault();
                     return false;
              }
       }

       const onChange = (newValue, e) => {
              //console.log('onChange', e);
              setCode(newValue);
              setIsChangesSaved(false);
              setError(false);
       };

       const handleSubmit = (e) => {
              e.preventDefault();
              setIsLoading(true);
              
              if(code=="") {
                     setIsLoading(false);
                     return setError("Please write code first then execute!")
              } 

              executeCode({lang: language, code: code, input: input})
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            data = JSON.parse(data);
                            if (data.status=="SUCCESS") {
                                   setSid(data.sid)
                                   getResult(data.sid);
                            }
                     }
              })
              .catch(err => console.log(err))
       }

       const getResult = (dataSid) => {
              fetchResult({sid: sid=="" ? dataSid : sid})
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            data = JSON.parse(data);
                            if (data.status=="SUCCESS") {
                                   setSid("");
                                   if(data.compResult=="F")
                                          setOutput(data.cmpError);
                                   if(data.rntError)
                                          setOutput(data.rntError);
                                   setOutput(data.output);
                                   setIsLoading(false);
                            } else if(data.status=="IN-QUEUE") {
                                   getResult(dataSid);
                            } else {
                                   setError("Something went wrong. Please try again!");
                            }
                     }
              })
              .catch(err => console.log(err))
       }

       const onClickSave = (event) => {
              event.preventDefault();
              setIsGenerating(true);
              saveCode({user: user._id, lang: language, code: code, input: input})
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            setSavedCode(data);
                            setCodeLink(`${process.env.REACT_APP_FRONTEND}compiler/code/`+data._id+"/");
                            setIsGenerating(false);
                     }
              })
              .catch(err => console.log(err))
       } 

       const onClickSaveChanges = (event) => {
              event.preventDefault();
              setIsGenerating(true);
              updateCode({user: user._id, lang: language, code: code, input: input}, savedCode._id)
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            setSavedCode(data);
                            setIsGenerating(false);
                            setIsChangesSaved(true);
                     }
              })
              .catch(err => console.log(err))
       }

       const onClickCodeDelete = (event) => {
              event.preventDefault();
              setIsDeleting(true);
              deleteCode(savedCode._id)
              .then(data => {
                     if(data.error)
                            setError(error)
                     else {
                            setSavedCode(false);
                            setIsDeleting(false);
                            setCodeLink("");
                     }
              })
              .catch(err => console.log(err))
       }

       const deleteCodePopup = () => {
              return (<div>
                     <div className="modal fade" id="deleteCodePop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                                 Are you sure, you want to delete this saved code?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={onClickCodeDelete} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const handleCopy = () => {
              var copyText = document.getElementById("sharelink");
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              navigator.clipboard.writeText(copyText.value);
              setIsCopied(true);
       }

       const errorMsg = () => {
              return (
                     <div className="container mt-3">
                            <div className="alert alert-danger text-center mb-5" style={{display: error ? "" : "none"}}>
                                   {error}
                            </div>
                     </div>
              );
       }

       return (
              <div>
                     <Header tools={true} />
                            <div className="container mt-5">
                                   {errorMsg()}
                                   {deleteCodePopup()}
                                   <div className="row">
                                          <div className="col-2"><h3>Language: </h3></div>
                                          <div className="col-10">
                                                 <div className="input-group">
                                                        <div className="input-group-prepend col-2">
                                                               <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Default select example">
                                                                      <option value="java">Java</option>
                                                                      <option value="python">Python</option>
                                                                      <option value="python3">Python3</option>
                                                                      <option value="c">C</option>
                                                                      <option value="cpp">C++</option>
                                                                      <option value="Cpp14">C++14</option>
                                                                      <option value="Csharp">C#</option>
                                                                      <option value="Perl">Perl</option>
                                                                      <option value="Php">PHP</option>
                                                                      <option value="Scala">Scala</option>
                                                               </select>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                                   <hr />
                                   <h3>Code: </h3>
                                   {/* <div>
                                          <pre><textarea onChange={(e) => {setCode(e.target.value); setError(false); setIsChangesSaved(false)}} value={code} className="form-control mt-3" spellCheck="false" id="floatingInput" placeholder="Start coding..." rows="5" style={{height:"450px"}} onKeyDown={useTab}></textarea></pre>
                                   </div> */}
                                   <div>
                                          <pre><MonacoEditor
                                                 language={language}
                                                 value={code}
                                                 onChange={onChange}
                                                 height="500px"
                                                 width="100"
                                                 options={{
                                                        theme: 'vs-dark',
                                                 }}
                                          /></pre>
                                   </div>
                                   <hr />
                                   <h3>Stdin Inputs: </h3>
                                   <div>
                                          <pre><textarea onChange={(e) => setInput(e.target.value)} value={input} className="form-control mt-3" spellCheck="false" id="floatingInput" placeholder="" rows="5" style={{height:"150px"}} onKeyDown={useTab}></textarea></pre>
                                   </div>
                                   <hr />
                                   <div className="mx-auto d-grid mb-5">
                                          <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">{isLoading ? <span className="spinner-border spinner-border-sm text-white"></span> : <i className="fas fa-play"></i>}{isLoading ? "  Executing..." : "  Execute"}</button>
                                   </div>
                                   <hr />
                                   <h3>Output: </h3>
                                   <div>
                                          <pre><textarea value={output} className="form-control mt-3 mb-5 unique-color-dark text-white" id="log" placeholder="" rows="5" style={{height:"250px"}} disabled></textarea></pre>
                                   </div>
                                   <hr />
                                   {!codeLink=="" &&(<div className="row">
                                          <div className="mb-4 col-10 mx-auto">
                                                 <input type="text" value={codeLink} className="form-control p-3" id="sharelink" placeholder="John Cena" disabled/>
                                          </div>
                                          <div className="col-2 mx-auto mb-5">
                                                 <button onClick={handleCopy} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit"><i class="fas fa-copy"></i>  Copy Link</button>
                                          </div>
                                   </div>)}
                                   {codeLink=="" && (<div className="mx-auto d-grid mb-5">
                                          <button onClick={onClickSave} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">{isGenerating ? <span className="spinner-border spinner-border-sm text-white"></span> : <i class="fas fa-share-alt"></i>}{isGenerating ? "  Generating..." : "  Generate sharable link"}</button>
                                   </div>)}
                                   {!codeLink=="" && (<div className="mx-auto d-grid mb-5">
                                          <button onClick={onClickSaveChanges} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">{isGenerating ? <span className="spinner-border spinner-border-sm text-white"></span> : <i class="fas fa-save"></i>}{isChangesSaved ? "  Changes Saved" : (isGenerating ? "  Saving..." : "  Save changes")}</button>
                                   </div>)}
                                   {!codeLink=="" && (<div className="mx-auto d-grid mb-5">
                                          <button data-bs-toggle="modal" data-bs-target="#deleteCodePop" style={{borderRadius:"10px"}} className="btn btn-danger rounded btn-login text-uppercase fw-bold" type="submit">{isDeleting ? <span className="spinner-border spinner-border-sm text-white"></span> : <i class="fas fa-trash-alt"></i>}{isDeleting ? "  Deleting..." : "  Delete Code"}</button>
                                   </div>)}
                            </div>
                     <Footer />
              </div>
       );
}

export default Compiler;