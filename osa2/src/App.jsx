const Header = (props) => {
  //console.log(props)
  return <h1>{props.name}</h1>
}

const Total = (props) => {
  console.log(props)
  return <b>total of {props.exercise} exercises</b>
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Course = (props) => {
  //console.log(props)
  return (
    <div>
      <Header name={props.course} />
    </div>
  )
}

const Content = (props) => {
  //console.log(props)
  return (
    <div>
      <Part part={props.part.name} exercises={props.part.exercises} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  const exercises = course.parts.map(part => part.exercises)
  console.log(exercises)
  const sum = exercises.reduce((prevValue, currentValue) => prevValue + currentValue, 0)

  return (
    <div>
      <Course course={course.name} />
      {course.parts.map(part =>
        <Content key={part.id} part={part} />
        )}
        <Total exercise={sum} />
    </div>
  )
}

export default App