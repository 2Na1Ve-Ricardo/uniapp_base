import * as process from 'node:process'
import { baseConfig } from '@/config/global'

const BASE_URL = baseConfig.baseUrl
const DEFAULT_TIMEOUT = 10000

interface RequestOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
  params?: Record<string, any>
  header?: Record<string, any>
  timeout?: number
  showLoading?: boolean
  loadingText?: string
  needAuthorize?: boolean
}

interface ResponseData<T = any> {
  status: boolean
  code: number
  message: string
  data: T
}

function requestInterceptor(options: RequestOptions): RequestOptions {
  const url = BASE_URL + options.url
  const token = uni.getStorageSync('token')
  const header = { ...options.header }

  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  let requestUrl = url
  if (options.method === 'GET' && options.params) {
    const query = new URLSearchParams(options.params).toString()
    requestUrl = `${url}${query ? (url.includes('?') ? '&' : '?') + query : ''}`
  }

  // if (options.showLoading !== false) {
  //     uni.showLoading({
  //         title: options.loadingText || '加载中...'
  //     })
  // }

  return {
    ...options,
    url: requestUrl,
    header,
  }
}

function responseInterceptor<T>(res: UniApp.RequestSuccessCallbackResult): ResponseData<T> {
  uni.hideLoading()

  const { statusCode, data } = res

  if (statusCode < 200 || statusCode >= 300) {
    uni.showToast({
      title: `请求失败 ${statusCode} 请稍后再试`,
      icon: 'none',
    })

    throw new Error(`HTTP Error: ${statusCode}`)
  }

  const response = data as ResponseData<T>
  if (response.code !== 200 && response.code !== 0) {
    uni.showToast({
      title: response.message || '请求失败，请稍后再试',
      icon: 'none',
    })

    if (response.code === 401) {
      uni.removeStorageSync('token')
      uni.redirectTo({
        url: '/pages/login/index',
      })
    }

    throw new Error(response.message || '业务异常')
  }

  return response
}

function coreRequest<T>(options: RequestOptions): Promise<ResponseData<T>> {
  const config = requestInterceptor(options)
  const token = uni.getStorageSync('token')
  const needAuthorize = config.needAuthorize !== false

  if (needAuthorize && !token) {
    uni.hideLoading()
    uni.showToast({
      title: '用户未登录',
      icon: 'none',
      duration: 2000,
    })
    uni.redirectTo({
      url: '/pages/login/index',
    })
    return Promise.reject(new Error('Unauthorized User'))
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: config.url,
      method: config.method || 'GET',
      data: config.method === 'GET' ? undefined : config.data,
      header: config.header,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      success(res) {
        try {
          const result: ResponseData<T> = responseInterceptor<T>(res)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail(err) {
        uni.hideLoading()
        uni.showToast({
          title: '网络链接失败',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

export const request = {
  get<T = any>(
    url: string,
    params?: Record<string, any>,
    config: Omit<RequestOptions, 'url' | 'method' | 'params'> = {},
  ) {
    return coreRequest<T>({
      ...config,
      url,
      method: 'GET',
      params,
    })
  },

  post<T = any>(url: string, data?: Record<string, any>, config: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) {
    return coreRequest<T>({
      ...config,
      url,
      method: 'POST',
      data,
    })
  },

  put<T = any>(url: string, data?: Record<string, any>, config: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) {
    return coreRequest<T>({
      ...config,
      url,
      method: 'PUT',
      data,
    })
  },

  delete<T = any>(
    url: string,
    data?: Record<string, any>,
    config: Omit<RequestOptions, 'url' | 'method' | 'data'> = {},
  ) {
    return coreRequest<T>({
      ...config,
      url,
      method: 'DELETE',
      data,
    })
  },
}

export default request
