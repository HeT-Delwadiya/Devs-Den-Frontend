import API from "../../backend";

export const createPost = (data, token) => {
       return fetch(`${API}/user/post/create`,{
              method: "POST",
              headers: {
                   Accept: "application/json",
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getPost = (postId) => {
       return fetch(`${API}/post/${postId}`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const likePost = (postId, userId, token) => {
       return fetch(`${API}/post/${postId}/like`,{
              method: "POST",
              headers: {
                   Accept: "application/json",
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(userId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const dislikePost = (postId, userId, token) => {
       return fetch(`${API}/post/${postId}/dislike`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(userId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getPosts = () => {
       return fetch(`${API}/posts`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const addComment = (postId, data, token) => {
       return fetch(`${API}/post/${postId}/comment/add`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const removeComment = (postId, commentId, token) => {
       return fetch(`${API}/post/${postId}/comment/remove`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(commentId)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const removePost = (postId, token) => {
       return fetch(`${API}/post/${postId}/delete`,{
              method: "DELETE",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}