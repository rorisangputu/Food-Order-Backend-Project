import express from 'express'
import 'dotenv/config'


const app = express()

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})