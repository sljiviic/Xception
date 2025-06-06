import bonusAxios from '@/lib/api/instances/bonusAxios'

export const bonusApi = {
  getAll: async (
    start,
    end,
    page,
    pageSize,
    orderBy,
    order
  ) => {
    const response = await bonusAxios.get('', {
      params: {
        start,
        end,
        page,
        pageSize,
        orderBy,
        order
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await bonusAxios.get(`/${id}`)
    return response.data
  },

  create: async (bonusData) => {
    const response = await bonusAxios.post('', bonusData)
    return response.data
  },

  // update: async (id, bonusData) => {
  //   const response = await bonusAxios.put(`/${id}`, bonusData)
  //   return response.data
  // },

  delete: async (id) => {
    await bonusAxios.delete(`/${id}`)
  }
}