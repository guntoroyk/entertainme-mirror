import axios from 'axios'
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

  console.log(args, 'dari movies mutation')
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

    console.log('berhasill')
    console.log(data)

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

    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  }
}

export const deleteMovie = async (parent, args, context, info) => {
  const { id } = args
  try {
    const { data } = await axios({
      url: `${movieServer}/movies/${id}`,
      method: 'DELETE'
    })

    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  } 
}
