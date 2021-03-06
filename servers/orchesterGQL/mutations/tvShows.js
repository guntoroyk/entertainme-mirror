import axios from 'axios'
import client from '../configs/redis'
import pubSub from '../subscriptions'
const tvShowServer = 'http://localhost:3002' 

export const addTvShow = async (parent, args, context, info) => {
  const {  
    title,
    overview, 
    poster_path,
    backdrop_path, 
    release_date, 
    rating 
  } = args

  const dataCache = await client.getAsync('tvShows')
  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvShows`,
      method: 'POST',
      data: {
        title,
        overview, 
        poster_path,
        backdrop_path, 
        release_date, 
        rating 
      }
    })

    if (dataCache) {
      console.log('ada chache!!!')
      const temp = JSON.parse(dataCache)
      temp.push(data)
      client.set('tvShows', JSON.stringify(temp), 'EX', 60)
    }
    return data

  } catch (error) {
    
    console.log(JSON.stringify(error.request, null, 2), 'error dari tvshow mutation')
    return error.request
  }
}

export const editTvShow = async (parent, args, context, info) => {
  const {  
    id,
    title,
    overview,
    release_date, 
    rating 
  } = args

  const dataChache = await client.getAsync('tvShows')

  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows/${id}`,
      method: 'PUT',
      data: {
        title,
        overview, 
        release_date, 
        rating 
      }
    })

    if (dataChache) {
      const temp = JSON.parse(dataChache)
      const ID = temp.findIndex(el => {
        return el._id === id
      })
      temp[ID] = data
      client.set('tvShows', JSON.stringify(temp), 'EX', 60)
    }
    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  }
}

export const deleteTvShow = async (parent, args, context, info) => {
  const { id } = args
  const dataChache = await client.getAsync('tvShows')

  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows/${id}`,
      method: 'DELETE'
    })

    if (dataChache) {
      const temp = JSON.parse(dataChache).filter(el => el._id !== id)
      client.set('tvShows', JSON.stringify(temp), 'EX', 60)
    }
    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  } 
}
