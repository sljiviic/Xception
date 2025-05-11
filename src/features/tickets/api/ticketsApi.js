import axios from 'axios'

const ticketsAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/tickets',
  withCredentials: true,
})

export const ticketsApi = {
  getBalances: async () => {
    const response = await ticketsAxios.get('/balances')
    return response.data
  },

  convertToSpecial: async (amount) => {
    const response = await ticketsAxios.post(`/convert`, { amount })
    return response.data
  },

  awardTickets: async (amount) => {
    const response = await ticketsAxios.post(`/award`, { amount })
    return response.data
  }
}