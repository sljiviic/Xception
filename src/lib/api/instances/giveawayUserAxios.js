import baseAxios from './baseAxios'

const giveawayUserAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/GiveawayUser`,
})

export default giveawayUserAxios