import axios from 'axios'
const tvShowServer = 'http://localhost:3002'

export const tvShows = async () => {
  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows`,
      method: 'GET'
    })
    return data
  } catch (error) {
    return error.data
  }
}

export const tvShow = async (parent, args, context, info) => {
  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows/${args.id}`,
      method: 'GET'
    })
    return data
  } catch (error) {
    return error.data
  }
}
