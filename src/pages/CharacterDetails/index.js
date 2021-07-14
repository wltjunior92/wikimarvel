import React, { useEffect, useState, useRef } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { MD5 } from 'crypto-js'

import { selectCharacter } from '../../store/modules/charactersList/actions'

import api from '../../services/api'

import { Header } from '../../components/Header'
import { CharacterItemCard } from '../../components/CharacterItemCard'
import { EditCharacterModal } from '../../components/EditCharacterModal'

import editImg from '../../assets/edit.png'

import { theme } from '../../styles/themes/light'

import {
  CharacterName,
  Container,
  Content,
  Description,
  ImageBanner,
  EditCharacterButton,
  EditButtonImage,
  CharacterContent,
  Buttons,
  ItemButton,
  ButtonTitle,
  ListContainer,
  ItemsList,
  LoadingNextPage,
  ListPlaceholder,
} from './styles'

export function CharacterDetails() {
  const scrollRef = useRef()
  const route = useRoute()
  const dispatch = useDispatch()
  const { characterId } = route.params

  const { character, storageCharacters } = useSelector(state => {
    return {
      character: state.listCharacters.selectedCharacter,
      storageCharacters: state.listCharacters.storageCharacters,
    }
  })

  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true)
  const [isLoadingItem, setIsLoadingItem] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({ type: '', path: '' })

  const limit = 10
  const initialItem = {
    items: [],
    offset: 0,
    total: 0,
    totalPages: 0,
    currentPage: 1,
  }

  const [selectedItems, setSelectedItems] = useState(initialItem)
  const [comics, setComics] = useState(initialItem)
  const [series, setSeries] = useState(initialItem)
  const [stories, setStories] = useState(initialItem)
  const [events, setEvents] = useState(initialItem)

  async function loadNextItemPage() {
    setIsLoadingNextPage(true)
    if (selectedItems.currentPage > selectedItems.totalPages) {
      return
    }
    const response = await api.get(selectedItem.path, {
      params: {
        limit,
        offset: selectedItems.offset,
      },
    })

    const responseData = response.data.data.results

    const parsedData = responseData.map(item => {
      return {
        id: item.id,
        title: item.title,
        cover: item.thumbnail
          ? `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
          : null,
      }
    })

    const newList = [...selectedItems.items, ...parsedData]

    const newOffset = selectedItems.offset + limit + 1

    const newItemsParams = {
      items: newList,
      offset: newOffset,
      currentPage: selectedItems.currentPage + 1,
    }

    const newLoadedItems = { ...selectedItems, ...newItemsParams }

    switch (selectedItem.type) {
      case 'comics': {
        setSelectedItems(newLoadedItems)
        setComics(newLoadedItems)
        break
      }
      case 'series': {
        setSelectedItems(newLoadedItems)
        setSeries(newLoadedItems)
        break
      }
      case 'stories': {
        setSelectedItems(newLoadedItems)
        setStories(newLoadedItems)
        break
      }
      case 'events': {
        setSelectedItems(newLoadedItems)
        setEvents(newLoadedItems)
        break
      }
      default: {
        break
      }
    }
    setIsLoadingNextPage(false)
  }

  async function handleLoadItem(type, path) {
    setIsLoadingItem(true)
    setSelectedItem({ type, path })

    if (type === 'comics' && comics.items.length !== 0) {
      setSelectedItems(comics)
      setIsLoadingItem(false)
      return
    } else if (type === 'series' && series.items.length !== 0) {
      setSelectedItems(series)
      setIsLoadingItem(false)
      return
    } else if (type === 'stories' && stories.items.length !== 0) {
      setSelectedItems(stories)
      setIsLoadingItem(false)
      return
    } else if (type === 'events' && events.items.length !== 0) {
      setSelectedItems(events)
      setIsLoadingItem(false)
      return
    }

    const response = await api.get(path, {
      params: {
        limit,
        offset: 0,
      },
    })
    const responseData = response.data.data.results

    const parsedData = responseData.map(item => {
      return {
        id: item.id,
        title: item.title,
        cover: item.thumbnail
          ? `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
          : null,
      }
    })

    const newItemsInitial = {
      items: parsedData,
      offset: limit + 1,
      total: response.data.data.total,
      totalPages: Math.ceil(response.data.data.total / limit),
    }

    const newItems = { ...comics, ...newItemsInitial }

    switch (type) {
      case 'comics': {
        setComics(newItems)
        setSelectedItems(newItems)
        break
      }
      case 'series': {
        setSeries(newItems)
        setSelectedItems(newItems)
        break
      }
      case 'stories': {
        setStories(newItems)
        setSelectedItems(newItems)
        break
      }
      case 'events': {
        setEvents(newItems)
        setSelectedItems(newItems)
        break
      }
      default: {
        break
      }
    }
    setIsLoadingItem(false)
    scrollRef.current.scrollToEnd({ animated: true })
  }

  async function loadCharacter() {
    const loadedCharacter = storageCharacters.find(
      item => item.id === characterId,
    )
    if (loadedCharacter) {
      setSelectedCharacter(loadedCharacter)
      return
    }

    const response = await api.get(`/characters/${characterId}`)
    const [responseCharacter] = response.data.data.results

    const parsedCharacter = {
      id: responseCharacter.id,
      name: responseCharacter.name,
      banner: `${responseCharacter.thumbnail.path}/landscape_xlarge.${responseCharacter.thumbnail.extension}`,
      description: responseCharacter.description,
      comics: {
        path: `/characters/${characterId}/comics`,
        quantity: responseCharacter.comics.available,
      },
      series: {
        path: `/characters/${characterId}/series`,
        quantity: responseCharacter.series.available,
      },
      stories: {
        path: `/characters/${characterId}/stories`,
        quantity: responseCharacter.stories.available,
      },
      events: {
        path: `/characters/${characterId}/events`,
        quantity: responseCharacter.events.available,
      },
    }

    setSelectedCharacter(parsedCharacter)
  }

  const setSelectedCharacter = async character => {
    dispatch(selectCharacter(character))
    setIsLoadingCharacter(false)
  }

  function openEditModal() {
    setIsEditModalOpen(true)
  }

  function closeEditModal() {
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    loadCharacter()
  }, [characterId])

  return (
    <Container>
      <Header title="Character details" />
      <Content ref={scrollRef}>
        {isLoadingCharacter ? (
          <CharacterName>Carregando</CharacterName>
        ) : (
          character && (
            <>
              <ImageBanner source={{ uri: character.banner }}>
                <TouchableOpacity activeOpacity={0.7} onPress={openEditModal}>
                  <EditCharacterButton>
                    <EditButtonImage source={editImg} />
                  </EditCharacterButton>
                </TouchableOpacity>
              </ImageBanner>
              <CharacterName>{character.name}</CharacterName>
              <Description>{character.description}</Description>

              <CharacterContent>
                <Buttons>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      handleLoadItem('comics', character.comics.path)
                    }
                  >
                    <ItemButton selected={selectedItem.type === 'comics'}>
                      <ButtonTitle>Comics</ButtonTitle>
                    </ItemButton>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      handleLoadItem('series', character.series.path)
                    }
                  >
                    <ItemButton selected={selectedItem.type === 'series'}>
                      <ButtonTitle>Series</ButtonTitle>
                    </ItemButton>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      handleLoadItem('stories', character.stories.path)
                    }
                  >
                    <ItemButton selected={selectedItem.type === 'stories'}>
                      <ButtonTitle>Stories</ButtonTitle>
                    </ItemButton>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      handleLoadItem('events', character.events.path)
                    }
                  >
                    <ItemButton selected={selectedItem.type === 'events'}>
                      <ButtonTitle>Events</ButtonTitle>
                    </ItemButton>
                  </TouchableWithoutFeedback>
                </Buttons>
                {selectedItems.items.length === 0 && !isLoadingItem ? (
                  <ListPlaceholder>Choose a category</ListPlaceholder>
                ) : isLoadingItem ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.secondary}
                  />
                ) : (
                  <ListContainer>
                    {isLoadingNextPage && (
                      <LoadingNextPage>
                        <ActivityIndicator
                          size="small"
                          color={theme.colors.secondary}
                        />
                      </LoadingNextPage>
                    )}
                    <ItemsList
                      horizontal
                      data={selectedItems.items}
                      keyExtractor={item =>
                        MD5(
                          `${item.id}${Math.ceil(Math.random() * 100000)}`,
                        ).toString()
                      }
                      onEndReached={() => loadNextItemPage()}
                      onEndReachedThreshold={3}
                      renderItem={({ item }) => (
                        <CharacterItemCard category={item} />
                      )}
                      showsVerticalScrollIndicator={false}
                    />
                  </ListContainer>
                )}
              </CharacterContent>
            </>
          )
        )}
      </Content>
      <EditCharacterModal
        visible={isEditModalOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        character={character}
        onClose={closeEditModal}
      />
    </Container>
  )
}
