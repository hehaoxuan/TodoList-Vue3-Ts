<template>
    <div class="todo-header">
        <input type="text" placeholder="输入你的任务名称按enter确认" @keyup.enter="addTodo" v-model="todoitem">
    </div>
</template>
<script lang='ts'>
    import {
        defineComponent,
        ref,
    } from 'vue'
    export default defineComponent({
        name: 'TodoHeader',
        setup(props, {
            emit,
        }) {
            const todoitem = ref('')
            const addTodo = () => {
                if (!todoitem.value.trim()) {
                    alert('您还未输入任何内容')
                } else {
                    const add = { //传入一个object对象
                        id: Date.now() + Math.random(), //避免id重复
                        content: todoitem.value,
                        complete: false,
                    }
                    emit('add-item', add)
                    todoitem.value = ''//清空输入
                }

            }
            return {
                addTodo,
                todoitem,
                // addTodo
            }
        }
    })
</script>
<style>

</style>