<!--添加待办组件-->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 animate-fade-in">
    <h2 class="text-xl font-bold mb-4">添加新待办</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 待办内容 -->
      <div>
        <label class="block text-sm font-medium mb-1">待办内容 *</label>
        <input
            v-model="newTodo.text"
            @keyup.enter="addTodo"
            type="text"
            placeholder="请输入待办内容..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <!-- 分类选择 -->
      <div>
        <label class="block text-sm font-medium mb-1">分类</label>
        <div class="flex gap-2">
          <select
              v-model="newTodo.category"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
          <button @click="showCustomCat = !showCustomCat" class="btn-secondary px-2">+</button>
        </div>
        <!-- 自定义分类 -->
        <div v-if="showCustomCat" class="mt-2 flex gap-2">
          <input
              v-model="customCat"
              type="text"
              placeholder="自定义分类..."
              class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
          />
          <button @click="addCategory(customCat); showCustomCat=false; customCat=''"
                  class="btn-primary px-2 py-1 text-sm">添加
          </button>
        </div>
      </div>
      <!-- 优先级 -->
      <div>
        <label class="block text-sm font-medium mb-1">优先级</label>
        <select
            v-model="newTodo.priority"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </div>
      <!-- 截止日期 -->
      <div>
        <label class="block text-sm font-medium mb-1">截止日期</label>
        <input
            v-model="newTodo.deadline"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <button
        @click="addTodo"
        class="btn-primary mt-4 w-full"
        :disabled="!newTodo.text.trim()"
    >
      添加待办
    </button>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  newTodo: Object,
  categories: Array,
})

const emits = defineEmits(['addTodo', 'addCategory'])

const showCustomCat = ref(false)
const customCat = ref('')

const addTodo = () => {
  emits('addTodo')
}

const addCategory = (name) => {
  emits('addCategory', name)
}
</script>
