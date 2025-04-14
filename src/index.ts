import express from 'express'
import 'dotenv/config'
import App from './services/ExpressApp'
import dbConn from './services/Database'

const StartServer = async() => {
    const app = express()
    const PORT = process.env.PORT || 3000

    await App(app)
    await dbConn()

    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })
}

StartServer()