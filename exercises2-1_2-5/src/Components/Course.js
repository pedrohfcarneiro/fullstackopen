import React from 'react'

const Part = (props) => {
    return <p>{props.partProp} {props.exercisesProp} </p>
}

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Content = ({parts}) => {
    let totalAmount = parts.reduce((sum,part) => {
        return sum + part.exercises
    },0)
    return (
        <div>
            {parts.map(part => <Part key={part.id} partProp={part.name} exercisesProp={part.exercises} />)}
            <p>total of {totalAmount} exercises</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
        </div>
    )
}


export default Course