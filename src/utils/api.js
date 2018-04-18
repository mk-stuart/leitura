const api = "http://localhost:3001"

// Generate a unique token
/*
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
/* Get - API*/
const headers = {
  'Authorization': 'whatever'
}
/* Get all of the categories available for the app. */
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/* Get all of the posts for a particular category. */
export const getAllPostsCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.categoryPosts)

/* Get all of the posts. Useful for the main page when no category is selected. */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

/* 	Get the details of a single post. */
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

/* Get all the comments for a single post. */
export const getPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.post)
    
/* 	Get the details for a single comment. */
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())
