import styled from 'styled-components/native'

export const Container = styled.View`
  width: 90%;
  height: 50px;
  flex-direction: row;
  padding: 0 8px 0 15px;
  margin-top: 5px;

  border-radius: 8px;
  background-color: ${props => props.theme.colors.grey50};
`

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 18px;
  color: ${props => props.theme.colors.heading};
`

export const SearchIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`
