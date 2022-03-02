import API from "../../backend";

export const getAllConversations = (userId, token) => {
       return fetch(`${API}/conversations/all`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(userId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getMessages = (conversationId, token) => {
       return fetch(`${API}/messages/all`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(conversationId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getConversationByMemberId = (data, token) => {
       return fetch(`${API}/conversation/find`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const createConversation = (data, token) => {
       return fetch(`${API}/conversation/create`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const sendMsg = (data, token) => {
       return fetch(`${API}/message/create`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getConversationById = (conversationId, token) => {
       return fetch(`${API}/conversation/${conversationId}`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deleteConversationById = (conversationId, token) => {
       return fetch(`${API}/conversation/${conversationId}/delete`,{
              method: "DELETE",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const createGroup = (data, token) => {
       return fetch(`${API}/group/create`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getGroupById = (groupId, token) => {
       return fetch(`${API}/group/${groupId}`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const addMemberToGroup = (groupId, userId, token) => {
       return fetch(`${API}/group/${groupId}/member/add`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(userId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getMessagesOfGroup = (groupId, token) => {
       return fetch(`${API}/group/messages/all`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(groupId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const removeMemberFromGroup = (data, groupId, token) => {
       return fetch(`${API}/group/${groupId}/member/remove`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deleteGroup = (data, groupId, token) => {
       return fetch(`${API}/group/${groupId}/delete`,{
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}