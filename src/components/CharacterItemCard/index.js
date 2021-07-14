import React from 'react'

import { Container, Cover, Title } from './styles'

export function CharacterItemCard({ category }) {
  return (
    <Container hasCover={category.cover !== null}>
      {category.cover && <Cover source={{ uri: category.cover }} />}
      <Title hasCover={category.cover !== null}>{category.title}</Title>
    </Container>
  )
}
