import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import AdminRoute from './routes/AdminRoute'
import VendorRoute from './routes/VendorRoute'


const dbConn = async  () => { 
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('Db Connected') 
    }catch(error) {
        console.error('Db Connection Error: ', error)
        process.exit(1);
    }
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)

app.use('/', (req, res) => {
    res.send('Whaaaaats UPPPP')
})
app.listen(PORT, () => {
    dbConn()
    console.log("Listening on Port 3000")
})