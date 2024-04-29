const Header = (props) => {
  //console.log(props)
  return <h1>{props.name}</h1>
}

const Total = (props) => {
  //console.log(props)
  return <b>total of {props.exercise} exercises</b>
}

const Part = (props) => {
  //console.log(props)
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Course = (props) => {
  console.log(props.parts.map(part => part.exercises))
  let exercises = props.parts.map(part => part.exercises)
  let sum = exercises.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
  return (
    <div>
      <Header name={props.course} />
      {props.parts.map(part =>
      <Content key={part.id} part={part} />
      )}
      <br />
      <Total exercise={sum} />
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
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header name={"Web development curriculum"} />
        {courses.map(course =>
        <Course key={course.id} course={course.name} parts={course.parts} />
        )}
    </div>
  )
}

export default App