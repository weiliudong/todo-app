<!--筛选搜索组件-->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">筛选/搜索</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 搜索框 -->
      <div>
        <label class="block text-sm font-medium mb-1">搜索</label>
        <input
            v-model="filterConditions.search"
            type="text"
            placeholder="搜索待办内容..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <!-- 状态筛选 -->
      <div>
        <label class="block text-sm font-medium mb-1">状态</label>
        <select
            v-model="filterConditions.status"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="uncompleted">未完成</option>
        </select>
      </div>
      <!-- 分类筛选 -->
      <div>
        <label class="block text-sm font-medium mb-1">分类</label>
        <select
            v-model="filterConditions.category"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全部</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
      <!-- 优先级筛选 -->
      <div>
        <label class="block text-sm font-medium mb-1">优先级</label>
        <select
            v-model="filterConditions.priority"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全部</option>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </div>
      <!-- 日期范围筛选 -->
      <div>
        <label class="block text-sm font-medium mb-1">开始日期</label>
        <input
            v-model="filterConditions.dateRange.start"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">结束日期</label>
        <input
            v-model="filterConditions.dateRange.end"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <!-- 批量操作 -->
    <div class="mt-4 flex gap-2">
      <button @click="batchComplete" class="btn-secondary">批量标记完成</button>
      <button @click="batchDelete" class="btn-danger">批量删除</button>
      <button
          @click="resetFilter"
          class="btn-secondary ml-auto"
      >
        重置筛选
      </button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  filterConditions: Object,
  categories: Array,
})

const emits = defineEmits(['batchComplete', 'batchDelete', 'resetFilter'])

const batchComplete = () => {
  emits('batchComplete')
}

const batchDelete = () => {
  emits('batchDelete')
}

const resetFilter = () => {
  emits('resetFilter')
}
</script>
