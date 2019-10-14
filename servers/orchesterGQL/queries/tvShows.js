import axios from 'axios'
import client from '../configs/redis'
const tvShowServer = 'http://localhost:3002'

export const tvShows = async () => {
  const dataChache = await client.getAsync('tvShows')
  
  if (dataChache) {
    console.log(dataChache, 'dataChache')
    return JSON.parse(dataChache)
  } else {
    try {
      const { data } = await axios({
        url: `${tvShowServer}/tvshows`,
        method: 'GET'
      })
      console.log(dataChache, 'dataChache')
      client.set('tvShows', JSON.stringify(data), 'EX', 60)
      console.log(data, 'hasil fetch tv shows')
      return data
    } catch (error) {
      console.log(error, 'fetch tvshow error')
      return error.data
    }
  }
}

export const tvShow = async (parent, args, context, info) => {
  const dataChache = await client.getAsync('tvShows')

  console.log(dataChache)
  if (dataChache) {
    console.log(dataChache, 'ada chachenya!')
    const filter = JSON.parse(dataChache).filter(el => el._id == args.id)
    return filter[0]
  } else {
    try {
      const { data } = await axios({
        url: `${tvShowServer}/tvshows/${args.id}`,
        method: 'GET'
      })
      console.log('gak ada di chache')
      return data
    } catch (error) {
      return error.data
    }
  }
}
