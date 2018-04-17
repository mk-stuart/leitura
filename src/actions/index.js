export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_POST = 'REMOVE_POST'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addPost ({ post }){
    return {
        type: ADD_POST,
        post,
    }
}

export function addComment ({ comment }){
    return {
        type: ADD_COMMENT,
        comment,
    }
}

export function removePost ({ post }){
    return {
        type: REMOVE_POST,
        post,
    }
}

export function removeComment ({ comment }){
    return {
        type: REMOVE_COMMENT,
        comment
    }
}

