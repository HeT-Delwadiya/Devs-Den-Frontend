import API from "../../backend";

export const executeCode = (data) => {
       return fetch(`${API}/compiler/api`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const fetchResult = (data) => {
       return fetch(`${API}/compiler/result/fetch`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const saveCode = (data) => {
       return fetch(`${API}/compiler/code/save`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getCode = (codeId) => {
       return fetch(`${API}/compiler/code/${codeId}`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const updateCode = (data, codeId) => {
       return fetch(`${API}/compiler/code/${codeId}/update`,{
              method: "PUT",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const deleteCode = (codeId) => {
       return fetch(`${API}/compiler/code/${codeId}/delete`,{
              method: "DELETE"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const sendContactMsg = (data) => {
       return fetch(`${API}/contact/new`, {
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}