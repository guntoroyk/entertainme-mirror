import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
// import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://172.16.14.128:4000',
  }),
  cache: new InMemoryCache(),
})

// const client = new ApolloClient({
//   uri: `http://127.0.0.1:4000`
// })

export default client
