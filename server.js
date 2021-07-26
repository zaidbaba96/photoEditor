const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const authRoute = require('./src/routes/auth.routes')
const corsOptions = {
  origin: '*'
}
//const  = require('./src/model/user.model')

const app = express()
const port = process.env.PORT || 4000;
const mongoose = require('mongoose')



app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('public'))

// const activityRoute = require('./src/routes/activity.route')
// const userActivityRoute = require('./src/routes/UserActivity.route')

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
//app.use(bodyParser.raw({ type: '*/*' }));

app.use('/api/v1/auth', authRoute)
// app.use('/api/v1/activities', activityRoute)
// app.use('/api/v1/user-activities', userActivityRoute)

mongoose
  .connect(
    "mongodb+srv://zaid:zaid@cluster0.qk3gy.mongodb.net/PHOTO-EDITOR?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false,
      bufferCommands: true
    }
  )
  .then(() => {
    console.log("MongoDB connected .....");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, (req , res)=> console.log("connected with ", port))
