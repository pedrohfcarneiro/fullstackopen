import React from 'react'
import Course from './Components/Course'


const CoursesToDisplay = ({courses}) => {
    return (
        <div>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

const Total = ({parts}) => {
    return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises} </p>
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

  return <CoursesToDisplay courses={courses} />
}

export default App