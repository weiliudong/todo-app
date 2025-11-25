<!--统计组件-->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">数据统计</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 基础统计 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400">总待办</p>
          <p class="text-2xl font-bold">{{ stats.total }}</p>
        </div>
        <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/30">
          <p class="text-sm text-gray-500 dark:text-gray-400">已完成</p>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.completed }}</p>
        </div>
        <div class="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
          <p class="text-sm text-gray-500 dark:text-gray-400">未完成</p>
          <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.uncompleted }}</p>
        </div>
        <div class="p-4 rounded-lg bg-red-50 dark:bg-red-900/30">
          <p class="text-sm text-gray-500 dark:text-gray-400">已过期</p>
          <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.expired }}</p>
        </div>
      </div>
      <!-- 分类统计（简单可视化） -->
      <div>
        <p class="text-sm font-medium mb-2">分类分布</p>
        <div class="h-40">
          <div v-for="(count, cat) in stats.categoryStats" :key="cat" class="flex items-center mb-2">
            <span class="w-20 text-sm">{{ cat }}:</span>
            <div class="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                  class="h-full rounded-full"
                  :class="categoryColor(cat)"
                  :style="{ width: `${(count / stats.total) * 100}%` }"
              ></div>
            </div>
            <span class="w-8 text-sm ml-2">{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  stats: Object,
})

// 分类颜色
const categoryColor = (cat) => {
  const map = {
    工作: 'bg-blue-500',
    生活: 'bg-green-500',
    学习: 'bg-purple-500',
  }
  return map[cat] || 'bg-gray-500'
}
</script>
