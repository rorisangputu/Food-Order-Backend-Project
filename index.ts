import express from 'express'
import env from 'dotenv'


const app = express()


app.listen(3000, () => {
    console.log("Listening on Port 3000")
})