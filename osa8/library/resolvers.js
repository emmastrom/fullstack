const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args.author)
      console.log(args.genre)
      if (args.author && args.genre !== undefined) {
        return Book.find({
          genres: { $in: args.genre },
          author: args.author,
        }).populate("author")
      } else if (args.genre !== undefined) {
        return Book.find({ genres: { $in: args.genre } }).populate("author")
      } else if (args.author !== undefined) {
        const searchAuthor = await Author.findOne({ name: args.author })
        return Book.find({ author: searchAuthor }).populate("author")
      } else {
        return Book.find({}).populate("author")
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async root => {
      const existingAuthor = await Author.findOne({ name: root.name })
      const authorsBooks = await Book.find({ author: existingAuthor.id })
      console.log(authorsBooks)
      return authorsBooks.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const existingAuthor = await Author.findOne({ name: args.author })
      if (!existingAuthor) {
        const newAuthor = new Author({ name: args.author })
        console.log(newAuthor)
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("saving new author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          })
        }
      }
      const newBookAuthor = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: newBookAuthor })
      console.log(newBook)
      console.log(newBookAuthor)
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        })
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      await Author.updateOne(Author.findOne({ name: args.name }), {
        $set: { born: args.born },
      })
      const updatedAuthor = await Author.findOne({ name: args.name })
      console.log(updatedAuthor)
      try {
        await updatedAuthor.save()
      } catch (error) {
        throw new GraphQLError("Editing author birthyear failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch(error => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
