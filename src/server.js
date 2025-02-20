import jsonServer from 'json-server'
import cors from 'cors'

const server = jsonServer.create()
const router = jsonServer.router('db.json')  // Your db.json
const middlewares = jsonServer.defaults()

server.use(cors())  // Enable CORS for cross-origin requests
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
   console.log('JSON Server is running')
})
