/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("TestUser")
  const [password, setPassword] = useState("secret")

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("books-user-token", token)
    }
  }, [result.data])

  const submit = async event => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
