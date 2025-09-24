import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileCard from './components/ProfileCard'
import Bai2 from './Bai2'
import Bai3 from './Bai3'

export default function _layout() {
  return (
    <SafeAreaView>
        <ProfileCard name="John Doe" job="Software Engineer" />
        <Bai2></Bai2>
        <Bai3></Bai3>
    </SafeAreaView>
  )
}
