export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_POST = 'LOAD_POST'

export function loadPosts (posts){
    return {
        type: LOAD_POSTS,
        posts
    }
}

export function loadCategories (categories){
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function loadComments (comments){
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export function loadPost (post){
    return {
        type: LOAD_POST,
        post
    }
}

