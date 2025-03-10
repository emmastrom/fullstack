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
      author
      title
      published
      genres
      id
    }
  }
`
export const ADD_BOOK = gql`
  mutation addNewBook(
    $author: String!
    $title: String!
    $published: String!
    $genres: [String!]
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author
      title
      published
      genres
      id
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation editAuthorBirth($name: String!, $born: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
      bookCount
    }
  }
`
