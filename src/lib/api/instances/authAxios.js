import baseAxios from './baseAxios'

const authAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/Auth`,
  timeout: 5000,
})

export default authAxios