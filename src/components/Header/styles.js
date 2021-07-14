import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background: ${props => props.theme.colors.firstPlan};

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding-horizontal: 14px;
  padding-top: 35px;
`
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.highlight};
`
export const Icon = styled.TouchableOpacity``

export const BackIcon = styled.Image`
  width: 20px;
  height: 20px;
`
