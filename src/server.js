import server from './app.js'

const port = process.env.PORT || 3000

server.listen(3000, () => console.log(`listening at ${port}`))