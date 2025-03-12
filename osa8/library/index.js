const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { v1: uuid } = require("uuid")
const { GraphQLError } = require("graphql")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Book = require("./models/book")
const Author = require("./models/author")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
  }

  type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]
  allAuthors: [Author!]
  }

  type Mutation {
  addBook(
  title: String!
  published: Int!
  author: String!
  genres: [String!]
  ): Book

  editAuthor(
  name: String!
  born: Int!
  ): Author

  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre !== undefined) {
        return Book.find({
          genres: { $exists: args.genre },
          author: args.author,
        })
      } else if (args.genre) {
        return Book.find({ genres: { $exists: args.genre } })
      } else if (args.author) {
        return Book.find({ author: args.author })
      } else {
        return Book.find({})
      }
    },
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Author: {
    bookCount: async root => {
      await Book.find({ author: root.name }).countDocuments({})
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(args)
      const newBook = new Book({ ...args })
      console.log(newBook)
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
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.born }
      try {
        await updatedAuthor.save()
      } catch (error) {
        throw new GraphQLError("saving author birthyear failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
