<template>
  <div class="todo-main">
    <ul>
      <todoitem v-for="(todo,index) in todos" :index="index" :key="todo.item" :todo="todo" :removeItem="removeItem" :toggleComplete="toggleComplete"/>
    </ul>
  </div>
</template>
<script lang='ts'>
  import todoitem from './todoTtem.vue'
  import {
    defineComponent,
  } from 'vue'
  export default defineComponent({
    name: 'TodoList',
    props:{
      todos:{
        type:Array,
        required:true
      },
      removeItem:{
        type:Function,
         required:true
      },
      toggleComplete:{
        type:Function,
        required:true
      }
    },
    emits: ['remove-item'],
    components: {
      todoitem
    },
    setup() {
      return {
        
      }
    }
  })
</script>
<style>

</style>