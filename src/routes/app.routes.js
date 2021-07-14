import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { CharacterDetails } from '../pages/CharacterDetails'

import { theme } from '../styles/themes/light'

const { Navigator, Screen } = createStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="CharacterDetails" component={CharacterDetails} />
    </Navigator>
  )
}
