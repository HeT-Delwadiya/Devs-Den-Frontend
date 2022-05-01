import API from "../../backend";

export const checkUserEmail = (data) => {
       return fetch(`${API}/user/email/check`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const createDevProfile = (data) => {
       return fetch(`${API}/signup`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getUserById = (userId, token) => {
       return fetch(`${API}/user/${userId}`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getUserRepos = (username) => {
       return fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const createCompanyProfile = (data) => {
       return fetch(`${API}/signup`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getCompanyById = (companyId, token) => {
       return fetch(`${API}/company/${companyId}`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const follow = (data, token) => {
       return fetch(`${API}/user/follow`,{
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

export const unfollow = (data, token) => {
       return fetch(`${API}/user/unfollow`,{
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

export const uploadImage = (data) => {
       return fetch("https://api.cloudinary.com/v1_1/dev-s-den/image/upload",{
              method: "POST",
              body: data
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const updateDevProfile = (userId, data, token) => {
       return fetch(`${API}/user/${userId}/update`,{
              method: "PUT",
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

export const updateComProfile = (companyId, data, token) => {
       return fetch(`${API}/company/${companyId}/update`,{
              method: "PUT",
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

export const getAllUsers = (token) => {
       return fetch(`${API}/users/all`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getAllCompanies = (token) => {
       return fetch(`${API}/companies/all`,{
              method: "GET",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getUserBySkill = (skill, token) => {
       return fetch(`${API}/user/search/skill`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(skill)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getUserByName = (name, token) => {
       return fetch(`${API}/user/search/name`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(name)
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const getCompanyBySpeciality = (speciality, token) => {
       return fetch(`${API}/company/search/speciality`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(speciality)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getCompanyByName = (name, token) => {
       return fetch(`${API}/company/search/name`,{
              method: "POST",
              headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(name)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deleteUserAcc = (userId, token) => {
       return fetch(`${API}/user/${userId}/delete`,{
              method: "DELETE",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deleteComAcc = (companyId, token) => {
       return fetch(`${API}/company/${companyId}/delete`,{
              method: "DELETE",
              headers: {
                     Authorization: `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const verifyUserEmail = (userId, token) => {
       return fetch(`${API}/user/verify/${userId}/${token}`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}

export const verifyCompanyEmail = (companyId, token) => {
       return fetch(`${API}/company/verify/${companyId}/${token}`,{
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err)) 
}