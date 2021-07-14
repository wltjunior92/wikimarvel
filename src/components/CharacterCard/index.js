import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, CharacterImage, CharacterName } from './styles'

export function CharacterCard({ character }) {
  const navigation = useNavigation()

  function handleNavigateCharacterDetails() {
    navigation.navigate('CharacterDetails', { characterId: character.id })
  }
  return (
    <Container onPress={handleNavigateCharacterDetails} activeOpacity={0.7}>
      <CharacterImage source={{ uri: character.thumbnail }} />
      <CharacterName>{character.name}</CharacterName>
    </Container>
  )
}
