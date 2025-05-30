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
    const response = await ticketsAxios.post('/conversions', { amount })
    return response.data
  },

  awardTickets: async (amount) => {
    const response = await ticketsAxios.post('/awards', { amount })
    return response.data
  },

  spendTickets: async (amount) => {
    const response = await ticketsAxios.post(`/regular-spends/`, { amount })
    return response.data
  },

  spendSpecialTickets: async (amount) => {
    const response = await ticketsAxios.post(`/special-spends/`, { amount })
    return response.data
  }
}