const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
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

    describe('addition of a new blog'), () => {
        test('succeeds with valid data', async () => {
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
        
        test('without likes will succeed with 0 likes', async () => {
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
        
        test('fails without title', async () => {
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
        
        test('fails without url', async () => {
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
    }

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
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
    })

    describe('editing a blog', () => {
        test('succeeds if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]
            const editedBlog = {
                title: `${blogToEdit.title}`,
                author: `${blogToEdit.author}`,
                url: `${blogToEdit.url}`,
                likes: 20
            }
            
            await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(editedBlog)
            .expect(200)
        
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
        
            const likes = blogsAtEnd.map(r => r.likes)
            assert.strictEqual(likes[0], 20)
        })
    })

})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})

after(async () => {
  await mongoose.connection.close()
})