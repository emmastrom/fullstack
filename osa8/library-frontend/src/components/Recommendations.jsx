/* eslint-disable react/prop-types */
const Recommendations = ({ user, books }) => {
  const genreBooks = books.filter(book =>
    book.genres.includes(user.favoriteGenre) ? book : null
  )

  return (
    <div>
      <h2>recommendations</h2>
      <a>books in your favorite genre </a> <strong>{user.favoriteGenre}</strong>
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
    </div>
  )
}

export default Recommendations
