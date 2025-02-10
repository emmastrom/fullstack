const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        const favBlog = favorite.likes > blog.likes ? favorite : blog
        return {
            title: favBlog.title,
            author: favBlog.author,
            likes: favBlog.likes
        }
    }

    return blogs.reduce(reducer, blogs)
}

const mostBlogs = (blogs) => {
    const blogsGroupedByAuthors = _.groupBy(blogs, 'author')
    const blogsPerAuthor = _.map(blogsGroupedByAuthors, (blog, author) => ({ author, blogs: blog.length }))
    return _.maxBy(blogsPerAuthor, 'blogs')
}

const mostLikes = (blogs) => {
    const blogsGroupedByAuthors = _.groupBy(blogs, 'author')
    const likesPerAuthor = _.map(blogsGroupedByAuthors, (blogs, author) => ({author, likes: totalLikes(blogs)}))
    return _.maxBy(likesPerAuthor, 'likes')
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }