<!--待办项组件-->
<template>
  <div
      class="todo-item-hover rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-2 animate-fade-in"
      :class="{ 'opacity-70': todo.completed }"
  >
    <!-- 编辑模式 -->
    <div v-if="editTodoId === todo.id" class="flex gap-2">
      <input
          :value="editTodoText"
          @input="updateEditTodoText"
          @keyup.enter="confirmEdit(todo.id)"
          type="text"
          class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="confirmEdit(todo.id)" class="btn-primary px-2">确认</button>
      <button @click="cancelEdit" class="btn-secondary px-2">取消</button>
    </div>

    <!-- 查看模式 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
      <!-- 状态切换 -->
      <div class="md:col-span-1">
        <input
            v-model="todo.completed"
            @change="toggleTodo(todo.id)"
            type="checkbox"
            class="w-5 h-5 accent-blue-500 cursor-pointer"
        />
      </div>
      <!-- 待办内容 -->
      <div class="md:col-span-4">
        <span :class="{ 'line-through text-gray-500 dark:text-gray-400': todo.completed }">
          {{ todo.text }}
        </span>
      </div>
      <!-- 分类 -->
      <div class="md:col-span-1">
        <span class="px-2 py-1 rounded text-xs" :class="categoryClass(todo.category)">
          {{ todo.category }}
        </span>
      </div>
      <!-- 优先级 -->
      <div class="md:col-span-1">
        <span class="px-2 py-1 rounded text-xs" :class="priorityClass(todo.priority)">
          {{ todo.priority }}
        </span>
      </div>
      <!-- 截止日期 -->
      <div class="md:col-span-2 text-sm">
        <span :class="{ 'text-red-500': isExpired(todo) }">
          {{ todo.deadline || '无' }}
        </span>
      </div>
      <!-- 创建时间 -->
      <div class="md:col-span-2 text-sm text-gray-500 dark:text-gray-400">
        {{ todo.createTime }}
      </div>
      <!-- 操作按钮 -->
      <div class="md:col-span-1 flex gap-1">
        <button @click="startEdit(todo)" class="text-blue-500 hover:text-blue-700">编辑</button>
        <button @click="singleDelete(todo.id)" class="text-red-500 hover:text-red-700">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  todo: Object,
  editTodoId: [Number, null],
  editTodoText: String,
})

const emits = defineEmits(['update:editTodoText', 'toggleTodo', 'startEdit', 'confirmEdit', 'cancelEdit', 'singleDelete'])

// 分类样式
const categoryClass = (cat) => {
  const map = {
    工作: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    生活: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    学习: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  }
  return map[cat] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
}

// 优先级样式
const priorityClass = (pri) => {
  const map = {
    高: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    中: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    低: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
  }
  return map[pri]
}

// 判断是否过期
const isExpired = (todo) => {
  return !todo.completed && todo.deadline && new Date(todo.deadline).getTime() < Date.now()
}

// 转发事件
const updateEditTodoText = (e) => emits('update:editTodoText', e.target.value)
const toggleTodo = (id) => emits('toggleTodo', id)
const startEdit = (todo) => emits('startEdit', todo)
const confirmEdit = (id) => emits('confirmEdit', id)
const cancelEdit = () => emits('cancelEdit')
const singleDelete = (id) => emits('singleDelete', id)
</script>
