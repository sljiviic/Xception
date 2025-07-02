import baseAxios from './baseAxios'

const LevelAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/Level`,
})

export default LevelAxios