import{ TODOS } from '../types/TODOS'
export function saveTodos(todos:TODOS[]):null{ //todos类型的数组
    localStorage.setItem('todo_key',JSON.stringify(todos))
    return null
}

export function getTodos():TODOS[]{
    return JSON.parse(localStorage.getItem('todo_key') || '[]')
}