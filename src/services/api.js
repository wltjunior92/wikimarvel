import axios from 'axios'
import { MD5 } from 'crypto-js'

import { API_KEY, PRIVATE_API } from '@env'

const timestamp = new Date().getTime() / 1000

const hash = MD5(`${timestamp}${PRIVATE_API}${API_KEY}`).toString()

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
  params: {
    ts: timestamp,
    apikey: API_KEY,
    hash,
  },
})

export default api
