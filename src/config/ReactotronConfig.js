import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.1.96' })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .connect()

  console.tron = tron

  tron.clear()
}
