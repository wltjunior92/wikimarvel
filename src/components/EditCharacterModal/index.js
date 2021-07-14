import React, { useCallback } from 'react'
import { TouchableOpacity, Platform, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import {
  saveCharacter,
  selectCharacter,
} from '../../store/modules/charactersList/actions'

import {
  Container,
  Overlay,
  ModalContainer,
  Field,
  FieldLabel,
  NameInput,
  DescriptionInput,
  SaveButton,
  CloseButton,
  ButtonText,
  Buttons,
} from './styles'

export function EditCharacterModal({ character, onClose, ...rest }) {
  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm()

  const updateCharacter = useCallback(character => {
    dispatch(saveCharacter(character))
    dispatch(selectCharacter(character))
  }, [])

  async function handleSaveCharacter(data) {
    const { characterDescription, characterName } = data

    const updatedCharacter = {
      ...character,
      name: characterName,
      description: characterDescription,
    }

    updateCharacter(updatedCharacter)
    onClose()
  }
  return (
    <Container {...rest}>
      <Overlay>
        <ModalContainer
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <ScrollView>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <NameInput
                    autoCorrect={false}
                    placeholder="Character name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={character?.name}
                    value={value}
                  />
                )}
                name="characterName"
                defaultValue={character?.name}
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DescriptionInput
                    multiline
                    maxLength={500}
                    placeholder="Character description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={character?.description}
                    value={value}
                  />
                )}
                name="characterDescription"
                defaultValue={character?.description}
              />
            </Field>
            <Buttons>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleSubmit(handleSaveCharacter)}
              >
                <SaveButton>
                  <ButtonText>Save</ButtonText>
                </SaveButton>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={onClose}>
                <CloseButton>
                  <ButtonText>Cancel</ButtonText>
                </CloseButton>
              </TouchableOpacity>
            </Buttons>
          </ScrollView>
        </ModalContainer>
      </Overlay>
    </Container>
  )
}
