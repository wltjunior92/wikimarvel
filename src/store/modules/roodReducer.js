import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'

import listCharacters from './charactersList/reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['storageCharacters'],
}

export default combineReducers({
  listCharacters: persistReducer(persistConfig, listCharacters),
})
