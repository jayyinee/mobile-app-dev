import createDataContext from './createDataContext'

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          title: action.payload.title,
          content: action.payload.content,
          image: action.payload.image,
          ratings: action.payload.ratings,
        },
      ]
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload)
    case 'edit_post':
      return state.map((post) => {
        return post.id === action.payload.id ? action.payload : post
      })
    case 'get_posts':
      return action.payload
    default:
      return state
  }
}

const addDiaryPost = (dispatch) => {
  return (title, content, image, ratings, callback) => {
    dispatch({
      type: 'add_post',
      payload: {title, content, image, ratings},
    })
    if (callback) {
      callback()
    }
  }
}

const deleteDiaryPost = (dispatch) => {
  return (id) => {
    dispatch({type: 'delete_post', payload: id})
  }
}

const editDiaryPost = (dispatch) => {
  return (id, title, content, image, ratings, callback) => {
    dispatch({
      type: 'edit_post',
      payload: {id, title, content, image, ratings},
    })
    if (callback) {
      callback()
    }
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
  },
  []
)
