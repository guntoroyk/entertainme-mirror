import axios from 'axios'
import client from '../configs/redis'
const movieServer = 'http://localhost:3001' 

export const addMovie = async (parent, args, context, info) => {
  const {  
    title,
    overview, 
    poster_path,
    backdrop_path, 
    release_date, 
    rating 
  } = args

  const dataChache = await client.getAsync('movies')
  // console.log(args, 'dari movies mutation')
  console.log('dataChace', dataChache)
  try {
    const { data } = await axios({
      url: `${movieServer}/movies`,
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

    if (dataChache) {
      console.log('ada chache!!!')
      const temp = JSON.parse(dataChache)
      temp.push(data)
      client.set('movies', JSON.stringify(temp), 'EX', 60)
    }
    return data

  } catch ({response}) {
    
    console.log(JSON.stringify(response, null, 2), 'error dari movies mutation')
    return error.data
  }
}

export const editMovie = async (parent, args, context, info) => {
  const {  
    id,
    title,
    overview,
    release_date, 
    rating 
  } = args

  const dataChache = await client.getAsync('movies')
  try {
    const { data } = await axios({
      url: `${movieServer}/movies/${id}`,
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
      console.log(ID, 'ID movie updated')
      temp[ID] = data
      client.set('movies', JSON.stringify(temp), 'EX', 60)
    }

    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  }
}

export const deleteMovie = async (parent, args, context, info) => {
  const { id } = args
  const dataChache = await client.getAsync('movies')
  try {
    const { data } = await axios({
      url: `${movieServer}/movies/${id}`,
      method: 'DELETE'
    })

    if (dataChache) {
      const temp = JSON.parse(dataChache).filter(el => el._id !== id)
      client.set('movies', JSON.stringify(temp), 'EX', 60)
      
    }
    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  } 
}
