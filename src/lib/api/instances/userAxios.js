import baseAxios from './baseAxios'

const userAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/User`,
})

export default userAxios