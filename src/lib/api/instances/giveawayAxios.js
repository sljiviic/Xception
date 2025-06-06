import baseAxios from './baseAxios'

const giveawayAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/Giveaway`,
})

export default giveawayAxios