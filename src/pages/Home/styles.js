import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;

  background: ${props => props.theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 10px;
  align-items: center;
  background-color: ${props => props.theme.colors.firstPlan};
`

export const Title = styled.Text`
  color: ${props => props.theme.colors.heading};
  font-weight: 700;
  font-size: 38px;
`

export const CharactersList = styled.FlatList`
  width: 100%;
`
