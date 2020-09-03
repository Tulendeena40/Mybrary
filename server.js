if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))




app.set('view engine', 'ejs')
//Set where views are going to be coming from (path)
app.set('views', __dirname + '/views')

//Set where layouts are going to be coming from (path)
app.set('layout', 'layouts/layout')
// Tell express we want to use express layouts
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// Tell express where our public files will be (files, sheets, images)
app.use(express.static('public'))


//import router
app.use('/', indexRouter)
app.use('/authors', authorRouter)

// pull from an environment variable for when we deploy, development we choose port 3000
app.listen(process.env.PORT || 3000, () =>{
    console.log('Server started on port 3000');
})




