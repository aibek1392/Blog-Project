const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const app = express()
let blogs = require('./Blogs.js')

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next()
})

app.listen(3001, () => {
  console.log("Started on PORT 3001")
})

router.get('/blogs', (req, res) => {
  res.json(blogs)
})

router.post('/blogs', (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).json({msg: 'Field(s) cannot be empty'})
  }else{
      const newBlog = {
        id: uuid.v4(),
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
      }
      blogs.push(newBlog)
      res.json(blogs)
  }
})



app.use("/", router)