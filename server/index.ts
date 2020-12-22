import dotenv from 'dotenv'
dotenv.config()

import app from './app'

// start server
const port = process.env.PORT || 3000
app.listen(port)

// eslint-disable-next-line no-console
console.log(`Server listening at ${port}`)
