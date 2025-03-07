const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
      }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //if (!decodedToken.id) {
  //  return response.status(401).json({ error: 'token invalid' })
  //}
  const token = jwt.verify(request.token, process.env.SECRET)
  if (!token) {
    response.status(401).json({ error: 'no token'})
  }

  const user = request.user
  const userInfo = await User.findById(user)

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })

  try {
    const savedBlog = await blog.save()
    userInfo.blogs = userInfo.blogs.concat(savedBlog._id)
    await userInfo.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const token = jwt.verify(request.token, process.env.SECRET)
  if (!token) {
    response.status(401).json({ error: 'no token'})
  }
  const blog = await Blog.findById(request.params.id)
  //console.log(blog)
  if (blog.user.toString() === user) {
    await Blog.findByIdAndDelete(blog.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'no authorization'})
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body
  console.log(comment)
  const token = jwt.verify(request.token, process.env.SECRET)
  if (!token) {
    response.status(401).json({ error: 'no token'})
  }
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  blog.comments.push(comment)
  const saved = await blog.save()
  response.status(200).json(saved)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comments = blog.comments
  response.json(comments)
})

module.exports = blogsRouter
