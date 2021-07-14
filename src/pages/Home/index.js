import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'

import {
  updateCharactersList,
  updateCharactersListSearch,
} from '../../store/modules/charactersList/actions'

import api from '../../services/api'

import { CharacterCard } from '../../components/CharacterCard'
import { Search } from '../../components/Search'

import { theme } from '../../styles/themes/light'

import { Container, Header, Title, CharactersList } from './styles'

export function Home() {
  const dispatch = useDispatch()

  const { charactersList, resultCharactersSearchList } = useSelector(state => {
    const charactersList = state.listCharacters.characters
    const resultCharactersSearchList =
      state.listCharacters.resultCharactersSearch
    return {
      charactersList,
      resultCharactersSearchList,
    }
  })

  const [isFirsLoad, setIsFisrtLoad] = useState(true)
  const [isLoading, setIsloading] = useState(true)
  const [offset, setOffset] = useState(0)

  const limit = 5

  async function loadPage(searchTerm) {
    setIsloading(true)
    if (searchTerm === '' || !searchTerm) {
      const response = await api.get('/characters', {
        params: {
          limit,
          offset,
          orderBy: '-modified',
        },
      })

      const { data } = await response.data

      const list = data.results.map(character => {
        return {
          id: character.id,
          name: character.name,
          thumbnail: `${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`,
        }
      })

      updateList([...charactersList, ...list])
      setOffset(offset + limit)
      setIsFisrtLoad(false)
    } else if (searchTerm) {
      const response = await api.get('/characters', {
        params: {
          limit: 20,
          orderBy: '-modified',
          nameStartsWith: searchTerm,
        },
      })

      const { data } = await response.data

      const list = data.results.map(character => {
        return {
          id: character.id,
          name: character.name,
          thumbnail: `${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`,
        }
      })

      loadSearch(list)
    }

    setIsloading(false)
  }

  useEffect(() => {
    loadPage()
  }, [])

  const updateList = useCallback(
    charactersList => {
      dispatch(updateCharactersList(charactersList))
    },
    [dispatch],
  )

  const loadSearch = useCallback(
    charactersList => {
      dispatch(updateCharactersListSearch(charactersList))
    },
    [dispatch],
  )

  return (
    <Container>
      <Header>
        <Title>WikiMarvel</Title>
        <Search onSubmitSearch={loadPage} />
      </Header>

      {isFirsLoad ? (
        <ActivityIndicator
          style={{ marginTop: 100 }}
          size="large"
          color={theme.colors.primary}
        />
      ) : resultCharactersSearchList.length !== 0 ? (
        <>
          <CharactersList
            data={resultCharactersSearchList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CharacterCard character={item} />}
            showsVerticalScrollIndicator={false}
          />
          {isLoading && (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
        </>
      ) : (
        <>
          <CharactersList
            data={charactersList}
            keyExtractor={item => item.id}
            onEndReached={() => loadPage()}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => <CharacterCard character={item} />}
            showsVerticalScrollIndicator={false}
          />
          {isLoading && (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
        </>
      )}
    </Container>
  )
}
