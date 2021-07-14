export function updateCharactersList(charactersList) {
  return {
    type: 'UPDATE_CHARACTERS_LIST',
    payload: {
      charactersList,
    },
  }
}

export function updateCharactersListSearch(resultCharactersList) {
  return {
    type: 'UPDATE_CHARACTERS_LIST_SEARCH',
    payload: {
      resultCharactersList,
    },
  }
}

export function clearCharactersListSearch() {
  return {
    type: 'CLEAR_CHARACTERS_LIST_SEARCH',
  }
}

export function saveCharacter(character) {
  return {
    type: 'SAVE_CHARACTER',
    payload: {
      character,
    },
  }
}

export function selectCharacter(character) {
  return {
    type: 'SELECT_CHARACTER',
    payload: {
      character,
    },
  }
}
