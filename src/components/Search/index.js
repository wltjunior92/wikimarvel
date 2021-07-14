import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { clearCharactersListSearch } from '../../store/modules/charactersList/actions'

import SearchImg from '../../assets/search.png'

import { Container, SearchInput, SearchIcon, Icon } from './styles'

import { theme } from '../../styles/themes/light'

export function Search({ onSubmitSearch }) {
  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm()

  const handleSearchCharacter = data => {
    if (data.searchTerm === '') {
      clearResultCharactersList()
    } else {
      onSubmitSearch(data.searchTerm)
    }
  }

  const clearResultCharactersList = useCallback(() => {
    dispatch(clearCharactersListSearch())
  }, [])

  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <SearchInput
            placeholder="ex: Tony Stark..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={theme.colors.heading}
          />
        )}
        name="searchTerm"
        defaultValue=""
      />

      <SearchIcon
        activeOpacity={0.4}
        onPress={handleSubmit(handleSearchCharacter)}
      >
        <Icon source={SearchImg} />
      </SearchIcon>
    </Container>
  )
}
