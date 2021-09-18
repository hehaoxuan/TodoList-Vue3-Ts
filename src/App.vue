<template>
  <div class="todo-list">
    <TodoHeader @add-item="addTtem" />
    <TodoList :todos="todos" :removeItem="removeItem" :toggleComplete="toggleComplete" />
    <TodoFooter :state="state" :changeAllTodo="changeAllTodo" :deleteAllComplete=" deleteAllComplete" />
  </div>
</template>
<script lang='ts'>
  import TodoHeader from './components/todoHeader.vue'
  import TodoList from './components/todoList.vue'
  import TodoFooter from './components/todoFooter.vue'
  import {
    saveTodos,
    getTodos
  } from './utils/localStorage'
  import {
    TODOS
  } from './types/TODOS'
  import {
    defineComponent,
    reactive,
    toRefs,
    watch,
    onMounted
  } from 'vue'

  export default defineComponent({
    name: 'App',
    emits: ['add-item', 'remove-item'],
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    setup() {

      //此处定义 (vue3中的响应式)数据 为数组对象
      // 尖括号里的<>是泛型 其内容与其一致
      const state = reactive <{todos: TODOS[]}> ({todos:[]}) //传入数组对象

      //此处是对数组的操作 可以直接传入一个数组对象
      const addTtem = (todo: TODOS) => {
        state.todos.unshift(todo)
      }

      //传入一个index 来进行删除
      const removeItem = (index: number) => {
        state.todos.splice(index, 1)
      }

      //#变化todo对象里的 complete
      const toggleComplete = (todo: TODOS, isComplete: boolean) => {
        todo.complete = isComplete
      }

      //#传入数值 改变所有的值
      const changeAllTodo = (isComplete: boolean) => {
        for (let i in state.todos) {
          state.todos[i].complete = isComplete
        }
      }

      //#遍历 数据 删除所有complete的数据
      const deleteAllComplete = () => {
        state.todos = state.todos.filter((todo) => !todo.complete)
      }

      // #存储数据

      // watch(() => state.todos, (value) => {
      //   saveTodos(value)
      // }, {
      //   deep: true
      // })
      
      // 这里写的意思是? value为什么可以省略
      // watch 的第一个参数是监听的值 第二个参数是执行的函数
      watch(()=> state.todos , saveTodos ,{deep:true})

      // #当加载完毕以后读取数据
      onMounted(() => {
        setTimeout(() => {
          state.todos = getTodos()
        }, 500)
      })
      
      return {
        state,
        ...toRefs(state),
        // 这里返回的是 ?
        // 推测 ...是将其中的内容遍历 toRefs是将reactive数据其中的内容变成ref的响应式数据
        removeItem,
        addTtem,
        toggleComplete,
        changeAllTodo,
        deleteAllComplete,

      }
    }
  })
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>