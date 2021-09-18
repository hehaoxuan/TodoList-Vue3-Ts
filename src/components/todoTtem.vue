<template>
    <li @mouseenter="isIntodos(true)" @mouseleave="isIntodos(false)">
        <input type="checkbox" v-model="isComplete">
        <span :class="{'complete':isComplete}">{{todo.content}}</span>
        <button class="delete" v-show="isShow" @click="deleteTodo">删除</button>
    </li>
</template>
<script lang='ts'>
    import {
        defineComponent,
        ref,
        computed
    } from 'vue'
    export default defineComponent({
        name: 'TodoTtem',
        // props: ['todo', 'index', 'removeItem', 'toggleComplete'],
        props:{
            todo:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
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
        setup(props) {
            //  console.log(emit);
            // todo :接收删除函数
            const deleteTodo = () => { //这里无需传入 因为props.index是全局的 直接调
                props.removeItem(props.index)
            }

            //是否显示 delete按钮
            const isShow = ref(false)
            const isIntodos = (isIN: boolean) => {
                if (isIN === true) {
                    isShow.value = true
                } else {
                    isShow.value = false
                }
            }

            // 通过计算函数来改变数值  computed是个函数 需要提供get与set函数
            const isComplete = computed({
                get() {
                    //调用时 返回todo.complte
                    return props.todo.complete
                },
                set(complete) { //调用父级的函数 应该是绑定了 type="checkbox" 所以其值会有true和false两个 若绑定text 则会返回值 应该？
                    props.toggleComplete(props.todo, complete)
                },
            })

            return {
                isShow,
                isIntodos,
                deleteTodo,
                isComplete,
            }
        }

    })
</script>
<style>

</style>