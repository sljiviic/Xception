import bonusUserAxios from '@/lib/api/instances/bonusUserAxios'

export const bonusUserApi = {
  getAll: async (
    start,
    end,
    page,
    pageSize,
    orderBy,
    order
  ) => {
    const response = await bonusUserAxios.get('', {
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
    const response = await bonusUserAxios.get(`/${id}`)
    return response.data
  },

  create: async (bonusId) => {
    const response = await bonusUserAxios.post('/', { bonusId })
    return response.data
  },

  // update: async (id, bonusUserData) => {
  //   const response = await bonusUserAxios.put(`/${id}`, bonusUserData)
  //   return response.data
  // },

  delete: async (id) => {
    await bonusUserAxios.delete(`/${id}`)
  }
}