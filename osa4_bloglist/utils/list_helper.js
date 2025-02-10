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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }