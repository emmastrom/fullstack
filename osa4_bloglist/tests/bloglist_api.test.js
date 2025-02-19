const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()})

test('bloglist is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET returns the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  
test('the first blog is by Michael Chan', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.author)
    assert(contents.includes('Michael Chan'))
  })

test('id field is called id, not _id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body[0].id
    assert(ids, !undefined);
})

test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
    const likes = response.body.map(r => r.likes)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.strictEqual(likes[2], 10)
    assert(title.includes('First class tests'))
  })

  test('if blog added without likes, likes will be 0 ', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: ''
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(r => r.likes)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  
    assert.strictEqual(likes[2], 0)
  })

  test('blog without title is invalid', async () => {
    const newBlog = {
      title: '',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('blog without url is invalid', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: '',
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('deleting a blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(r => r.title)
    assert(!title.includes(blogToDelete.title))
  })

after(async () => {
  await mongoose.connection.close()
})