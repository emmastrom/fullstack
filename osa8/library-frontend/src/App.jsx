import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useApolloClient, useQuery } from "@apollo/client"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries"
import { useState } from "react"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  if (result.loading || booksResult.loading || userResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log(userResult.data.me)

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} />
      </>
    )
  }

  return (
    <Router>
      <div>
        <div>
          <Link to="/">
            <button>authors</button>
          </Link>
          <Link to="/books">
            <button>books</button>
          </Link>
          <Link to="/newbook">
            <button>add book</button>
          </Link>
          <Link to="/recommendations">
            <button>recommend</button>
          </Link>
          <button onClick={logout}>logout</button>
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
          <Route
            path="/recommendations"
            element={
              <Recommendations
                user={userResult.data.me}
                books={booksResult.data.allBooks}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
