import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  margin-vertical: 15px;
`

export const CharacterImage = styled.Image`
  width: 100%;
  height: 350px;
`
export const CharacterName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.heading};

  text-align: center;
`
