import Redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(Redis.RedisClient.prototype)
bluebird.promisifyAll(Redis.Multi.prototype)

const client = Redis.createClient()

client.on('connect', () => {
  console.log('Redis connected!!!!')
})

export default client
