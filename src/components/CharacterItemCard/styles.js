import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  ${props =>
    !props.hasCover
      ? 'max-width: 250px;' + 'height: 60px;'
      : 'width: 250px;' + 'height: 420px'}
  padding: 10px 8px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.firstPlan};
  margin-horizontal: 7px;
`

export const Cover = styled.Image`
  width: 235px;
  height: 330px;
`

export const Title = styled.Text`
  margin-top: ${props => (props.hasCover ? '20px' : '0px')};
  font-size: 16px;
  font-weight: 700;
`
