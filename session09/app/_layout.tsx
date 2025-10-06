import React from 'react'
import AppNavigator from './AppNavigator'
import { View } from 'react-native/Libraries/Components/View/View'

export default function _layout() {
  return (
    <div>
        <View>
            <AppNavigator></AppNavigator>
        </View>
    </div>
  )
}
