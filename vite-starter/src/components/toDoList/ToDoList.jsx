import React from 'react'

function ToDoList({ todos }) {
  return (
    <div>
      {todos.map((t, i) => (<div key={i}>{t.title}</div>))}
    </div>
  )
}

export default ToDoList
