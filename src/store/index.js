import { createStore } from 'redux'
import { persistStore } from 'redux-persist'

import rootReducer from './modules/roodReducer'

export const store = createStore(rootReducer)
export const persistor = persistStore(store)
