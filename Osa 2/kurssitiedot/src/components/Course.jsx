const Course = ({ course }) => {
    var totalExercises = course.parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
    return (
      <div>
        <h1>{course.name}</h1>
          {course.parts.map(part => 
            <div key={part.id}>
            {part.name} {part.exercises}
          </div>
          )}
        <div>
          <strong>Total of {totalExercises} exercises</strong>
        </div>
      </div>
    )  
  }

export default Course