import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { gql, useQuery } from "@apollo/client"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
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

const App = () => {
  const [page, setPage] = useState("authors")
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div>
        <div>
          <Link to="/">
            <button onClick={() => setPage("authors")}>authors</button>
          </Link>
          <Link to="/books">
            <button onClick={() => setPage("books")}>books</button>
          </Link>
          <Link to="newbook">
            <button onClick={() => setPage("add")}>add book</button>
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Authors
                show={page === "authors"}
                authors={result.data.allAuthors}
              />
            }
          />

          <Route
            path="/books"
            element={
              <Books
                show={page === "books"}
                books={booksResult.data.allBooks}
              />
            }
          />

          <Route path="/newbook" element={<NewBook show={page === "add"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
