import React, {useContext} from 'react'
import PostForm from '../components/PostForm'
import {Context} from '../context/DiaryContext'

const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state, editDiaryPost} = useContext(Context)
  const post = state.find(
    (diaryPost) => diaryPost.id === navigation.getParam('id')
  )

  return (
    <PostForm
      inititalValues={{
        title: post.title,
        content: post.content,
        image: post.image,
        ratings: post.ratings,
      }}
      onSubmit={(title, content, image, ratings) => {
        editDiaryPost(id, title, content, image, ratings, () =>
          navigation.navigate('View', {id: id})
        )
      }}
    />
  )
}

export default EditScreen
