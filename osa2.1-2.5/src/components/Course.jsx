const Header = ({name}) => {
    //console.log(props)
    return <h1>{name}</h1>
  }
  
  const Total = ({ exercise }) => {
    //console.log(props)
    return <b>total of {exercise} exercises</b>
  }
  
  const Part = ({ part, exercises}) => {
    //console.log(props)
    return (
      <div>
        {part} {exercises}
      </div>
    )
  }
  
  const Content = ({ name, exercises}) => {
    console.log(name)
    return (
      <div>
        <Part part={name} exercises={exercises} />
      </div>
    )
  }

  const Course = ({ course, parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    return (
      <div>
        <Header name={course} />
        {parts.map(part =>
        <Content key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <br />
        <Total exercise={sum} />
      </div>
    )
  }

export default Course