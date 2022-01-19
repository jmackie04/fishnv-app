import axios from 'axios'
import { ref, shallowRef } from 'vue'

const api = axios.create({
  baseURL: import.meta.env.VITE_APIURL || 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// api.interceptors.request.use((config) => {
//   return new Promise(resolve => setTimeout(() => resolve(config), 500))
// })

const getFishableWaters = async () => {
  try {
    const response = await api.get('fishable-waters')
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

const getFishableWatersById = (id) => {
  const isOk = ref(false)
  const isLoading = ref(true)
  const isFinished = ref(false)
  const data = shallowRef()
  const error = shallowRef()

  api.get(`fishable-waters/${id}`)
    .then((response) => {
      data.value = response.data
      isOk.value = true
    })
    .catch((e) => {
      console.error(e)
      error.value = e
      isOk.value = false
    })
    .finally(() => {
      isLoading.value = false
      isFinished.value = true
    })

  return {
    data,
    error,
    ok: isOk,
    loading: isLoading,
    finished: isFinished
  }
}

export {
  getFishableWaters,
  getFishableWatersById
}