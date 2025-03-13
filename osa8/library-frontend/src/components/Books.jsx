import { useState } from "react"

/* eslint-disable react/prop-types */
const Books = props => {
  const books = props.books
  const [genre, setGenre] = useState("all genres")

  const genreBooks = books.filter(book =>
    genre === "all genres" ? book : book.genres.includes(genre)
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.map(b =>
        b.genres.map(g => (
          <button key={g} value={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))
      )}
      <button onClick={() => setGenre("all genres")}>all genres</button>
    </div>
  )
}

export default Books
