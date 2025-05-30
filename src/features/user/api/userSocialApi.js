import axios from 'axios'

const userSocialAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/usersocial',
  withCredentials: true,
})

export const userSocialApi = {
  // Get all user's socials
  getSocials: async () => {
    const response = await userSocialAxios.get('/')
    return response.data
  },

  // Save or update social usernames
  connectSocials: async (socialUsernames) => {
    const response = await userSocialAxios.put(`/`, socialUsernames)
    return response.data
  }
}