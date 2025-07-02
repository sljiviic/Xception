import baseAxios from './baseAxios'

const operationAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/Operation`,
})

export default operationAxios