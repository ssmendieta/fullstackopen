const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Part = (props) => {
  const {part,exercises} = props
  return (
    <p>
        {part} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => {
        return(
          <Part part={part.name} exercises={part.exercises} key={part.id} />
        )
      })}
    </div>
  )
}

const Total = ({parts}) =>{
  // funcion de suma de total
  const total = parts.reduce((sum,part) => sum + part.exercises ,0)
  // console.log(total)
  return(
    <p> <strong> Number of exercises {total}</strong> </p>

  )
}

const Course = ({course}) =>{
  return(
    <div>
    <Header course={course.name} />
    <Content parts={course.parts}/> 
    <Total parts={course.parts} />
    </div>
  )
}
export default Course