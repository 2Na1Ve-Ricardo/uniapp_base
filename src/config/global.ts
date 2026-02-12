interface BaseConfig {
  appName: string
  appVersion: string
  baseUrl: string
  [key: string]: any
}

export const baseConfig: BaseConfig = {
  appName: '易测控',
  appVersion: '0.0.7',
  baseUrl: 'http://127.0.0.1:8080',
  copyRight: 'Copyright © 2025 上海交通大学 & 无锡中船奥蓝托 All rights reserved.',
}

export const imageRequestPath = baseConfig.baseUrl + '/api/static/images/'

export const iconRequestPath = baseConfig.baseUrl + '/api/static/icons/'

export default {
  baseConfig,
  imageRequestPath,
  iconRequestPath,
}

// server config
// baseUrl: 'http://115.159.193.191:8080'
