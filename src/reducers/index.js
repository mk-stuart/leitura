import { combineReducers } from 'redux'

import {
    LOAD_POSTS,
    LOAD_CATEGORIES,
    LOAD_COMMENTS,
    LOAD_POST,
} from '../actions'

function categories (state = [], action){
    switch (action.type){
        case LOAD_CATEGORIES :
            return action.categories
        default:
            return state
    }
}

function posts (state = [], action){
    switch (action.type) {
        case LOAD_POSTS : 
            return action.posts
        default:
            return state
    }
}

function post (state = {}, action){
    const { post } = action
    switch (action.type) {
        case LOAD_POST : 
            return post
        default:
            return state
    }
}

function comment (state = [], action){

}
export default combineReducers({
    post, posts, categories
})