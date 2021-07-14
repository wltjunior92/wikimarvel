import styled from 'styled-components/native'

export const Container = styled.View`
  margin-bottom: 100px;
`
export const Content = styled.ScrollView``
export const ImageBanner = styled.ImageBackground`
  width: 100%;
  height: 250px;
  align-items: flex-end;
  padding: 10px;
`

export const EditCharacterButton = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 30px;
  background-color: ${props => props.theme.colors.grey600};
  opacity: 0.6;
  align-items: center;
  justify-content: center;
`

export const EditButtonImage = styled.Image``

export const CharacterName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 8px;
`
export const Description = styled.Text`
  font-size: 14px;
  margin-horizontal: 8px;
`

export const CharacterContent = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
`
export const Buttons = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ItemButton = styled.View`
  flex: 1;
  padding-vertical: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.selected ? props.theme.colors.secondary : 'transparent'};
  border-radius: 8px;
`

export const ButtonTitle = styled.Text`
  font-size: 18px;
`

export const ListContainer = styled.View`
  margin-top: 25px;
`

export const ItemsList = styled.FlatList`
  margin-bottom: 20px;
  padding-right: 50px;
`

export const LoadingNextPage = styled.View`
  position: absolute;
  top: -25px;
  right: 5px;
`

export const ListPlaceholder = styled.Text`
  margin-top: 20px;
  color: ${({ theme: { colors } }) => colors.grey100};
`
