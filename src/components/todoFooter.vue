<template>
  <div class="todo-footer">
    <input type="checkbox" v-model="isSelectAll">
    <span>已完成{{getAllselect}} / 全部{{returnAll}}</span>
    <button @click="deleteAll">清除已完成任务</button>
  </div>
</template>
<script lang='ts'>
  import {
    defineComponent,
    computed
  } from 'vue'
  import {TODOS} from '../types/TODOS'
  export default defineComponent({
    name: 'TodoFooter',
    props:{
      state:{
        type:Object,
        required:true
      },
      changeAllTodo:{
        type:Function,
        required:true
      },
      deleteAllComplete:{
        type:Function,
        required:true
      }
    },

    setup(props) {
      const getAllselect = computed(() => {
        return props.state.todos.filter((todo: TODOS) => todo.complete).length
      })
      const returnAll = computed(() => {
        return props.state.todos.length
      })
      const isSelectAll = computed({
        get() {
         return returnAll.value!=0 && getAllselect.value === returnAll.value
        }, //
        set(isComplete) { //当其值改变时 需要改变其todolist所有的值
          props.changeAllTodo(isComplete)
        }
      })
      
      const deleteAll = () => { //删除props.state.todos里complete为true的
          props.deleteAllComplete()
      }
      return {
        getAllselect,
        returnAll,
        isSelectAll,
        deleteAll
      }
    }
  })
</script>
<style>

</style>