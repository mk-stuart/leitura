import { combineReducers } from 'redux'

import {
    ADD_POST,
    ADD_COMMENT,
    REMOVE_POST,
    REMOVE_COMMENT,
} from '../actions'

function post (state = initialLeituraState, action){
    const { post, comment } = action
    switch (action.type) {
        case ADD_POST : 
            const { content } = action
            return {
                ...state,
                [content.title]: content,
            }
        case ADD_COMMENT : 
            return {
                ...state,
            }
        default:
            return state
    }
}
/*

function calendar (state = initialCalendarState, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}

*/
const initialLeituraState = {
    post: {
        content: null,
        comment: null,
    }
}

export default combineReducers({
    post,
})