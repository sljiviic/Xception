import giveawayUserAxios from '@/lib/api/instances/giveawayUserAxios'

export const giveawayUserApi = {
  // Fetch all user's entries
  getEntries: async () => {
    const response = await giveawayUserAxios.get('/')
    return response.data
  },

  // Fetch active GIVEAWAYS a user has joined
  getActiveJoined: async () => {
    const response = await giveawayUserAxios.get('/joined/active')
    return response.data
  },

  // Fetch GIVEAWAYS a user has won
  getWon: async () => {
    const response = await giveawayUserAxios.get('/won')
    return response.data
  },

  // Join DAILY giveaway
  joinDaily: async () => {
    const response = await giveawayUserAxios.post('/join-daily')
    return response.data
  },

  // Join MONTHLY giveaway
  joinMonthly: async (tickets) => {
    const response = await giveawayUserAxios.post('/join-monthly', { tickets })
    return response.data
  },

  // Join SPECIAL giveaway
  joinSpecial: async (specialTickets) => {
    const response = await giveawayUserAxios.post('/join-special', { specialTickets })
    return response.data
  },

  // Add more tickets to a JOINED giveaway
  addTickets: async (giveawayId, tickets) => {
    const response = await giveawayUserAxios.post(`/${giveawayId}/add-tickets`, tickets)
    return response.data
  }
}