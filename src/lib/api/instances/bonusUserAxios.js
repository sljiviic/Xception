import baseAxios from './baseAxios'

const bonusUserAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/BonusUser`,
})

export default bonusUserAxios