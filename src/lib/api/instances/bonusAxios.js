import baseAxios from './baseAxios'

const bonusAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/Bonus`,
})

export default bonusAxios