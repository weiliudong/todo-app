<!--待办列表组件-->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">待办列表（{{ filteredTodos.length }}）</h2>
    <!-- 空状态 -->
    <div v-if="filteredTodos.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
      <p>暂无符合条件的待办事项</p>
    </div>
    <!-- 待办列表 -->
    <div v-else class="max-h-[500px] overflow-y-auto pr-2">
      <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :edit-todo-id="editTodoId"
          :edit-todo-text="editTodoText"
          @update:editTodoText="handleUpdateEditTodoText"
          @toggleTodo="toggleTodo"
          @startEdit="startEdit"
          @confirmEdit="confirmEdit"
          @cancelEdit="cancelEdit"
          @singleDelete="singleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

const props = defineProps({
  filteredTodos: Array,
  editTodoId: [Number, null],
  editTodoText: String,
})

const emits = defineEmits(['update:editTodoText', 'toggleTodo', 'startEdit', 'confirmEdit', 'cancelEdit', 'singleDelete'])

// 转发事件
const handleUpdateEditTodoText = (value) => emits('update:editTodoText', value)
const toggleTodo = (id) => emits('toggleTodo', id)
const startEdit = (todo) => emits('startEdit', todo)
const confirmEdit = (id) => emits('confirmEdit', id)
const cancelEdit = () => emits('cancelEdit')
const singleDelete = (id) => emits('singleDelete', id)
</script>
