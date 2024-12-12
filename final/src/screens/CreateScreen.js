import React, {useContext} from 'react'
import PostForm from '../components/PostForm'
import {Context} from '../context/DiaryContext'

const CreateScreen = ({navigation}) => {
  const {addDiaryPost} = useContext(Context)

  return (
    <PostForm
      onSubmit={(title, content, image, ratings) => {
        addDiaryPost(title, content, image, ratings, () =>
          navigation.navigate('Index')
        )
      }}
    />
  )
}

export default CreateScreen
