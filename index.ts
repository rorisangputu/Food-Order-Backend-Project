import express from 'express'
import 'dotenv/config'
import AdminRoute from './routes/AdminRoute'
import VendorRoute from './routes/VendorRoute'

const app = express()

const PORT = process.env.PORT || 3000

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)

app.use('/', (req, res) => {
    res.send('Whaaaaats UPPPP')
})
app.listen(3000, () => {
    console.log("Listening on Port 3000")
})