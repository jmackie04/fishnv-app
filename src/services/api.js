import { reactive, ref } from 'vue'
import axios from 'axios'

const FishNvApi = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const getFishableWaters = async () => {
  try {
    const response = await FishNvApi.get('fishable-waters')
    const { data, ...meta } = response
    
    return {
      ok: true,
      data: data.slice(0, 5),
      meta
    }
  } catch (e) {
    return {
      ok: false,
      error: e
    }
  }
}

export {
  getFishableWaters
}