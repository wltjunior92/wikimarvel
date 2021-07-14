import styled from 'styled-components/native'

export const Container = styled.Modal``

export const Overlay = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.overlay};
`
export const ModalContainer = styled.KeyboardAvoidingView`
  overflow: hidden;
  margin-top: 100px;
  margin-horizontal: 20px;
  padding: 7px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
`

export const Field = styled.View`
  margin: 8px 10px;
`

export const FieldLabel = styled.Text`
  font-weight: bold;
`

export const NameInput = styled.TextInput`
  margin-top: 5px;
  padding: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.grey50};
  border-radius: 8px;
  background-color: ${props => props.theme.colors.thirdPlan};
  color: ${props => props.theme.colors.heading};
`
export const DescriptionInput = styled(NameInput)`
  height: 150px;
  text-align-vertical: top;
`

export const Buttons = styled.View`
  width: 95%;
  flex-direction: row;
  margin: 0 auto;
  justify-content: space-evenly;
`

export const SaveButton = styled.View`
  margin: 10px auto;
  align-items: center;
  justify-content: center;

  height: 50px;
  background-color: ${props => props.theme.colors.primary};
  width: 130px;
  border-radius: 8px;
`
export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.firstPlan};
  font-size: 20px;
`

export const CloseButton = styled(SaveButton)`
  background-color: ${props => props.theme.colors.grey500};
`
