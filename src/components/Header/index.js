import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import arrowLeftImg from '../../assets/left-arrow.png'

import { Container, Title, Icon, BackIcon } from './styles'

export function Header({ title }) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Icon onPress={handleGoBack}>
        <BackIcon source={arrowLeftImg} />
      </Icon>
      <Title>{title}</Title>
      <View style={{ width: 25, height: 20 }} />
    </Container>
  )
}
