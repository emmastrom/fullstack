import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      const anecdote = anecdotes.find(a => a.id === id)
      console.log(anecdote)
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted ${anecdote.content}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
    return (
        <div>
      <h2>Anecdotes</h2>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )

}

export default AnecdoteList