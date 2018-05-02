export function datePost(post){
  let datePost = new Date(post)
  datePost = `${datePost.getDate()}/${datePost.getMonth()}/${datePost.getFullYear()}`
  return datePost
}

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}