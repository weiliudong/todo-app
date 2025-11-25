<template>
  <!-- 弹窗遮罩层 -->
  <div
      v-if="visible"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300"
      :class="{ 'opacity-100': visible, 'opacity-0': !visible }"
      @click.self="handleCancel"
  >
    <!-- 弹窗主体 -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90%] max-w-md p-6 transition-transform duration-300"
        :class="{ 'translate-y-0': visible, 'translate-y-[-20px]': !visible }"
    >
      <!-- 弹窗标题 -->
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">{{ title }}</h3>

      <!-- 弹窗内容 -->
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ message }}</p>

      <!-- 按钮区域 -->
      <div class="flex justify-end gap-3">
        <button
            class="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            @click="handleCancel"
        >
          {{ cancelText }}
        </button>
        <button
            class="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            @click="handleConfirm"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, watch} from 'vue'

// 定义Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '确认操作',
  },
  message: {
    type: String,
    required: true,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
})

// 定义事件
const emits = defineEmits(['confirm', 'cancel', 'update:visible'])

// 处理取消
const handleCancel = () => {
  emits('cancel')
  emits('update:visible', false)
}

// 处理确认
const handleConfirm = () => {
  emits('confirm')
  emits('update:visible', false)
}

// 控制页面滚动
watch(
    () => props.visible,
    (val) => {
      document.body.style.overflow = val ? 'hidden' : ''
    },
    {immediate: true},
)
</script>
