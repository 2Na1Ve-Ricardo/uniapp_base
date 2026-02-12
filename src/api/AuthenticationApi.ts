import type { LoginParams, RegisterParams } from '@/store/UserStore'
import request from '@/utils/request'

const AUTHENTICATION_PREFIX = '/api/auth'

export function getOpenId(jsCode: string) {
  return request.get(`${AUTHENTICATION_PREFIX}/${jsCode}`, undefined, {
    needAuthorize: false,
  })
}

export function register(register: RegisterParams) {
  return request.post(
    `${AUTHENTICATION_PREFIX}/register`,
    {
      ...register,
    },
    {
      needAuthorize: false,
    },
  )
}

export function login(loginParams: LoginParams) {
  return request.post(
    `${AUTHENTICATION_PREFIX}/login`,
    {
      ...loginParams,
    },
    {
      needAuthorize: false,
    },
  )
}

export function isTokenValid(token: string) {
  return request.post(`${AUTHENTICATION_PREFIX}/token/validate`, { token }, { needAuthorize: false })
}
