import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useApolloClient, useQuery } from "@apollo/client"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import { useState } from "react"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <button onClick={logout}>logout</button>
        <div>
          <Link to="/">
            <button>authors</button>
          </Link>
          <Link to="/books">
            <button>books</button>
          </Link>
          <Link to="newbook">
            <button>add book</button>
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={<Authors authors={result.data.allAuthors} />}
          />

          <Route
            path="/books"
            element={<Books books={booksResult.data.allBooks} />}
          />

          <Route path="/newbook" element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
