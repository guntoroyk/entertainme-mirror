import axios from 'axios'
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

  console.log(args, 'dari tv show mutation')
  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows`,
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
    
    console.log(JSON.stringify(response, null, 2), 'error dari tvshow mutation')
    return error.data
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

    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  }
}

export const deleteTvShow = async (parent, args, context, info) => {
  const { id } = args
  try {
    const { data } = await axios({
      url: `${tvShowServer}/tvshows/${id}`,
      method: 'DELETE'
    })

    return data

  } catch (error) {
    console.log(error.data)
    return error.data
  } 
}
