import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'
import ViewScreen from './src/screens/ViewScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/EditScreen'

import {Provider as DiaryProvider} from './src/context/DiaryContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    View: ViewScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Diary',
    },
  }
)

const App = createAppContainer(navigator)
export default () => {
  return (
    <DiaryProvider>
      <App />
    </DiaryProvider>
  )
}
