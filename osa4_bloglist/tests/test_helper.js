const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userInDb = async () => {
  const users = await usersInDb()
  return users[0]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getToken = async() => {
  const oneuser = await userInDb()
  const userForToken = {
    username: oneuser.username,
    id: oneuser.id,
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  return token
}

const initialBlogs = userId => [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: userId
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: userId
  }
]

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, userInDb, getToken
}