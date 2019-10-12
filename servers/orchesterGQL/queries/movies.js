import axios from 'axios'
const movieServer = 'http://localhost:3001'

export const movies = async () => {
  try {
    const { data } = await axios({
      url: `${movieServer}/movies`,
      method: 'GET'
    })
    return data
  } catch (error) {
    return error.data
  }
}

export const movie = async (parent, args, context, info) => {
  try {
    const { data } = await axios({
      url: `${movieServer}/movies/${args.id}`,
      method: 'GET'
    })
    return data
  } catch (error) {
    return error.data
  }
}
