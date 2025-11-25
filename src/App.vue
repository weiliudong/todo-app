<!--根组件-->
<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-8">📋 全能待办清单</h1>

    <!-- 暗黑模式切换 -->
    <ThemeToggle/>

    <!-- 添加待办 -->
    <TodoAdd
        :newTodo="newTodo"
        :categories="categories"
        @addTodo="addTodo"
        @addCategory="addCategory"
    />

    <!-- 筛选搜索 -->
    <TodoFilter
        :filterConditions="filterConditions"
        :categories="categories"
        @batchComplete="batchComplete"
        @batchDelete="batchDelete"
        @resetFilter="resetFilter"
    />

    <!-- 待办列表 -->
    <TodoList
        :filteredTodos="filteredTodos"
        :editTodoId="editTodoId"
        v-model:editTodoText="editTodoText"
        @toggleTodo="toggleTodo"
        @startEdit="startEdit"
        @confirmEdit="confirmEdit"
        @cancelEdit="cancelEdit"
        @singleDelete="singleDelete"
    />

    <!-- 数据统计 -->
    <TodoStats :stats="stats"/>
  </div>

  <!-- 单个删除弹窗 -->
  <ConfirmDialog
      v-model:visible="singleDeleteDialog.visible"
      message="确定删除该待办？此操作不可恢复！"
      @confirm="confirmSingleDeleteAction"
  />
  <!-- 批量删除弹窗 -->
  <ConfirmDialog
      v-model:visible="batchDeleteDialogVisible"
      title="确认批量删除"
      message="确定删除选中的待办？此操作不可恢复！"
      @confirm="confirmBatchDeleteAction"
  />
</template>

<script setup>
import {onMounted} from 'vue'
import {useTodo} from './composables/useTodo'
import TodoAdd from './components/TodoAdd.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoList from './components/TodoList.vue'
import TodoStats from './components/TodoStats.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

// 引入核心逻辑
const {
  todos,
  newTodo,
  filterConditions,
  editTodoId,
  editTodoText,
  filteredTodos,
  stats,
  categories,
  singleDeleteDialog,
  batchDeleteDialogVisible,
  initTodos,
  addTodo,
  startEdit,
  confirmEdit,
  cancelEdit,
  singleDelete,
  batchComplete,
  batchDelete,
  toggleTodo,
  addCategory,
  confirmSingleDeleteAction,
  confirmBatchDeleteAction
} = useTodo()

// 初始化
onMounted(() => {
  initTodos()
})

// 重置筛选条件
const resetFilter = () => {
  filterConditions.value = {
    search: '',
    status: 'all',
    category: 'all',
    priority: 'all',
    dateRange: {start: '', end: ''},
  }
}
</script>
