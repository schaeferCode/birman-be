import dotenv from 'dotenv'

import app from './app'

dotenv.config()

// start server
const port = process.env.PORT || 3000
app.listen(port)

// eslint-disable-next-line no-console
console.log(`Server listening at ${port}`)
