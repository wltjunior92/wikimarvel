import React from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'

import { theme } from './styles/themes/light'
import { Routes } from './routes'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
