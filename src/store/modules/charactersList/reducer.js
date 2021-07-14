import produce from 'immer'

const INITIAL_STATE = {
  characters: [],
  resultCharactersSearch: [],
  storageCharacters: [],
  selectedCharacter: undefined,
}

function listCharacters(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'UPDATE_CHARACTERS_LIST': {
        const { charactersList } = action.payload

        draft.characters = charactersList

        break
      }
      case 'UPDATE_CHARACTERS_LIST_SEARCH': {
        const { resultCharactersList } = action.payload

        draft.resultCharactersSearch = resultCharactersList

        break
      }
      case 'CLEAR_CHARACTERS_LIST_SEARCH': {
        draft.resultCharactersSearch = []

        break
      }
      case 'SAVE_CHARACTER': {
        const { character } = action.payload

        const characterIndex = draft.storageCharacters.findIndex(
          item => item.id === character.id,
        )

        if (characterIndex >= 0) {
          draft.storageCharacters[characterIndex] = character
        } else {
          draft.storageCharacters.push(character)
        }

        break
      }
      case 'SELECT_CHARACTER': {
        draft.selectedCharacter = action.payload.character

        break
      }
      default: {
        return draft
      }
    }
  })
}

export default listCharacters
