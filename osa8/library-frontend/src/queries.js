import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
        born
        bookCount
        id
      }
      title
      published
      genres
      id
    }
  }
`

export const GENRE_BOOKS = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      author {
        name
        born
        bookCount
        id
      }
      title
      published
      genres
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addNewBook(
    $author: String!
    $title: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author {
        name
        born
        bookCount
        id
      }
      title
      published
      genres
      id
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation editAuthorBirth($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
      bookCount
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      Book {
        title
        author
        published
        genres
        id
      }
    }
  }
`
