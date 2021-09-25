import { ref, computed, reactive } from 'vue'
import axios from 'axios'

export const useFetch = (url, config = {}) => {
  const data = ref(null)
  const response = ref(null)
  const error = ref(null)
  const loading = ref(null)

  const fetch = async () => {
    loading.value = true

    try {
      const result = await axios.request({
        url,
        ...config
      })

      response.value = result
      data.value = result.data
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  !config.skip && fetch()

  return { response, error, data, loading, fetch }
}

const cacheMap = reactive(new Map())

export const useFetchCache = (key, url, config) => {
  const info = useFetch(url, { skip: true, ...config })

  const update = () => cacheMap.set(key, info.response.value)
  const clear = () => cacheMap.set(key, undefined)

  /** New fetch function to wrap arround the original fetch function */
  const fetch = async () => {
    try {
      await info.fetch()
      update()
    } catch {
      clear()
    }
  }
}