interface IResponseError {
  status?: number
  message?: string
}

interface IResponseSuccess {
  status?: number
  message?: string
  data?: any
}