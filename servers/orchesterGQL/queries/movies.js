import axios from 'axios'
import client from '../configs/redis'
const movieServer = 'http://localhost:3001'

export const movies = async () => {
  const dataChache = await client.getAsync('movies')
  console.log(dataChache, 'dataChache')
  
  if (dataChache) {
    return JSON.parse(dataChache)
  } else {
    try {
      const { data } = await axios({
        url: `${movieServer}/movies`,
        method: 'GET'
      })
      console.log('belum ada di chache')
      client.set('movies', JSON.stringify(data), 'EX', 60)
      return data
    } catch (error) {
      return error.data
    }
  }
}

export const movie = async (parent, args, context, info) => {
  const dataChache = await client.getAsync('movies')
  console.log(dataChache)
 
  if (dataChache) {
    console.log('dapat dari chache')
    const filter = JSON.parse(dataChache).filter(el => el._id == args.id);
    return filter[0];
  } else {
    try {
      const { data } = await axios({
        url: `${movieServer}/movies/${args.id}`,
        method: 'GET'
      })
      console.log('belum ada di chace')
      return data
    } catch (error) {
      return error.data
    }
  }
}
